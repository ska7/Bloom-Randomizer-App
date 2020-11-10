import React, { Fragment, useContext, useEffect, useState } from "react";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";
import LoggedInPopUp from "./LoggedInPopUp";
import axios from "axios";

const Input = () => {
  const {
    getPostURL,
    fetchPosts,
    isLoggedIn,
    loader,
    newGiveAway,
    randomizerLogic,
  } = useContext(GlobalContext);
  const [state, setState] = useState("");

  const validateInput = async (input) => {
    const test = await axios
      .get(input)
      .then(() => {
        return input;
      })
      .catch((e) => {
        return false;
      });
    return test;
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      const url = await validateInput(state);
      if (url) {
        setState("");
        randomizerLogic(url);
      } else {
        setState("");
      }
    }
  };

  const handleGoButtonClick = async () => {
    const url = await validateInput(state);
    if (url) {
      setState("");
      randomizerLogic(url);
    } else {
      setState("");
    }
  };

  return (
    <>
      <div className="input-form">
        <div className="input-wrapper">
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

        <button className="go-button" onClick={handleGoButtonClick}>
          GO
        </button>
      </div>
    </>
  );
};

export default Input;
