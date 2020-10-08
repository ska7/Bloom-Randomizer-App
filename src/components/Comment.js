import React from "react";
import instaLogo from "../img/instagram-brands.svg";
import CircleForPicture from "../img/circleProfilePic.png";

const Comment = ({ picture, username, content }) => {
  const instaUrl = `https://www.instagram.com/${username}`;
  const aStyle = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <div className="comment-box">
      <div className="comment-box-picture">
        <img className="circle spin" src={CircleForPicture} alt="circle"></img>
        <div className="circle-content">
          <img className="profile-pic" src={picture} alt="pic"></img>
        </div>
      </div>
      <div className="comment-box-name">
        <img
          className="comment-box-insta"
          src={instaLogo}
          alt="insta-logo"
        ></img>
        <h1>
          <a style={aStyle} href={instaUrl}>
            {username}
          </a>
        </h1>
      </div>
      <div className="comment-box-comment">
        <b>{content}</b>
      </div>
    </div>
  );
};

export default Comment;
