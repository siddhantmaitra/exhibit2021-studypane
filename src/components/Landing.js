import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>Study Pane</h1>
      <Link to="/Offhome">Click here to use the site in offline mode.</Link>
    </>
  );
};

export default Landing;
