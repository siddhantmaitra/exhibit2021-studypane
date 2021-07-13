import { useEffect } from "react";
import { useState } from "react";
import { projectFirestore } from "../Firebase/config";

const useFirestoreAll = (CurrentUserID, colllection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (CurrentUserID) {
      const unsub = projectFirestore
        .collection(colllection)
        .where("ownerId", "==", CurrentUserID)
        // .orderBy("createdAt", "asc")
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
  return { docs };
};

export default useFirestoreAll;
