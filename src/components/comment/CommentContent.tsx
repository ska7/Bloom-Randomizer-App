import * as React from "react";

interface ICommentBodyProps {
  instaUrl: string;
  username: string;
  content: string;
}

const CommentBody: React.FC<ICommentBodyProps> = ({
  instaUrl,
  username,
  content,
}) => {
  return (
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
  );
};

export default CommentBody;

const aStyle = {
  color: "black",
  textDecoration: "none",
};
