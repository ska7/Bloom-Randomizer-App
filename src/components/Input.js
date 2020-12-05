import React, { useContext, useState, useRef } from "react";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Styled from "styled-components";

const Input = () => {
  const { randomizerLogic } = useContext(GlobalContext);
  const [state, setState] = useState("");
  const [popUp, showPopUp] = useState("");
  const hidePopUp = () => showPopUp("");

  const StyledPopup = Styled(Popup)`
    &-overlay {
    }
    &-content {
      min-height: 30%;
      width: 80%;
      background: rgba(0, 0, 0, 0.8);
      box-shadow: 0 0 20px 5px black;
      user-select: none;
      font-size: 20px;
      color: white;
      display: flex;
      font-family: 'Amatic SC';
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 15px;
    }
  `;

  const wrongUrlPopUp = (
    <p>
      Упс, неправильная ссылка. Убедись, что ссылка выглядит примерно так&nbsp;{" "}
      <span style={{ color: "orange" }}>
        https://www.instagram.com/p/CDlfM7Cg9-0/
      </span>
    </p>
  );

  const wrongUserPopUp = (wrongUsername) => {
    return (
      <p>
        Чтобы продолжить, авторизуйся как{" "}
        <span style={{ color: "orange" }}>{wrongUsername}</span>
      </p>
    );
  };

  const validateInput = async (input) => {
    const username = localStorage.getItem("name");
    let link = await axios
      .get(`${input}?__a=1`)
      .then((res) => {
        if (res.data.graphql.shortcode_media.owner.username === username) {
          return (input = input.includes("?") ? input.split("?")[0] : input);
        } else {
          showPopUp(
            wrongUserPopUp(res.data.graphql.shortcode_media.owner.username)
          );
          return false;
        }
      })
      .catch((e) => {
        showPopUp(wrongUrlPopUp);
        return false;
      });
    // Insta Mobile App appends '?' to the link when it's copied, thus we should get rid of it
    return link;
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      const url = await validateInput(state);
      if (url) {
        setState("");
        await randomizerLogic(url);
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

        <button onClick={handleGoButtonClick} className="go-button">
          GO
        </button>
      </div>
      <StyledPopup open={popUp} closeOnDocumentClick onClose={hidePopUp}>
        {popUp}
      </StyledPopup>
    </>
  );
};

export default Input;
