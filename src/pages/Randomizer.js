import React, { useEffect, useContext, Fragment, useState } from "react";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";

import LogoDark from "../img/logo_dark.png";
import LoggedOutPopUp from "../components/LoggedOutPopUp";

import Comment from "../components/RandomComment";

import LogoLight from "../img/logo.png";
import Spinner from "../components/Spinner";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FacebookLogin from "../components/FacebookLogin";
import Input from "../components/Input";
import LoggedInPopUp from "../components/LoggedInPopUp";

export default function Randomizer() {
  const [loggedOutPage, setLoggedOutPage] = useState(false);
  const [loggedInPage, setLoggedInPage] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(null);

  const {
    loginCheck,
    isLoggedIn,
    loading,
    commentsCount,
    signOut,
    matchPost,
    fetchCommentID,
    winnerCommentID,
    winnerCommentData,
    postInstaID,
    fetchCommentData,
    posts,
  } = useContext(GlobalContext);

  const slideCheck = (isLoggedIn, loading, winnerCommentData) => {
    if (isLoggedIn) {
      setLoggedOutPage(false);
      setLoggedInPage(true);
    } else if (isLoggedIn === false) {
      setLoggedOutPage(true);
      setLoggedInPage(false);
    }
  };

  const loadingCheck = (loading, data) => {
    if (!loading && data) {
      setShow(false);
    } else if (!loading && data === null) {
      setShow(true);
    }
  };

  // useEffect for components animation
  useEffect(() => {
    loginCheck();
    slideCheck(isLoggedIn, loading, winnerCommentData);
    loadingCheck(loading, winnerCommentData);
  }, [isLoggedIn, loading, winnerCommentData]);

  // useEffect for the randomizer logic p1
  useEffect(() => {
    if (posts !== null && postInstaID === null) {
      matchPost();
    } else if (winnerCommentID !== null && winnerCommentData === null) {
      fetchCommentData();
    }
  }, [postInstaID, posts, winnerCommentID, fetchCommentData]);

  // useEffect for the randomizer logic p2
  useEffect(() => {
    if (
      !winnerCommentData &&
      postInstaID !== null &&
      !winnerCommentID &&
      (commentsCount.length < 1 || typeof commentsCount === "string")
    ) {
      fetchCommentID();
    }
  }, [winnerCommentData, postInstaID, winnerCommentID, commentsCount]);

  return (
    <div className="App">
      <TransitionGroup component={null}>
        {loggedOutPage && (
          <CSSTransition
            classNames="fade"
            in={loggedOutPage}
            key={loggedOutPage}
            timeout={500}
          >
            <div className={`logged-out-screen`}>
              <div className={`logoDark `}>
                <img src={LogoDark}></img>
              </div>
              <LoggedOutPopUp loading={loading} />
              <FacebookLogin />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
      <TransitionGroup component={null}>
        {loading && winnerCommentData === null && (
          <CSSTransition
            classNames="fade"
            in={loading}
            key={loading}
            timeout={300}
          >
            <Spinner commentsCount={commentsCount} />
          </CSSTransition>
        )}
      </TransitionGroup>
      <TransitionGroup component={null}>
        {loggedInPage && (
          <CSSTransition
            classNames="fade"
            in={loggedInPage}
            key={loggedInPage}
            timeout={500}
          >
            <div className="logged-in-screen">
              <div className={`logoLight`}>
                <img src={LogoLight}></img>
              </div>
              <button className="sign-out-button" onClick={signOut}>
                ВЫХОД
              </button>
              {!loading && winnerCommentData === null && (
                <CSSTransition
                  classNames="fade"
                  in={show}
                  key={loading}
                  timeout={300}
                >
                  <Fragment>
                    <LoggedInPopUp />
                    <div className="input-section">
                      <Input />
                    </div>
                  </Fragment>
                </CSSTransition>
              )}

              <div className="comment-section">
                <Comment />
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}
