import React, { useContext, useState, useEffect, Fragment } from "react";
import { GlobalContext } from "../context/globalContext";
import Comment from "./Comment";
import { Spring, Transition } from "react-spring/renderprops";

const picUrl =
  "https://instagram.fhrk5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/52382707_429576197811176_922881913771786240_n.jpg?_nc_ht=instagram.fhrk5-1.fna.fbcdn.net&_nc_ohc=jAWMazpR41sAX99iG5k&oh=d3a838fa1be3fc5cbcc5d7a7092afc72&oe=5F8927C1";

const RandomComment = () => {
  const {
    posts,
    matchPost,
    postInstaID,
    fetchCommentID,
    winnerCommentID,
    fetchCommentData,
    winnerCommentData,
    commentsCount,
  } = useContext(GlobalContext);

  const [commentData, setCommentData] = useState(null);

  useEffect(() => {
    if (posts !== null && postInstaID === null) {
      matchPost();
    } else if (
      postInstaID !== null &&
      !winnerCommentID &&
      !commentsCount.length
    ) {
      fetchCommentID();
    } else if (winnerCommentID !== null && !commentData) {
      fetchCommentData();
      setCommentData(true);
      console.log("USE EFFECT IN RANDOM COMPL", winnerCommentData);
    }
  }, [postInstaID, posts, winnerCommentID, fetchCommentData]);

  return (
    <Fragment>
      {winnerCommentData ? (
        <Comment
          picture={winnerCommentData.picture}
          username={winnerCommentData.username}
          content={winnerCommentData.content}
        />
      ) : null}
    </Fragment>
  );
};

export default RandomComment;
