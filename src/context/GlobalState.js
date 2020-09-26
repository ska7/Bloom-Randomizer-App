import React, { useReducer } from "react";
import axios from "axios";
import { GlobalContext } from "./globalContext";
import { globalReducer } from "./globalReducer";
import firebase from "firebase";
import { GET_POST, LOGIN_SUCCEEDED } from "./types";

const url = process.env.REACT_APP_DATABASE_URL;

export const GlobalState = ({ children }) => {
  const initState = {
    isLoggedIn: false,
    accessToken: "",
    loading: false,
    post: "",
    comments: [],
    randomComment: {
      pic: "",
      username: "",
      content: "",
    },
  };
  const [state, dispatch] = useReducer(globalReducer, initState);

  const initializeFirebase = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyCDJvNlD0sikgrAXpY6neGIbwFUgbpVRrw",
      authDomain: "https://bloomrandomizer.firebaseapp.com",
    });
  };

  const loginCheck = async (userLoggedIn, userLoggedOut) => {
    const loginStatus = await axios.get(`${url}/token.json`);
    console.log(loginStatus.data);
    loginStatus.data === null ? console.log("zabei") : console.log("welcome!");
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        loginCheck,
        initializeFirebase,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
