import * as React from "react";

interface ICommentAvatarProps {
  instaUrl: string;
  picture: string;
  username: string;
  flowerCircle: string;
}

const CommentAvatar: React.FC<ICommentAvatarProps> = ({
  instaUrl,
  picture,
  username,
  flowerCircle,
}) => {
  return (
    <div className="comment-box-picture">
      <img className="circle" src={flowerCircle} alt="circle"></img>
      <div className="circle-content">
        <a href={instaUrl} target="_blank" rel="noopener noreferrer">
          <img className="profile-pic" src={picture} alt={username}></img>
        </a>
      </div>
    </div>
  );
};

export default CommentAvatar;
