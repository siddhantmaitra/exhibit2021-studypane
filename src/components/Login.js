import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/css/login.css";

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
    <div className="logincontainer">
    <div className="loginbox">
      <p className="loginheader">Login</p>
      {error && <div>Sorry failed to find your account.</div>}
      <form className="loginform" onSubmit={handleSubmit}>
        <label htmlFor="femail">Email address</label>
        <input 
          className="linput"
          type="email"
          name="femail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="fpass">Password</label>
        <input
          className="linput"
          type="password"
          name="fpass"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        
        <div className="submitbttn">
          <input className="submitbttnstyle" type="submit" value="Submit" disabled={loading} />    
        </div>
      
      </form>
    </div>
    <div className="wcredit">
      <p >Developed by TernaryDevs</p>
    </div>
  </div>
  );
};

export default Login;
