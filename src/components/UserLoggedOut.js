import React, { Fragment, useContext, useEffect, useState } from "react";
import LogoDark from "../img/logo_dark.png";
import LoggedOutPopUp from "./LoggedOutPopUp";
import FacebookLogin from "./FacebookLogin";
import { GlobalContext } from "../context/globalContext";
import Comment from "./RandomComment";
import Input from "./Input";
import LoggedInPopUp from "./LoggedInPopUp";
import LogoLight from "../img/logo.png";
import Spinner from "./Spinner";
import { Spring, Transition } from "react-spring/renderprops";

export default function UserLoggedOut({ visible }) {
  const {
    isLoggedIn,
    loginCheck,
    loading,
    commentsCount,
    winnerCommentData,
  } = useContext(GlobalContext);
  const [page, setPage] = useState(null);
  const [slide, setSlide] = useState("");

  const renderPage = (flag) => {
    if (flag === null) {
      return flag;
      // If user is logged out
    } else if (!flag) {
      setPage(
        <Fragment>
          <div className="logoDark">
            <img src={LogoDark}></img>
          </div>
          <LoggedOutPopUp />

          <FacebookLogin />
        </Fragment>
      );
      // If user is logged in
    } else if (flag) {
      setPage(
        <Fragment>
          <div className="logoLight">
            <img src={LogoLight}></img>
          </div>

          {/* <button className="sign-out-button" onClick={signOut}> */}
          {/* ВЫХОД
          </button> */}

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

  useEffect(() => {
    renderPage(visible);
    if (loading) {
      setSlide("slide");
    }
  }, [visible, isLoggedIn, loading]);

  return <div></div>;
}
