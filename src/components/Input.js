import React, { Fragment, useContext, useEffect, useState } from "react";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";
import LoggedInPopUp from "./LoggedInPopUp";
import axios from 'axios'

const Input = () => {
  const { setPostID, findPostID, fetchPosts, isLoggedIn, loader, newGiveAway } = useContext(
    GlobalContext
  );
  const [state, setState] = useState("");

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const token = localStorage.getItem('accessToken')
        const id = await findPostID(state, token);
        setState("");
        if (id) {
          console.log('ENTER PRESSED INPUT', id)
          setPostID(id);
          fetchPosts();
          console.log("posts fetched");
        } else {
          newGiveAway();
          console.log('hey')
        }
      } catch {
        console.log("Post ID is null");
      }
    }
  };

  // const handleGoButtonClick = async () => {
  //   try {
  //     const id = await findPostID(state);
  //     setState("");
  //       if (id) {
  //         console.log('ENTER PRESSED INPUT', id)
  //         setPostID(id);
  //         fetchPosts();
  //         console.log("posts fetched");
  //       } else {
  //         newGiveAway();
  //       }
  //   } catch {
  //     setState("");
  //     console.log("Post ID is null");
  //   }
  // }

  const handleGoButtonClick = async () => {
    const res = await axios.get('https://www.instagram.com/p/CDlfM7Cg9-0/')
    .then(response => console.log(`Ебаный ответ ${JSON.stringify(response.keys)}`))
  }

  return (
      <div className="input-section">
        <LoggedInPopUp />
        <div className="input-form">
          <div className='input-wrapper'>
            <input
              autoComplete="off"
              maxLength="45"
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
          
            <button className="go-button" onClick={handleGoButtonClick}>GO</button>
          
        </div>
      </div>
  );
};

export default Input;
