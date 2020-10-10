import React, { useContext, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";

const Input = () => {
  const { setPostID, findPostID, fetchPosts, isLoggedIn, loader } = useContext(
    GlobalContext
  );
  const [state, setState] = useState("");
  const [slide, setSlide] = useState("");

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      try {
        setState("");
        setSlide("slideOut");
        const id = await findPostID(state);
        setPostID(id);

        fetchPosts();
        console.log("posts fetched");
      } catch {
        setState("");
        console.log("Post ID is null");
      }
    }
  };

  return (
    <div className={`input-form`}>
      <input
        onKeyPress={handleEnterPress}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="input-field"
        name="input-post"
        type="text"
        required="yes"
      ></input>
      <label className="label-name" htmlFor="input-post">
        <span className="content-name">Instagram Post</span>
      </label>
      <button className="go-button">GO</button>
    </div>
  );
};

export default Input;
