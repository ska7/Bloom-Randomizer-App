import React, { useEffect, useContext, useState, Fragment } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import Styled from "styled-components";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FacebookLogin from "./components/FacebookLogin";
import { GlobalContext } from "./context/globalContext";
import LogoDark from "./img/logo_dark.png";
import LoggedOutPopUp from "./components/LoggedOutPopUp";
import Comment from "./components/RandomComment";
import LogoLight from "./img/logo.png";
import Spinner from "./components/Spinner";
import Input from "./components/Input";
import LoggedInPopUp from "./components/LoggedInPopUp";
import { popUpStyle } from "./components/helperPopUpStyle";
import GuideCard from "./components/GuideCard";
import { guides } from "./components/guideItems";
import "./App.scss";

const StyledPopup = Styled(Popup)`
${popUpStyle}
`;

function App() {
  const [loggedOutPage, setLoggedOutPage] = useState(false);
  const [loggedInPage, setLoggedInPage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [popUp, showPopUp] = useState(false);
  const [username, setUsername] = useState("");
  const hidePopUp = () => showPopUp(false);

  // Custom arrows for the setup guide pop up
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
    winnerCommentData,
    commentsQuantity,
    loaderStatus,
  } = useContext(GlobalContext);

  // This func checks the login state and renders the corresponding page without any unnecessary blinks
  const slideCheck = (isLoggedIn) => {
    if (isLoggedIn) {
      setLoggedOutPage(false);
      setLoggedInPage(true);
    } else if (isLoggedIn === false) {
      setLoggedOutPage(true);
      setLoggedInPage(false);
    }
  };

  // Below are several checks made to change states for smooth css transitions
  useEffect(() => {
    slideCheck(isLoggedIn);
    setLoader(loading ? true : false);
    setShowInput(!loading && !winnerCommentData ? true : false);
    setShowComment(winnerCommentData ? true : false);
  }, [isLoggedIn, loading, winnerCommentData]);

  // this useEffect does the first login check when the app renders and grabs the instagram username
  // from the local storage to display it on the sign out button
  useEffect(() => {
    loginCheck();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setUsername(localStorage.getItem("name"));
  }, [isLoggedIn]);

  // Transitions below enable smooth animations between components
  return (
    <Fragment>
      <div className="App">
        {/* Below is the blister that runs through the page when the winner comment is displayed */}
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
                  <img src={LogoDark} alt="logo-dark"></img>
                </div>
                <div className="helper-popup" onClick={() => showPopUp(true)}>
                  <LoggedOutPopUp />
                </div>
                <FacebookLogin />
                <StyledPopup
                  modal
                  open={popUp}
                  closeOnDocumentClick
                  onClose={hidePopUp}
                >
                  <button
                    className="close-guide-button"
                    onClick={() => showPopUp(false)}
                  >
                    <span>X</span>Закрыть
                  </button>
                  <Carousel
                    itemPadding={[0, 0, 10, 0]}
                    renderArrow={customArrow}
                    pagination={false}
                  >
                    {guides.map((guide, idx) => {
                      return (
                        <GuideCard
                          key={idx}
                          picture={guide.picture}
                          text={guide.text}
                        />
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
                  <img src={LogoLight} alt="logo-light"></img>
                </div>
                <button className="sign-out-button" onClick={signOut}>
                  ВЫХОД{" "}
                  <span className="sign-out-button-username">{username}</span>
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
    </Fragment>
  );
}

export default App;
