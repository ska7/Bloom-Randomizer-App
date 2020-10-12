import React, { Fragment, useContext, useEffect, useState } from "react";
import { Spring, Transition } from "react-spring/renderprops";
import { GlobalContext } from "../context/globalContext";

export default function Spinner({ commentsCount }) {
  return (
    <Fragment>
      <div className="loader">
        <div className="spinner-section">
          <div className="spinner spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <span className="comments-count">
          {typeof commentsCount === "string"
            ? `${commentsCount}`
            : `Обработано ${commentsCount.length} комментов`}
        </span>
      </div>
    </Fragment>
  );
}
