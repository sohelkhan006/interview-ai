import { RouterProvider } from "react-router";
import { router } from "../src/app.routes.jsx";


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
