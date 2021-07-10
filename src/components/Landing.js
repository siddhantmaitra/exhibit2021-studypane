import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Landing = () => {
  const { signup, signInWIthGoogle, currentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [loading, setLoading] = useState(false);
  const [signError, setSignError] = useState(false);
  const [passError, setPassError] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setEmail("");
    setPass("");
    setRePass("");
    if (pass !== rePass) {
      setPassError(true);
      return;
    } else {
      try {
        setPassError(false);
        setSignError(false);
        setLoading(true);
        await signup(email, pass);
      } catch {
        setSignError(true);
        setLoading(false);
        return;
      }
    }
    setLoading(false);

    if (!passError && !signError) {
      history.push("/Dashboard");
    }
  }

  useEffect(() => {
    if (currentUser) {
      history.push("/Dashboard");
    }
  });

  return (
    <>
      <h1>Study Pane</h1>
      <Link to="/Offhome">Click here to use the site in offline mode.</Link>
      <p>Sign up</p>
      {signError && (
        <div>
          Sorry we faced an error creating your account please try again later
        </div>
      )}
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
        {passError && <div>Passwords do not match.</div>}
        <label htmlFor="frepass">Repeat Password</label>
        <input
          type="password"
          name="frepass"
          required
          value={rePass}
          onChange={(e) => setRePass(e.target.value)}
        />
        <input type="submit" value="Submit" disabled={loading} />
      </form>
      <button onClick={signInWIthGoogle}>Sign in With Google</button>
      <p>
        Already have an account? <Link to="/Login">Login</Link>{" "}
      </p>
    </>
  );
};

export default Landing;
