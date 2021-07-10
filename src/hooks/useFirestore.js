import { useEffect } from "react";
import { useState } from "react";
import { projectFirestore } from "../Firebase/config";

const useFirestoreRead = (collection, CurrentUserID) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (CurrentUserID) {
      const unsub = projectFirestore
        .collection(collection)
        // .orderBy("createdAt", "desc")
        .where("ownerId", "==", CurrentUserID)
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        });
      return () => unsub();
    }
  }, [collection, CurrentUserID]);
  return { docs };
};

export default useFirestoreRead;
