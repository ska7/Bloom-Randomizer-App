import React from "react";
import loader from "../img/loader-red.png";

export default function Spinner({ loaderStatus, commentsQuantity }) {
  return (
    <>
      <div className="loader">
        <img className="loader-circle" src={loader} alt="loader"></img>
        <span className="comments-count">
          {loaderStatus
            ? `${loaderStatus}`
            : `Обработано ${commentsQuantity} комментов`}
        </span>
      </div>
    </>
  );
}
