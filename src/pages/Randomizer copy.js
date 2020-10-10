// import React, { useEffect, useContext, Fragment, useState } from "react";
// import "../App.scss";
// import { GlobalContext } from "../context/globalContext";

// import LogoDark from "../img/logo_dark.png";
// import LoggedOutPopUp from "../components/LoggedOutPopUp";

// import Comment from "../components/RandomComment";

// import LogoLight from "../img/logo.png";
// import Spinner from "../components/Spinner";
// import { Spring, Transition } from "react-spring/renderprops";
// import FacebookLogin from "../components/FacebookLogin";
// import Input from "../components/Input";
// import LoggedInPopUp from "../components/LoggedInPopUp";

// export default function Randomizer() {
//   const [loggedOutPage, setLoggedOutPage] = useState("");
//   const [loggedInPage, setLoggedInPage] = useState("");
//   const {
//     loginCheck,
//     isLoggedIn,
//     loading,
//     commentsCount,
//     signOut,
//   } = useContext(GlobalContext);

//   const slideCheckLoggedOut = (isLoggedIn, status) => {
//     // const status = true;
//     if (isLoggedIn && status) {
//       setLoggedOutPage("hide");
//     } else if (isLoggedIn) {
//       setLoggedOutPage("slideOut");
//     } else if (!isLoggedIn) {
//       setLoggedOutPage("slideIn");
//     }
//   };

//   const slideCheckLoggedIn = (isLoggedIn, status, loading) => {
//     // const status = true;
//     if (isLoggedIn && status) {
//       setLoggedInPage("slideIn");
//     } else if (isLoggedIn) {
//       setLoggedInPage("slideIn");
//     } else if (!isLoggedIn) {
//       setLoggedInPage("hide");
//     } else if (loading) {
//       setLoggedInPage("slideOut");
//     }
//   };
//   // Storing login status in the local storage to avoid unnecessary rendering
//   const status = localStorage.getItem("status");
//   useEffect(() => {
//     loginCheck();
//     slideCheckLoggedIn(isLoggedIn, status, loading);
//     slideCheckLoggedOut(isLoggedIn, status);
//   }, [isLoggedIn, status, loading]);

//   return (
//     <Fragment>
//       <div className="App">
//         <div className={`logged-out-screen ${loggedOutPage}`}>
//           <div className={`logoDark `}>
//             <img src={LogoDark}></img>
//           </div>
//           <LoggedOutPopUp loading={loading} />
//           <FacebookLogin />
//         </div>
//         {loading ? <Spinner commentsCount={commentsCount} /> : null}
//         <div className={`logged-in-screen ${loggedInPage}`}>
//           <div className={`logoLight`}>
//             <img src={LogoLight}></img>
//           </div>
//           <button className="sign-out-button" onClick={signOut}>
//             ВЫХОД
//           </button>
//           <LoggedInPopUp />
//           <div className="input-section">
//             <Input />
//           </div>
//           <div className="comment-section">
//             <Comment />
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// }

// // return (
// //   <Fragment>
// //     <Spring
// //       from={{
// //         opacity: 0,
// //       }}
// //       to={{ opacity: 1 }}
// //       config={{ delay: 200, duration: 700 }}
// //     >
// //       {(props) => (
// //         <div style={props}>
// //           <div className="App ">
// //             <UserLoggedOut visible={fade} />
// //           </div>
// //         </div>
// //       )}
// //     </Spring>
// //   </Fragment>
// // );
