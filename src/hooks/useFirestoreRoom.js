import { useEffect } from "react";
import { useState } from "react";
import { projectFirestore } from "../Firebase/config";

const useFirestoreRoom = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection("rooms")
      // .where("__name__", "==", roomId)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, []);
  return { docs };
};

export default useFirestoreRoom;
