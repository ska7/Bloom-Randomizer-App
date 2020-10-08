import React, { Fragment, useContext, useEffect } from "react";
import LogoLight from "../img/logo.png";
import LoggedInPopUp from "./LoggedInPopUp";
import Input from "./Input";
import Comment from "./RandomComment";
import { Spring } from "react-spring/renderprops";
import { GlobalContext } from "../context/globalContext";

export default function UserLoggedIn({ visible }) {
  // const { loginCheck, isLoggedIn } = useContext(GlobalContext);

  const renderPage = (flag) => {
    if (flag === null || !flag) {
      return flag;
    } else if (flag) {
      return (
        <Fragment>
          <div className="logoLight">
            <img src={LogoLight}></img>
          </div>

          <LoggedInPopUp />
          <div className="input-section">
            <Input />
          </div>
          <div className="comment-section">
            <Comment />
          </div>
        </Fragment>
      );
    }
  };
  return <Fragment>{renderPage(visible)}</Fragment>;
}
