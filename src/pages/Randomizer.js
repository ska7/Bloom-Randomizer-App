import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import Input from "../components/Input";
import Comment from "../components/RandomComment";
import FacebookLogin from "../components/FacebookLogin";
import { GlobalContext } from "../context/globalContext";
import { LOGIN_SUCCEEDED } from "../context/types";

function Randomizer() {
  const { loginCheck } = useContext(GlobalContext);

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className="App">
      <div className="fbLogin-section">
        <FacebookLogin />
      </div>
      <div className="input-section">
        <Input />
      </div>
      <div className="comment-section">
        <Comment />
      </div>
    </div>
  );
}

export default Randomizer;
