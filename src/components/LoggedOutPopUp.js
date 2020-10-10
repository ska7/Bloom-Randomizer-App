import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import Avatar from "../img/LoggedOutPopUp.png";

export default function LoggedOutPopUp() {
  const [state, setState] = useState(false);

  const { isLoggedIn } = useContext(GlobalContext);

  const popUp = (
    <div className={`logged-out-pop-up`}>
      <img src={Avatar} alt="avatar"></img>
    </div>
  );
  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        setState(true);
      }, 1500);
    } else {
      setState(true);
    }
  }, [isLoggedIn]);

  return <React.Fragment>{state ? popUp : null}</React.Fragment>;
}
