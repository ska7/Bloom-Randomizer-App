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

  // const LoginButton = styled.section`
  //   display: flex;
  //   font-family: "Amatic SC";
  //   justify-content: center;
  //   align-items: center;
  //   min-width: 30%;
  //   height: 70px;
  //   color: rgb(179, 146, 0);
  //   font-size: 1.1rem;
  //   background: rgb(255, 255, 255, 0.2);
  //   border: solid 3px rgb(71, 71, 71);
  //   border-radius: 5px;
  //   box-shadow: 0 0 50px 10px black;
  //   transition: all 0.6s ease;
  //   &:hover {
  //     cursor: pointer;
  //     color: white;
  //     background: rgb(72, 103, 170);
  //     border: solid 3px black;
  //   }
  // `;

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
          <span>Войти с Facebook</span>
        </LoginButton>
      </FacebookProvider>
    </div>
  );
};

export default FBLogin;
