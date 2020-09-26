import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../App.css";
import { Link } from "react-router-dom";

const FBLogin = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  const aboutLinkStyle = {
    color: "black",
  };

  return (
    <div className="fbLogin-section">
      <Link style={aboutLinkStyle} to="/about">
        <h1 className="aboutLink">How it works? Click here and learn </h1>
      </Link>
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
