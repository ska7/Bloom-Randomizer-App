import React, { Fragment, useContext, useEffect, useState } from "react";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";
import LoggedInPopUp from "./LoggedInPopUp";
import axios from 'axios';


const Input = () => {
  const { getPostURL, fetchPosts, isLoggedIn, loader, newGiveAway } = useContext(
    GlobalContext
  );
  const [state, setState] = useState("");

  const validateInput = async (input) => {
    const test = await axios.get(input)
    .then(() => {return input}).catch(e => {return false})
    return test
  }

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      const url = await validateInput(state);
        if (url) {
          console.log('ENTER PRESSED INPUT', url)
          getPostURL(url);
          fetchPosts();
          console.log("posts fetched");
        } else {
          setState('')
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
    const url = await validateInput(state);
        if (url) {
          console.log('ENTER PRESSED INPUT', url)
          getPostURL(url);
          fetchPosts();
          console.log("posts fetched");
        } else {
          setState('')
        }
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
