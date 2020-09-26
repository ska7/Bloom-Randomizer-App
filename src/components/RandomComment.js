import React, { useContext, useState } from "react";
import CircleForPicture from "../img/circleProfilePicPaint.png";
import instaLogo from "../img/instagram-brands.svg";

const RandomComment = ({ comment }) => {
  const [commentData, setCommentData] = useState({
    picture:
      "https://instagram.fhrk5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/52382707_429576197811176_922881913771786240_n.jpg?_nc_ht=instagram.fhrk5-1.fna.fbcdn.net&_nc_ohc=jAWMazpR41sAX99iG5k&oh=d3a838fa1be3fc5cbcc5d7a7092afc72&oe=5F8927C1",
    username: "bcooldude",
    content: "Damn man it's pizdec",
  });

  return (
    <div className="comment-box">
      <div className="comment-box-picture">
        <img className="circle" src={CircleForPicture} alt="circle"></img>
        <div className="circle-content">
          <img
            className="profile-pic"
            src={commentData.picture}
            alt="pic"
          ></img>
        </div>
      </div>
      <div className="comment-box-name">
        <img
          className="comment-box-insta"
          src={instaLogo}
          alt="insta-logo"
        ></img>
        <h1>{commentData.username}</h1>
      </div>
      <div className="comment-box-comment">
        <b>{commentData.content}</b>
      </div>
    </div>
  );
};

export default RandomComment;
