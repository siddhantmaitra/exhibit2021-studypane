import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { projectFirestore, timestamp } from "../Firebase/config";
import useFirestoreMessage from "../hooks/useFirestoreMessage";

const Messaging = () => {
  const { currentUser, roomId } = useContext(AuthContext);
  const { docs } = useFirestoreMessage(currentUser);
  const [formValue, setFormValue] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    await projectFirestore.collection("messages").add({
      text: formValue,
      ownerId: currentUser.uid,
      ownerName: currentUser.displayName,
      roomId: roomId,
      type: "message",
      createdAt: timestamp(),
    });

    setFormValue("");
  };
  return (
    <>
      <div>
        <h6>Status reports</h6>
        {docs.map((message) => {
          if (message.type === "status" && message.roomId === roomId)
            return (
              <p>
                {message.ownerName} completed {message.taskNo}th task.
              </p>
            );
          else return null;
        })}
      </div>
      <div>
        <h6>Messages</h6>
        {docs.map((message) => {
          const messageClass =
            message.ownerId === currentUser.uid ? "sent" : "recieved";
          if (message.type === "message" && message.roomId === roomId)
            return (
              <div className={`xyzClass ${messageClass}`}>
                <p>{message.ownerName}</p>
                <p>{message.text}</p>
              </div>
            );
          else return null;
        })}
        <form onSubmit={handleSend}>
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default Messaging;
