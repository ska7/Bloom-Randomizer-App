import React, { useState, useEffect } from "react";
import Avatar from "../img/LoggedOutPopUp.png";

const LoggedOutPopUp: React.FC = () => {
  const [state, setState] = useState(false);

  const popUp = (
    <div className="logged-out-pop-up">
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

export default LoggedOutPopUp;
