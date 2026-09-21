import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
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
        <h1>Register</h1>

        <form onSubmit={submitHandler}>
          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email </label>
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

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password </label>
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

          <button className="button primary-btn">Register</button>
        </form>

        {/* Navigate to Login page  */}
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
