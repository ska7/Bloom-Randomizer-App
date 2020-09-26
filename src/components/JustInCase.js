/*
1. When user clicks on LOGIN button, the app should authorize the user, and return an access code
*/

import React, { useState, useEffect } from "react";
import InstaOauth from "./components/InstaOauth";
//import InstaOauth from "./components/OAuthReact";
import InstagramLogin from "react-instagram-oauth";
import Token from "./components/Token";

const App = () => {
  useEffect(() => {
    //setProcess(!isProcessed);
  }, []);

  // const getAccessToken = async () => {

  // }

  const [accessToken, setToken] = useState("");
  const [isProcessed, setProcess] = useState(false);

  const authHandler = async (err, data) => {
    const response = await data;
    setToken(response.access_token);
    setProcess(true);
  };

  return (
    <div>
      <h1>hey man</h1>
      <h1>{accessToken}</h1>
      <InstaOauth />
      <InstagramLogin
        authCallback={authHandler}
        appId={"1130803913969973"}
        appSecret={"7eeeb5f9326ea65809df4196fb050882"}
        redirectUri={"https://localhost:3000/"}
        buttonTheme={"simple"}
        scope={["user_media", "user_profile"]}
      />
      <Token token={accessToken} isProcessed={isProcessed} />
    </div>
  );
};

export default App;
