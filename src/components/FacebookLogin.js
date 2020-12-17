import React, { useContext } from "react";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";
import { FacebookProvider, LoginButton } from "react-facebook";

const FBLogin = () => {
  const { userLoggedIn, fetchInstaInfo } = useContext(GlobalContext);

  const handleResponse = async (data) => {
    fetchInstaInfo(data.tokenDetail.accessToken);
    userLoggedIn(data.tokenDetail.accessToken);
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <div className="fbLogin-section">
      <FacebookProvider appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}>
        <LoginButton
          className="fbButton"
          scope="instagram_basic, pages_show_list, pages_read_engagement"
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
