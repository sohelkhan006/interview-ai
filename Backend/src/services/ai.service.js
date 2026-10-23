const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    ),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),

  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview preparation report using the following information.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return a JSON object matching the provided schema exactly.

IMPORTANT:
- Include the "title" field.
- Set "title" to the job title extracted from the job description.
- If the job title is unclear, use "Interview Preparation Report".
- Include every required field in the schema.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log("Gemini raw response:", response.text);

  const report = interviewReportSchema.parse(JSON.parse(response.text));

  return report;
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    return await page.pdf({
      format: "A4",
      margin: {
        top: "8mm",
        bottom: "8mm",
        left: "10mm",
        right: "10mm",
      },
    });
  } finally {
    await browser.close();
  }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z.string(),
  });

  const prompt = `Generate a professional, ATS-friendly resume tailored to the job description.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Requirements:
- Target 1 A4 page; use 2 pages only if necessary.
- Never exceed 2 A4 pages.
- Use a clean, single-column, ATS-friendly layout.
- Use standard headings: Professional Summary, Technical Skills,
  Professional Experience, Education, and relevant Projects or Certifications.
- Keep bullet points concise and remove repetitive content.
- Use Arial or a similar readable font, approximately 10pt body text.
- Use compact spacing and 10-12mm page margins.
- Keep education entries together and avoid unnecessary page breaks.
- Do not use tables, multiple columns, icons, or graphics.
- Do not invent candidate information or achievements.
- Return a complete HTML document with embedded CSS.
- Return JSON containing only the "html" field.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = resumePdfSchema.parse(
    JSON.parse(response.text)
  );

  return generatePdfFromHtml(jsonContent.html);
}

module.exports = {
  generateInterviewReport,
  generateResumePdf,
};
