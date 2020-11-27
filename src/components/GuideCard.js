import React from "react";
import card from "../img/guide-cards/testcard.png";

export default function GuideCard({ picture, text }) {
  return (
    <div className="guide-card">
      <img src={picture} alt="card"></img>
      <h2>{text}</h2>
    </div>
  );
}
