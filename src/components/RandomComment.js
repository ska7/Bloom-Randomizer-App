import React, {
  useContext,
  Fragment,
  useEffect,
  useState,
  useRef,
} from "react";
import { GlobalContext } from "../context/globalContext";
import Comment from "./Comment";

const RandomComment = () => {
  const {
    winnerCommentData,
    newWinner,
    newGiveAway,
    isLoggedIn,
    signOut,
    loader,
    commentsBank,
  } = useContext(GlobalContext);

  const winnerSound = useRef();

  const [comment, setComment] = useState({
    picture: "",
    username: "",
    content: "",
  });

  const [showButton, setShowButton] = useState(true);

  const handleClickNewWinner = () => {
    if (isLoggedIn) {
      loader();
      newWinner();
    } else {
      signOut();
    }
  };

  const handleClickNewGiveAway = () => {
    isLoggedIn ? newGiveAway() : signOut();
  };

  const formatComment = (data) => {
    return data.length >= 50 ? `${data.slice(0, 50)}... ` : data;
  };

  useEffect(() => {
    commentsBank.length <= 1 && setShowButton(false);
    if (winnerCommentData) {
      winnerSound.current.play();
      setComment({
        picture: winnerCommentData.picture,
        username: winnerCommentData.username,
        content: winnerCommentData.content,
      });
    }
  }, [winnerCommentData, commentsBank]);

  return (
    <Fragment>
      <div className="winner-audio">
        <audio
          ref={winnerSound}
          className="sound"
          type="audio/mp3"
          src={`${process.env.PUBLIC_URL}/winnerSound.mp3`}
        ></audio>
      </div>
      <Comment
        picture={comment.picture}
        username={comment.username}
        content={formatComment(comment.content)}
      />
      <div className="comment-buttons">
        {showButton && (
          // Show this button only if there are still users to choose from
          <button className="new-winner-button" onClick={handleClickNewWinner}>
            Еще Рандом
          </button>
        )}
        <button className="new-give-button" onClick={handleClickNewGiveAway}>
          Другой Пост
        </button>
      </div>
    </Fragment>
  );
};

export default RandomComment;
