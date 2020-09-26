import React, { useContext, useState } from "react";
import "../App.css";
import {GlobalContext} from "../context/globalContext";

const Input = () => {
    const { setPost } = useContext(GlobalContext);
    const [state, setState] = useState("");

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
        setPost(state)
        console.log(state)
    }
  };

  return (
    <div className="input-form">
      <input
        onKeyPress={handleEnterPress}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="input-field"
        name="input-post"
        type="text"
        required="yes"
      ></input>
      <label className="label-name" for="input-post">
        <span className="content-name">Paste the link to your post</span>
      </label>
    </div>
  );
};

export default Input;
