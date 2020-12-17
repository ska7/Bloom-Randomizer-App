import * as React from "react";
import CommentAvatar from "./CommentAvatar";
import flowerCircle from "img/flowers-circle.png";
import CommentContent from "./CommentContent";

export interface ICommentProps {
  picture: string;
  username: string;
  content: string;
}

const Comment: React.FC<ICommentProps> = ({ picture, username, content }) => {
  const instaUrl = `https://www.instagram.com/${username}`;

  return (
    <div className="comment-box-wrapper">
      <div className="comment-box">
        <CommentAvatar
          instaUrl={instaUrl}
          username={username}
          picture={picture}
          flowerCircle={flowerCircle}
        />
        <CommentContent
          instaUrl={instaUrl}
          username={username}
          content={content}
        />
      </div>
    </div>
  );
};

export default Comment;
