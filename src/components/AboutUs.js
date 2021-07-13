import { useHistory } from "react-router-dom";

const AboutUs = () => {
  const history = useHistory("");

  return (
    <div>
      <button onClick={() => history.go(-1)}>Back</button>
      <p>Bitchass 1</p>
      <p>Bitchass 2</p>
      <p>Bitchass 3</p>
    </div>
  );
};

export default AboutUs;
