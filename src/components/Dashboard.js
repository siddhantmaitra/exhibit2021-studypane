import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stats from "./Stats";
import { projectFirestore, timestamp } from "../Firebase/config";

const Dashboard = () => {
  const { currentUser, signout, setProfile, roomId, setRoomId } =
    useContext(AuthContext);

  const [roomAdder, setRoomAdder] = useState(false);
  const [room, setRoom] = useState("");
  const [joinRoomModal, setJoinRoomModal] = useState(false);
  const [nickAdder, setNickAdder] = useState(false);
  const [nick, setNick] = useState("");
  const [nickEditAdder, setNickEditAdder] = useState(false);
  const [editNick, setEditNick] = useState("");
  const [roomError, setRoomError] = useState(false);
  const history = useHistory();

  const handleLogOut = () => {
    signout();
  };

  const handleUpdateName = () => {
    if (nick === "") {
      setProfile(editNick);
      // window.location.reload();
    } else {
      setProfile(nick);
    }

    setNick("");
    setEditNick("");
    setNickAdder(false);
    setNickEditAdder(false);
  };

  const handleAddRoom = () => {
    projectFirestore
      .collection("rooms")
      .add({
        ownerId: currentUser.uid,
        ownerName: currentUser.displayName,
        title: room,
        createdAt: timestamp(),
        DeepworkTimeSetByAdmin: 25,
        RestTimeSetByAdmin: 5,
        SyncedSessionStart: false,
        SyncedSessionReset: false,
        // SyncedBreakStart: false,
        // timerStatus: "",
      })
      // .then(history.push("/Onhome"));
      .then((docRef) => {
        setRoomId(docRef.id);
        history.push("/Onhome");
      });
  };

  const handleJoinRoom = async () => {
    const roomRef = projectFirestore.collection("rooms").doc(roomId);
    const doc = await roomRef.get();
    if (!doc.exists) {
      setRoomError(true);
      setRoomId("");
    } else {
      history.push("/Onhome");
    }
    setJoinRoomModal(false);
  };

  useEffect(() => {
    if (currentUser === null) {
      history.push("/");
    }
  });

  return (
    <div>
      {currentUser && (
        <div>
          <h1>Dashboard</h1>
          {currentUser.displayName ? (
            <div>
              <p>Nickname: {currentUser.displayName}</p>
              <button onClick={() => setNickEditAdder(!nickEditAdder)}>
                {nickEditAdder ? "Close" : "Edit nickname"}
              </button>
            </div>
          ) : (
            <button onClick={() => setNickAdder(!nickAdder)}>
              {nickAdder ? "Close" : "Add a nickname"}
            </button>
          )}
          {nickAdder && (
            <div>
              <input
                type="text"
                required
                value={nick}
                onChange={(e) => {
                  setEditNick(e.target.value);
                }}
              />
              <button onClick={handleUpdateName}>Add</button>
            </div>
          )}
          {nickEditAdder && (
            <div>
              <input
                type="text"
                required
                value={editNick}
                onChange={(e) => {
                  setEditNick(e.target.value);
                }}
              />
              <button onClick={handleUpdateName}>Save</button>
            </div>
          )}
          <p>Currently Signed in as: {currentUser.email}</p>
          <button onClick={handleLogOut}>Logout</button>
          {roomAdder ? (
            <button onClick={() => setRoomAdder(!roomAdder)}>Close</button>
          ) : (
            <button onClick={() => setRoomAdder(!roomAdder)}>
              Start a Room
            </button>
          )}
          {roomAdder && (
            <div>
              <input
                type="text"
                required
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <button onClick={handleAddRoom}>Add</button>
            </div>
          )}
          {joinRoomModal ? (
            <button onClick={() => setJoinRoomModal(!joinRoomModal)}>
              Close
            </button>
          ) : (
            <button onClick={() => setJoinRoomModal(!joinRoomModal)}>
              Join a Room
            </button>
          )}
          {joinRoomModal && (
            <div>
              <input
                type="text"
                required
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button onClick={handleJoinRoom}>Join</button>
            </div>
          )}
          {roomError && <p>Sorry no such rooms found, try creating one.</p>}
          <div>
            <Stats />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
