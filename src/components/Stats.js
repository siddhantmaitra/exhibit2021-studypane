import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useFirestoreAayushTasks from "../hooks/useFirestoreAayushTasks";
import useFirestoreAayushSession from "../hooks/useFirestoreAayushSessions";
import useFirestoreAayushRooms from "../hooks/useFirestoreAayushRooms";

const Stats = () => {
  const { currentUser } = useContext(AuthContext); //currentUser.uid is the id of the Current user.
  const { tasks } = useFirestoreAayushTasks(currentUser.uid, "tasks");
  const { sessions } = useFirestoreAayushSession(currentUser.uid, "sessions");
  const { rooms } = useFirestoreAayushRooms(currentUser.uid, "rooms");

  console.log(tasks, sessions, rooms); //How you access them.
  return <div>Statistics of the user</div>;
};

export default Stats;
