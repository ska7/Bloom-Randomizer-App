import React, { useContext, useState } from "react";
import "../App.scss";
import { GlobalContext, IGlobalContext } from "../context/globalContext";
import axios from "axios";
import Styled from "styled-components";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { inputPopUpStyle } from "./helperPopUpStyle";

const StyledPopup = Styled(Popup)`
${inputPopUpStyle}
`;

const Input = () => {
  const {
    loader,
    updateLoaderStatus,
    randomizerLogic,
  } = useContext<IGlobalContext>(GlobalContext);

  const hidePopUp = () => setOpen(false);

  const wrongUrlPopUp = (
    <p className="input-pop-up">
      Упс, неправильная ссылка. Убедись, что ссылка выглядит примерно так&nbsp;{" "}
      <span style={{ color: "orange" }}>
        https://www.instagram.com/p/CDlfM7Cg9-0/
      </span>
    </p>
  );

  const wrongUserPopUp = (wrongUsername: string) => {
    return (
      <p className="input-pop-up">
        Чтобы продолжить, авторизуйся как{" "}
        <span style={{ color: "orange" }}>{wrongUsername}</span>
      </p>
    );
  };

  const validateInput = async (input: string) => {
    const username = localStorage.getItem("name");
    // Insta Mobile App appends '?' to the link when it's copied, thus we should get rid of everything after the question mark
    let link: string = input.includes("?") ? input.split("?")[0] : input;
    link = await axios
      .get(`${link}?__a=1`)
      .then((res) => {
        if (res.data.graphql.shortcode_media.owner.username === username) {
          return link;
        } else {
          setPopUp(
            wrongUserPopUp(res.data.graphql.shortcode_media.owner.username)
          );
          setOpen(true);
          return "";
        }
      })
      .catch((e) => {
        setPopUp(wrongUrlPopUp);
        setOpen(true);
        return "";
      });

    return link;
  };

  const handleEnterPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const url: string = await validateInput(input);
      takeInput("");
      if (url) {
        updateLoaderStatus("Проверяю ссылку");
        loader();
        await randomizerLogic(url);
      }
    }
  };

  const handleGoButtonClick = async () => {
    const url: string = await validateInput(input);
    takeInput("");
    if (url) {
      updateLoaderStatus("Проверяю ссылку");
      loader();
      await randomizerLogic(url);
    }
  };

  const [input, takeInput] = useState("");
  const [open, setOpen] = useState(false);
  const [popUp, setPopUp] = useState<string | JSX.Element>();

  return (
    <>
      <div className="input-form">
        <div className="input-wrapper">
          <input
            autoComplete="off"
            maxLength={45}
            onKeyPress={handleEnterPress}
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              takeInput(e.target.value)
            }
            className="input-field"
            name="input-post"
            type="text"
            required
          ></input>
          <label className="label-name" htmlFor="input-post">
            <span className="content-name">Instagram Post</span>
          </label>
        </div>
        <button onClick={handleGoButtonClick} className="go-button">
          GO
        </button>
      </div>
      <StyledPopup open={open} closeOnDocumentClick onClose={hidePopUp}>
        {popUp}
      </StyledPopup>
    </>
  );
};

export default Input;
