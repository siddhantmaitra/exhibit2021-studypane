import { useState, useEffect, createContext } from "react";
import { projectAuthentication } from "../Firebase/config";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState("");

  const signup = (email, password) => {
    return projectAuthentication.createUserWithEmailAndPassword(
      email,
      password
    );
  };

  const signin = (email, password) => {
    return projectAuthentication.signInWithEmailAndPassword(email, password);
  };

  const signout = () => {
    return projectAuthentication.signOut();
  };

  const signInWIthGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    projectAuthentication.signInWithPopup(provider);
  };

  const setProfile = (userName) => {
    currentUser.updateProfile({
      displayName: userName,
    });
  };

  useEffect(() => {
    const unsub = projectAuthentication.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    signInWIthGoogle,
    setProfile,
    roomId,
    setRoomId,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
