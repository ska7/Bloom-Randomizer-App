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
  const [loader, setLoader] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showComment, setShowComment] = useState(false);

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
      setLoader(false);
    } else if (loading && data === null) {
      setLoader(true);
    }
  };

  const showInputCheck = (loading, commentData) => {
    if (!loading && !commentData) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const showCommentCheck = (commentData) => {
    if (commentData) {
      setShowComment(true);
    } else {
      setShowComment(false);
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

  useEffect(() => {
    showInputCheck(loading, winnerCommentData);
    showCommentCheck(winnerCommentData);
  }, [loading, winnerCommentData]);

  return (
    <div className="App">
      <div className={`blister ${showComment && "slide"}`}></div>
      <TransitionGroup component={null}>
        {loggedOutPage && (
          <CSSTransition
            classNames="fade"
            in={loggedOutPage}
            key={loggedOutPage}
            timeout={300}
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
        {loader && (
          <CSSTransition
            classNames="fade"
            in={loader}
            key={loading}
            timeout={300}
          >
            <Spinner commentsCount={commentsCount} />
          </CSSTransition>
        )}
      </TransitionGroup>

      {/* // Everything above is ok */}
      <TransitionGroup component={null}>
        {loggedInPage && (
          <CSSTransition
            classNames="fade"
            in={loggedInPage}
            key={loggedInPage}
            timeout={300}
          >
            <div className="logged-in-screen">
              <div className="logged-in-top">
                <div className={`logoLight`}>
                  <img src={LogoLight}></img>
                </div>
                <button className="sign-out-button" onClick={signOut}>
                  ВЫХОД
                </button>
              </div>
              <TransitionGroup component={null}>
                {showInput && (
                  <CSSTransition
                    classNames="fade"
                    in={showInput}
                    key={showInput}
                    timeout={300}
                  >
                    <Fragment>
                      <Input />
                    </Fragment>
                  </CSSTransition>
                )}
              </TransitionGroup>
              <TransitionGroup component={null}>
                {showComment && (
                  <CSSTransition
                    classNames="fade"
                    in={showComment}
                    timeout={300}
                  >
                    <div className="comment-section">
                      <Comment />
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}
