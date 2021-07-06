import { useState } from "react";
import OfflineTasks from "./OfflineTasks";
import Progress from "./Progress";
import Timer from "./Timer";
import ScribblePad from "./ScribblePad";
import '../styles/css/offlineHome.css';

const OfflineHome = () => {
  const [done, setDone] = useState(0);
  const [tbd, setTbd] = useState(0);
  return (
    <div className= "wrapper">
      
      <header className="appbar">
        
        <div className="logo">
          <h3>StudyPane</h3> 
        </div>

        <div className="appbar-bttn">
          
          <button className="mebttn">My Account</button>
          <button className="solobttn" disabled="disabled">Co-Op</button>
          <button className="themebttn">Theme</button>
        </div>

      </header>
      
      <nav className="navbar">
        
        <div><h3>Session Name</h3></div>
        <div><button className="sharebttn">Share</button></div>
        {/* <a className="sharebttn">Share</a> */}
      </nav>
      
      <div className="left-container">      
        <div className="tasks">
          <OfflineTasks setDone={setDone} setTbd={setTbd} />
        </div>
        {/* <div className="board" >
          <Timer/>
        </div> */}
      </div>
      
      <div className="right-container">
        
        <div className="rcontchild">
          
          <div className="prog">
            <Progress  done={done}/>
          </div>

          <div className="timer">
            <Timer/>
          </div>

        </div>
        
        <div className="scribble" >
          <ScribblePad/>
        </div>
        
      </div>
      
      <div className="footie">
        {/* <p>Copyright © TernaryDevs</p>  <--This thing creates an extra div and fucks the balance*/}
        <button className="chatbttn">M</button>
      </div>
      <div className="credit">
        <p>Copyright © <a className="td">TernaryDevs</a></p>
      </div>

    </div>
  );
};

export default OfflineHome;