import * as React from "react";

interface IGuideCardProps {
  picture: string;
  text: string;
}

const GuideCard: React.FC<IGuideCardProps> = ({ picture, text }) => {
  return (
    <div className="guide-card">
      <img src={picture} alt="card"></img>
      {text}
    </div>
  );
};

export default GuideCard;
