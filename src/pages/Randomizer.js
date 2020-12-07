import React, { useEffect, useContext, Fragment, useState } from "react";
import "../App.scss";
import Carousel, { consts } from "react-elastic-carousel";
import "reactjs-popup/dist/index.css";
import Styled from "styled-components";
import Popup from "reactjs-popup";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { GlobalContext } from "../context/globalContext";
import LogoDark from "../img/logo_dark.png";
import LoggedOutPopUp from "../components/LoggedOutPopUp";
import Comment from "../components/RandomComment";
import LogoLight from "../img/logo.png";
import Spinner from "../components/Spinner";
import FacebookLogin from "../components/FacebookLogin";
import Input from "../components/Input";
import LoggedInPopUp from "../components/LoggedInPopUp";
import { popUpStyle } from "../components/helperPopUpStyle";
import GuideCard from "../components/GuideCard";
import { guides } from "../components/guideItems";

export default function Randomizer() {
  const [loggedOutPage, setLoggedOutPage] = useState(false);
  const [loggedInPage, setLoggedInPage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [popUp, showPopUp] = useState(false);
  const hidePopUp = () => showPopUp(false);

  const StyledPopup = Styled(Popup)`
    ${popUpStyle}
  `;

  const handleKeyPress = (e, func) => {
    if (((e.key = "38"), "40")) {
      func();
    }
  };

  const customArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <span className="carousel-arrow-left">⤾</span>
      ) : (
        <span className="carousel-arrow-right">⤿</span>
      );
    return (
      <button className="carousel-arrow" onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  };

  const {
    loginCheck,
    isLoggedIn,
    loading,
    signOut,
    postURL,
    winnerCommentData,
    commentsQuantity,
    randomizerLogic,
    loaderStatus,
  } = useContext(GlobalContext);

  const slideCheck = (isLoggedIn) => {
    if (isLoggedIn) {
      setLoggedOutPage(false);
      setLoggedInPage(true);
    } else if (isLoggedIn === false) {
      setLoggedOutPage(true);
      setLoggedInPage(false);
    }
  };

  const loadingCheck = (loading) => {
    if (!loading) {
      setLoader(false);
    } else if (loading) {
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
    slideCheck(isLoggedIn, loading, winnerCommentData);
    loadingCheck(loading);
    showInputCheck(loading, winnerCommentData);
    showCommentCheck(winnerCommentData);
  }, [isLoggedIn, loading, winnerCommentData]);

  // useEffect for the randomizer logic
  useEffect(() => {
    if (postURL) {
      randomizerLogic();
    }
  }, [postURL]);

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className="App">
      <div className={`blister ${showComment && "slide"}`}></div>
      <TransitionGroup component={null}>
        {loggedOutPage && (
          <CSSTransition
            classNames="fade"
            in={loggedOutPage}
            key={loggedOutPage}
            timeout={500}
          >
            <div className="logged-out-screen">
              <div className="logoDark">
                <img src={LogoDark}></img>
              </div>
              <div className="helper-popup" onClick={() => showPopUp(true)}>
                <LoggedOutPopUp />
              </div>
              <FacebookLogin />
              <StyledPopup
                open={popUp}
                closeOnDocumentClick
                onClose={hidePopUp}
              >
                <button className='close-guide-button' onClick={() => showPopUp(false)}><span>X</span>Закрыть</button>
                <Carousel
                  itemPadding={[0, 0, 10, 0]}
                  renderArrow={customArrow}
                  pagination={false}
                >
                  {guides.map((guide) => {
                    return (
                      <GuideCard picture={guide.picture} text={guide.text} />
                    );
                  })}
                </Carousel>
              </StyledPopup>
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
            <Spinner
              loaderStatus={loaderStatus}
              commentsQuantity={commentsQuantity}
            />
          </CSSTransition>
        )}
      </TransitionGroup>

      <TransitionGroup component={null}>
        {loggedInPage && (
          <CSSTransition
            classNames="fade"
            in={loggedInPage}
            key={loggedInPage}
            timeout={300}
          >
            <div className="logged-in-screen">
              <div className={`logoLight`}>
                <img src={LogoLight}></img>
              </div>
              <button className="sign-out-button" onClick={signOut}>
                ВЫХОД
              </button>

              <TransitionGroup component={null}>
                {showInput && (
                  <CSSTransition
                    classNames="fade"
                    in={showInput}
                    key={showInput}
                    timeout={300}
                  >
                    <div className="input-section">
                      <div className="logged-in-pop-up-wrapper">
                        <LoggedInPopUp />
                      </div>
                      <Input />
                    </div>
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
