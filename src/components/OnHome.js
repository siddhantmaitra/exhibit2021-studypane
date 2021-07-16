import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useFirestoreRoom from "../hooks/useFirestoreRoom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Progress from "./Progress";
import OnTasks from "./OnTasks";
import OnTimer from "./OnTimer";
import ScribblePad from "./ScribblePad";
import Messaging from "./Messaging";
// import LeaderBoard from "./LeaderBoard";
import { projectFirestore, timestamp } from "../Firebase/config";

const OnHome = () => {
  const { roomId, setRoomId, currentUser, theme, setTheme } =
    useContext(AuthContext);
  const { docs } = useFirestoreRoom();
  const [roomDetails, setRoomDetails] = useState({});
  const [shareModal, setShareModal] = useState(false);
  const [doneTasks, setDoneTasks] = useState(0);
  const [doneDeep, setDoneDeep] = useState(0);
  const [confModal, setConfModal] = useState(false);
  const [messagingModal, setMessagingModal] = useState(false);
  const history = useHistory();
  const admin = roomDetails.ownerId === currentUser.uid ? true : false;

  const handleKill = () => {
    setRoomId("");
  };

  useEffect(() => {
    if (roomId === "") {
      history.push("/Dashboard");
    }
    docs.forEach((room) => {
      if (room.id === roomId) {
        setRoomDetails(room);
      }
    });
  });

  const handleSessionUpdate = (time) => {
    projectFirestore.collection("rooms").doc(roomId).update({
      DeepworkTimeSetByAdmin: time,
    });
  };

  const handleRestUpdate = (time) => {
    projectFirestore.collection("rooms").doc(roomId).update({
      RestTimeSetByAdmin: time,
    });
  };

  const handleSyncStart = () => {
    projectFirestore.collection("rooms").doc(roomId).update({
      SyncedSessionStart: !roomDetails.SyncedSessionStart,
    });
  };

  const handleSyncReset = () => {
    projectFirestore.collection("rooms").doc(roomId).update({
      SyncedSessionReset: !roomDetails.SyncedSessionReset,
    });
  };

  const addDoneDeep = () => {
    projectFirestore.collection("sessions").add({
      ownerId: currentUser.uid,
      roomId: roomId,
      time: roomDetails.DeepworkTimeSetByAdmin,
      createdAt: timestamp(),
    });
  };

  return (
    <div className="wrapper">
      <div className="appbar">
        <div className="logo">
          <h2 className="logotext">StudyPane</h2>
        </div>

        <div className="appbar-bttn">
          <button className="mebttn" onClick={() => setConfModal(true)}>
            My Dashboard
          </button>
          {confModal && (
            <div>
              <p>Do you really want to exit the room?</p>
              <button onClick={handleKill}>Yes</button>
              <button
                onClick={() => {
                  setConfModal(false);
                }}
              >
                No
              </button>
            </div>
          )}
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

      <div className="navbar">
        <div>
          <h2 className="meeting">{roomDetails.title}</h2>
        </div>
        <div>
          {/* <button className="sharebttn">Share Room details</button> */}
          <button onClick={() => setShareModal(true)}>Share</button>
          {shareModal && (
            <div>
              <button onClick={() => setShareModal(false)}>Close</button>
              <input disabled value={roomId} />
              <CopyToClipboard
                text={roomId}
                // onCopy={() => this.setState({ copied: true })}
              >
                <button>Copy</button>
              </CopyToClipboard>
            </div>
          )}
          {/* <button onClick={handleKill}>End</button> */}
        </div>
        {/* <a className="sharebttn">Share</a> */}
      </div>

      <div className="left-container">
        <div className="tasks">
          <OnTasks setDoneTasks={setDoneTasks} />
        </div>
        {/* <div>
          <LeaderBoard />
        </div> */}
        {/* <div className="tasks">
          <Messaging />
        </div> */}
      </div>

      <div className="right-container">
        {/* <div className="rcontchild"> */}
        <div className="prog">
          <Progress doneTasks={doneTasks} doneDeep={doneDeep} />
        </div>
        <div className="timer">
          <OnTimer
            doneDeep={doneDeep}
            setDoneDeep={setDoneDeep}
            admin={admin}
            sessionLength={roomDetails.DeepworkTimeSetByAdmin}
            breakLength={roomDetails.RestTimeSetByAdmin}
            currentUser={currentUser}
            handleSessionUpdate={handleSessionUpdate}
            handleRestUpdate={handleRestUpdate}
            handleSyncStart={handleSyncStart}
            syncTrigger={roomDetails.SyncedSessionStart}
            handleSyncReset={handleSyncReset}
            syncReset={roomDetails.SyncedSessionReset}
            addDoneDeep={addDoneDeep}
          />
        </div>
        <div className="scribble">
          <ScribblePad />
        </div>
      </div>

      <div className="footie">
        <button
          className="chatbttn"
          onClick={() => {
            setMessagingModal(!messagingModal);
          }}
        >
          M
        </button>
      </div>

      {messagingModal && <Messaging />}

      <div className="credit">
        <p>
          {/* Copyright © <a className="td">TernaryDevs</a> */}
          Copyright ©{" "}
          <Link to="/About" className="td">
            TernaryDevs
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OnHome;
