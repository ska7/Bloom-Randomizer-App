import React, { useContext, useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";

const FBLogin = () => {
  const { userLoggedIn, isLoggedIn } = useContext(GlobalContext);
  const [slide, setSlide] = useState("");

  const responseFacebook = (response) => {
    setSlide("slideOut");
    const token = response.accessToken;
    userLoggedIn(token);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setSlide("slideOut");
    } else if (!isLoggedIn) {
      setSlide("slideIn");
    }
  }, [isLoggedIn]);

  return (
    <div className={`fbLogin-section`}>
      <FacebookLogin
        appId="319952016030195"
        autoLoad={false}
        fields="name,email,picture"
        scope="instagram_basic, public_profile, instagram_manage_comments, pages_show_list, pages_read_engagement"
        callback={responseFacebook}
        render={(renderProps) => (
          <button className="fbButton" onClick={renderProps.onClick}>
            Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default FBLogin;
