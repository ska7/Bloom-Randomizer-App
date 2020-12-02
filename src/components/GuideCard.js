import React from "react";

export default function GuideCard({ picture, text }) {
  return (
    <div className="guide-card">
      <img src={picture} alt="card"></img>
      {text}
    </div>
  );
}
