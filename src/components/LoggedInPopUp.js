import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import Avatar from "../img/LoggedInPopUp.png";

export default function LoggedInPopUp() {
  const [state, setState] = useState(false);
  const { isLoggedIn } = useContext(GlobalContext);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        setState(true);
      }, 1500);
    } else {
      setState(false);
    }
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {state ? (
        <div className={`logged-in-pop-up ${isLoggedIn ? "slideIn" : ""}`}>
          <img src={Avatar} alt="avatar"></img>
        </div>
      ) : null}
    </React.Fragment>
  );
}
