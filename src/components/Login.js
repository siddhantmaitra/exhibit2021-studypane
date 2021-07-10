import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { signin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setEmail("");
    setPass("");
    try {
      setError(false);
      setLoading(true);
      await signin(email, pass);
    } catch {
      setError(true);
      setLoading(false);
      return;
    }
    setLoading(false);

    if (!error) {
      history.push("/Dashboard");
    }
  }

  return (
    <div>
      <p>Login</p>
      {error && <div>Sorry failed to find your account.</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="femail">Email address</label>
        <input
          type="email"
          name="femail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="fpass">Password</label>
        <input
          type="password"
          name="fpass"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <input type="submit" value="Submit" disabled={loading} />
      </form>
    </div>
  );
};

export default Login;
