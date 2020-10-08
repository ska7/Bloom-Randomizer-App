import React, { Fragment, useEffect } from "react";
import { Spring, Transition } from "react-spring/renderprops";

export default function Spinner({ commentsCount }) {
  useEffect(() => {
    console.log("SPINNER COMP USE EFFECT", commentsCount);
  }, [commentsCount]);

  return (
    <Fragment>
      <Spring
        from={{
          opacity: 0,
        }}
        to={{ opacity: 1 }}
        config={{ delay: 200, duration: 700 }}
      >
        {(props) => (
          <div style={props}>
            <div className="spinner spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <span className="comments-count">{`Обработано ${commentsCount.length} комментов`}</span>
          </div>
        )}
      </Spring>
    </Fragment>
  );
}
