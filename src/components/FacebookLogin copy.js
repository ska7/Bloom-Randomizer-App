import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "../App.scss";
import { GlobalContext } from "../context/globalContext";

const FBLogin = () => {
  const { userLoggedIn } = useContext(GlobalContext);

  const responseFacebook = (response) => {
    // The response with the status property means login failure
    console.log(response);
    if (!response.hasOwnProperty("status")) {
      userLoggedIn(response.accessToken);
    }
  };

  return (
    <div className="fbLogin-section">
      <FacebookLogin
        appId="319952016030195"
        onFailure={() => console.log("FB Login failed and that is On Failure")}
        autoload={false}
        fields="name,email,picture"
        scope="instagram_basic, public_profile, instagram_manage_comments, pages_show_list, pages_read_engagement"
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            className="fbButton"
            // isDisabled={true}
            onClick={renderProps.onClick}
            redirectUri="https://localhost:3000/"
          >
            Войти с Facebook
          </button>
        )}
      />
    </div>
  );
};

export default FBLogin;
