import { useEffect } from "react";
import { useState } from "react";
import { projectFirestore } from "../Firebase/config";

const useFirestoreMessage = (CurrentUserID) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (CurrentUserID) {
      const unsub = projectFirestore
        .collection("messages")
        // .where("ownerId", "==", CurrentUserID)
        .orderBy("createdAt", "asc")
        // .limit(25)
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        });
      return () => unsub();
    }
  }, [CurrentUserID]);
  return { docs };
};

export default useFirestoreMessage;
