import { useNavigate, Link } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
  };
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
