import React, { useContext } from "react";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";
import { FacebookProvider, LoginButton } from "react-facebook";

const FBLogin = () => {
  const { userLoggedIn, fetchInstaInfo } = useContext(GlobalContext);
  const handleResponse = async (data) => {
    await fetchInstaInfo(data.tokenDetail.accessToken);
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
