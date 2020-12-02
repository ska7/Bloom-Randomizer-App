import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";
import { FacebookProvider, LoginButton } from "react-facebook";
import styled from "styled-components";

const FBLogin = () => {
  const { userLoggedIn } = useContext(GlobalContext);
  const handleResponse = (data) => {
    console.log(data);
    userLoggedIn(data.tokenDetail.accessToken);
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <div className="fbLogin-section">
      <FacebookProvider appId="319952016030195">
        <LoginButton
          className="fbButton"
          scope="instagram_basic, public_profile, instagram_manage_comments, pages_show_list, pages_read_engagement"
          fields="name,email,picture"
          onCompleted={handleResponse}
          onError={handleError}
        >
          <span className="fbButtonTextStyle">Войти с Facebook</span>
        </LoginButton>
      </FacebookProvider>
    </div>
  );
};

export default FBLogin;
