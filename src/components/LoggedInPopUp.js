import React, { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { GlobalContext } from "../context/globalContext";
import Avatar from "../img/LoggedInPopUp.png";

export default function LoggedInPopUp() {
  const [state, setState] = useState(false);
  const [slide, setSlide] = useState("");

  const { isLoggedIn, loading } = useContext(GlobalContext);

  const page = (
    <div className={`logged-in-pop-up`}>
      <img src={Avatar} alt="avatar"></img>
    </div>
  );

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        setState(true);
      }, 1500);
    } else if (isLoggedIn && loading) {
      setState(true);
      setSlide("slideOut");
    }
  }, [isLoggedIn, loading]);

  return <React.Fragment>{state ? page : null}</React.Fragment>;
}
