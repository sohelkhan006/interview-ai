import "../auth.form.scss";
import { useNavigate, Link } from "react-router";
const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

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
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
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
