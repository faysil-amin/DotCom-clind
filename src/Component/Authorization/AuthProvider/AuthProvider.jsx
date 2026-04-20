import React, { useEffect, useState } from "react";
import { auth } from "../../../Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../AuthContext/AuthContext";
const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const UserSingOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUser = (objectId) => {
    setLoading(true);
    return updateProfile(auth.currentUser, objectId);
  };
  const googleSing = () => {
    return signInWithPopup(auth, GoogleProvider);
  };
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => subscriber();
  }, []);
  const userInfo = {
    creatUser,
    userSignIn,
    UserSingOut,
    updateUser,
    googleSing,
    user,
    loading,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
