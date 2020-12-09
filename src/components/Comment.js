import React from "react";
import CircleForPicture from "../img/flowers-circle.png";

const Comment = ({ picture, username, content }) => {
  const instaUrl = `https://www.instagram.com/${username}`;
  const aStyle = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <div className="comment-box-wrapper">
      <div className="comment-box">
        <div className="comment-box-picture">
          <img className="circle" src={CircleForPicture} alt="circle"></img>
          <div className="circle-content">
            <a href={instaUrl} target="_blank" rel="noopener noreferrer">
              <img className="profile-pic" src={picture} alt="pic"></img>
            </a>
          </div>
        </div>
        <div className="comment-box-content">
          <div className="comment-box-name">
            <a
              style={aStyle}
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {username}
            </a>
          </div>
          <div className="comment-box-comment">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
