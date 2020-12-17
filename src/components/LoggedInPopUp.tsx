import React, { useState, useEffect } from "react";
import Avatar from "../img/LoggedInPopUp.png";

const LoggedInPopUp: React.FC = () => {
  const [state, setState] = useState(false);

  const popUp = (
    <div className={`logged-in-pop-up`}>
      <img src={Avatar} alt="avatar"></img>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 1500);
  }, []);

  return <React.Fragment>{state ? popUp : null}</React.Fragment>;
};

export default LoggedInPopUp;
