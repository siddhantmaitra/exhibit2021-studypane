import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useFirestoreAll from "../hooks/useFirestoreAll";

const Stats = () => {
  const { currentUser } = useContext(AuthContext); //currentUser.uid is the id of the Current user.
  const [tasks, setTasks] = useState([]); //All the tasks of the current user stored here
  const [sessions, setSessions] = useState([]); //All the sessions of the current user stored here
  const [rooms, setRooms] = useState([]); //All the rooms of the current user stored here
  const temp1 = useFirestoreAll(currentUser.uid, "tasks");
  const temp2 = useFirestoreAll(currentUser.uid, "sessions");
  const temp3 = useFirestoreAll(currentUser.uid, "rooms");

  useEffect(() => {
    setTasks(temp1.docs);
    setSessions(temp2.docs);
    setRooms(temp3.docs);
  }, [currentUser]);

  console.log(tasks, sessions, rooms); //How you access them.
  return <div>Statistics of the user</div>;
};

export default Stats;
