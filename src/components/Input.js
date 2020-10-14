import React, { useContext, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";

const Input = () => {
  const { setPostID, findPostID, fetchPosts, isLoggedIn, loader, newGiveAway } = useContext(
    GlobalContext
  );
  const [state, setState] = useState("");

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      try {
        setState("");
        const id = await findPostID(state);
        if (id) {
          console.log('ENTER PRESSED INPUT', id)
          setPostID(id);
          fetchPosts();
          console.log("posts fetched");
        } else {
          // newGiveAway();
          console.log('hey')
        }
      } catch {
        setState("");
        console.log("Post ID is null");
      }
    }
  };

  const handleGoButtonClick = async () => {
    try {
      setState("");
        const id = await findPostID(state);
        if (id) {
          console.log('ENTER PRESSED INPUT', id)
          setPostID(id);
          fetchPosts();
          console.log("posts fetched");
        } else {
          newGiveAway();
        }
    } catch {
      setState("");
      console.log("Post ID is null");
    }
  }

  return (
    <div className={`input-form`}>
      <div className='input-wrapper'>
        <input
          autocomplete="off"
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
      </div>
      <div className='go-button-wrapper'>
        <button className="go-button" onClick={handleGoButtonClick}>GO</button>
      </div>
    </div>
  );
};

export default Input;
