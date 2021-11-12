import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SignedInStack, SignedOutStack } from "./navigation";
import { firebase } from "../config/firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => userHandler(user)),
    []
  );
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
