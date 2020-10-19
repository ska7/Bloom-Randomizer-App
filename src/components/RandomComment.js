import React, { useContext, Fragment, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/globalContext";
import Comment from "./Comment";



const RandomComment = () => {
  const { winnerCommentData, newWinner, newGiveAway, isLoggedIn, signOut } = useContext(
    GlobalContext
    );
    
  const winnerSound = useRef();

  const [comment, setComment] = useState({
    picture: '',
    username: '',
    content: '',
  })

  const handleClickNewWinner = () => {
    if (isLoggedIn) {
      newWinner();
    } else {
      signOut();
    }
  };

  const handleClickNewGiveAway = () => {
    if (isLoggedIn) {
      newGiveAway();
    } else {
      signOut();
    }
  };

  const formatUsername = (data) => {
    return data.length >= 15 ? `${data.slice(0, 15)}... ` : data;
  };
  const formatComment = (data) => {
    return data.length >= 150 ? `${data.slice(0, 150)}... ` : data;
  };

  useEffect(() => {
    console.log(winnerSound.current)
    
    if (winnerCommentData) {
      winnerSound.current.play();
      setComment({
        picture: winnerCommentData.picture,
        username: winnerCommentData.username,
        content: winnerCommentData.content,
      })
    }
  }, [winnerCommentData])

  return (
        <Fragment>
          <div className="winner-audio">
            <audio ref={winnerSound} className="sound" type='audio/mp3' src={`${process.env.PUBLIC_URL}/winnerSound.mp3`}></audio>
          </div>
          <Comment
            picture={comment.picture}
            username={comment.username}
            content={formatComment(comment.content)}
          />
          <div className='comment-buttons'>
            <button className="new-winner-button" onClick={handleClickNewWinner}>
              Еще Рандом
            </button>
            <button className="new-give-button" onClick={handleClickNewGiveAway}>
              Другой Пост
            </button>
          </div>
        </Fragment>
  )
};

export default RandomComment;
