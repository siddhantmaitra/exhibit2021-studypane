import { useContext, useState } from "react";
import OfflineTasks from "./OfflineTasks";
import Progress from "./Progress";
import OffTimer from "./OffTimer";
import ScribblePad from "./ScribblePad";
import "../styles/css/offlineHome.css";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const OfflineHome = () => {
  const [doneTasks, setDoneTasks] = useState(0);
  const [doneDeep, setDoneDeep] = useState(0);
  const history = useHistory();
  const { theme, setTheme } = useContext(AuthContext);

  return (
    <div className="wrapper">
      <div className="appbar">
        <div className="logo">
          <h2 className="logotext">StudyPane</h2>
        </div>

        <div className="appbar-bttn">
          <button
            className="mebttn"
            onClick={() => {
              history.push("/");
            }}
          >
            Login
          </button>
          {/* <button className="solobttn" disabled>
                Co-Op
            </button> */}
          <button
            className="themebttn"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Theme
          </button>
        </div>
      </div>

      {/* <div className="navbar">  this will become like one below   */}
      <div className={`navbar navbar-${theme}`}>
        {/*navbar-light or navbar-dark */}
        <div>
          <h2 className="meeting">Demo Offline Session</h2>
        </div>
        <div>
          <button disabled className="sharebttn">
            Share
          </button>
        </div>
        {/* <a className="sharebttn">Share</a> */}
      </div>

      <div className="left-container">
        <div className="tasks">
          <OfflineTasks setDoneTasks={setDoneTasks} />
        </div>

        {/* <div className="board">
                <OfflineTasks setDoneTasks={setDoneTasks} setTbd={setTbd} />
            </div> */}
      </div>
      <div className="right-container">
        {/* <div className="rcontchild"> */}
        <div className="prog">
          <Progress doneTasks={doneTasks} doneDeep={doneDeep} />
        </div>

        <div className="timer">
          <OffTimer doneDeep={doneDeep} setDoneDeep={setDoneDeep} />
        </div>
        {/* </div> */}

        <div className="scribble">
          <ScribblePad />
        </div>
      </div>

      <div className="footie">
        {/* <p>Copyright © TernaryDevs</p>  <--This thing creates an extra div and fucks the balance*/}
        <button disabled className="chatbttn">
          M
        </button>
      </div>

      <div className="credit">
        <p>
          Copyright © <a className="td">TernaryDevs</a>
        </p>
      </div>
    </div>
  );
};

export default OfflineHome;
