import { useState } from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
     navigate("/");

    console.log("form submitted");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading........</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button className="button primary-btn">Login</button>
        </form>

        {/* Navigate to Register page */}
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
