import { useEffect } from "react";
import { useState } from "react";
import { projectFirestore } from "../Firebase/config";

const useFirestoreStatsTasks = (CurrentUserID, colllection) => {
  const [tasks, setDocs] = useState([]);

  useEffect(() => {
    if (CurrentUserID) {
      const unsub = projectFirestore
        .collection(colllection)
        .where("ownerId", "==", CurrentUserID)
        .orderBy("createdAt", "asc")
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        });
      return () => unsub();
    }
  }, [CurrentUserID, colllection]);
  return { tasks };
};

export default useFirestoreStatsTasks;
