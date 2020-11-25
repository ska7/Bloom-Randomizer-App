import React, { Fragment } from "react";

export default function Spinner({ loaderStatus, commentsQuantity }) {
  return (
    <Fragment>
      <div className="loader">
        <div className="spinner-section">
          <div className="spinner spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <span className="comments-count">
          {loaderStatus
            ? `${loaderStatus}`
            : `Обработано ${commentsQuantity} комментов`}
        </span>
      </div>
    </Fragment>
  );
}
