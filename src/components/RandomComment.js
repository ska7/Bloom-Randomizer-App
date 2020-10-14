import React, { useContext, Fragment } from "react";
import { GlobalContext } from "../context/globalContext";
import Comment from "./Comment";

const picUrl =
  "https://instagram.fhrk5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/52382707_429576197811176_922881913771786240_n.jpg?_nc_ht=instagram.fhrk5-1.fna.fbcdn.net&_nc_ohc=jAWMazpR41sAX99iG5k&oh=d3a838fa1be3fc5cbcc5d7a7092afc72&oe=5F8927C1";

const RandomComment = () => {
  const { winnerCommentData, newWinner, newGiveAway } = useContext(
    GlobalContext
  );

  const handleClickNewWinner = () => {
    newWinner();
  };

  const handleClickNewGiveAway = () => {
    newGiveAway();
  };

  const formatUsername = (data) => {
    return data.length >= 15 ? `${data.slice(0, 15)}... ` : data;
  };
  const formatComment = (data) => {
    return data.length >= 150 ? `${data.slice(0, 150)}... ` : data;
  };

  return (
    <Fragment>
      {winnerCommentData ? (
        <Fragment>
          <Comment
            picture={winnerCommentData.picture}
            username={winnerCommentData.username}
            content={formatComment(winnerCommentData.content)}
          />
          <button className="new-winner-button" onClick={handleClickNewWinner}>
            Еще Рандом
          </button>
          <button className="new-give-button" onClick={handleClickNewGiveAway}>
            Другой Пост
          </button>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default RandomComment;
