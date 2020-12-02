import React, { useReducer } from "react";
import axios from "axios";
import bigInt from "big-integer";
import { GlobalContext } from "./globalContext";
import { globalReducer } from "./globalReducer";
import {
  FETCH_COMMENT_DATA,
  GET_COMMENTS_QUANTITY,
  GET_POST_URL,
  INIT,
  LOADING,
  LOAD_COMMENTS,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
  NEW_GIVE_AWAY,
  NEW_WINNER,
  POSTS_FETCHED,
  UPDATE_LOADER_STATUS,
  UPDATE_WINNERS,
} from "./types";

const base_url = "https://localhost:3000/";
const fbUrl = "https://graph.facebook.com/me/accounts?access_token=";
const diaBloomAvatar =
  "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s150x150/120194219_1405772352959804_3358456821050278774_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=-OfRSODnoAkAX-QukDj&_nc_tp=25&oh=08de320eec28af9aa253d2fa80ca54bf&oe=5FD4FE85";

export const GlobalState = ({ children }) => {
  const initState = {
    isLoggedIn: null,
    loading: null,
    postURL: "",
    winnerCommentID: null,
    winners: [],
    winnerCommentData: null,
    commentsBank: [],
    commentsQuantity: 0,
    loaderStatus: "",
  };
  const [state, dispatch] = useReducer(globalReducer, initState);

  const loader = () => dispatch({ type: LOADING });

  const newWinner = async () => {
    const loggedIn = await loginCheck();
    if (loggedIn) {
      dispatch({
        type: UPDATE_LOADER_STATUS,
        payload: "Ищу нового победителя",
      });
      dispatch({ type: NEW_WINNER });
      fetchCommentData(state.commentsBank, winnerCommentID, state.winners);
    } else {
      dispatch({ type: INIT });
    }
  };

  const newGiveAway = () => dispatch({ type: NEW_GIVE_AWAY });

  // Login Related Functions
  const storeLoginStatus = (token) => {
    if (token) {
      localStorage.setItem("status", true);
    } else if (token === "") {
      localStorage.removeItem("status");
    }
  };

  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.clear();
    dispatch({ type: INIT });
    loginCheck();
  };

  const userLoggedIn = (token) => {
    localStorage.setItem("accessToken", token);
    dispatch({
      type: LOGIN_SUCCEEDED,
    });
  };

  const checkToken = async (token) => {
    const res = await axios
      .get(`${fbUrl}${token}`)
      .then((res) => {
        console.log("RESPONSE FROM INSTA", res);
        return res;
      })
      .catch((e) => {
        return e.response.status;
      });

    return res;
  };

  const loginCheck = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const check = await checkToken(accessToken);

    if ((accessToken !== null && check === 400) || accessToken === null) {
      console.log("400 error in Global State. Token expired or is null.");
      dispatch({ type: LOGIN_FAILED });
      return false;
    } else {
      console.log("Success in login check");
      dispatch({ type: LOGIN_SUCCEEDED });
      return true;
    }
  };

  // Instagram Posts Related Functions

  const getPostURL = (url) => {
    dispatch({ type: GET_POST_URL, payload: url });
  };

  function getInstagramUrlFromMediaId(media_id) {
    var alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    var shortenedId = "";
    // media_id = media_id.substring(0, media_id.indexOf('_'));

    while (media_id > 0) {
      var remainder = bigInt(media_id).mod(64);
      media_id = bigInt(media_id).minus(remainder).divide(64).toString();
      shortenedId = alphabet.charAt(remainder) + shortenedId;
    }

    return "https://www.instagram.com/p/" + shortenedId + "/";
  }

  const fetchPosts = async () => {
    loader();
    dispatch({ type: UPDATE_LOADER_STATUS, payload: "Собираю комменты" });
    const accessToken = localStorage.getItem("accessToken");
    try {
      const fbBusinessPageID = await axios
        .get(
          `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
        )
        .then((fbRes) => {
          return fbRes.data.data[0].id;
        });


      const igBusinessPageID = await axios
        .get(
          `https://graph.facebook.com/${fbBusinessPageID}?fields=instagram_business_account&access_token=${accessToken}`
        )
        .then((fbRes) => {
          return fbRes.data.instagram_business_account.id;
        });

      const igPosts = await axios
        .get(
          `https://graph.facebook.com/v8.0/${igBusinessPageID}/media?access_token=${accessToken}`
        )
        .then((fbRes) => {
          return fbRes.data.data;
        });

      dispatch({ type: POSTS_FETCHED, payload: igPosts });
      dispatch({ type: UPDATE_LOADER_STATUS, payload: "" });
      return igPosts;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostIgId = async (id, token) => {
    let commentsNumber = 0;
    const res = await axios
      .get(
        `https://graph.facebook.com/v8.0/${id}?fields=comments_count,id,ig_id&access_token=${token}`
      )
      .then((res) => {
        commentsNumber = res.data.comments_count;
        return res.data.ig_id;
      });
    return res;
  };

  const matchID = async (array, callback, token, inputUrl) => {
    for (const id of array) {
      const ig_id = await callback(id, token);
      const url = getInstagramUrlFromMediaId(ig_id);
      if (url === inputUrl) {
        return id;
      }
    }
  };

  const matchPost = async (posts, url) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // Create an array with IDs
      console.log("POSTYY SUKKKKAAAAA", posts);
      const IDs = posts.map((post) => {
        return post.id;
      });
      // Map through all the IDs and return the one mathing postID.
      const matchedID = await matchID(IDs, fetchPostIgId, accessToken, url);
      // console.log("ID was matched successfully:", matchedID);
      // dispatch({ type: GET_POST_INSTA_ID, payload: matchedID });
      return matchedID;
    } catch (err) {
      console.log("Error occured during post match:", err);
    }
  };

  // Comments related functions

  // Function to fetch a single comments batch

  const fetchBatch = async (url) => {
    let cursor = "";
    // Fetching primary batch
    const comments = await axios.get(url).then((res) => {
      cursor = res.data.hasOwnProperty("paging")
        ? res.data.paging.cursors.after
        : "";
      return res.data.data;
    });

    return {
      batch: comments,
      cursor: cursor,
    };
  };

  // Function to merge one comments batch with all others
  const pushComments = (commentsArray, batch) => {
    batch.forEach((comment) => {
      commentsArray.push(comment);
    });

    return commentsArray;
  };

  const fetchComments = async (id) => {
    console.log("Starting fetching comments");
    const accessToken = localStorage.getItem("accessToken");
    const primaryBatchUrl = `https://graph.facebook.com/v8.0/${id}/comments?access_token=${accessToken}`;
    let cursorAfter = "";
    let fetch = true;
    let comments = [];

    while (fetch) {
      // 1. If the comments array is empty, we fetch the first batch

      if (!comments.length) {
        const { batch, cursor } = await fetchBatch(primaryBatchUrl);
        pushComments(comments, batch);
        // Break the loop if there's no pagination cursor in the response

        cursorAfter = cursor;
        dispatch({ type: GET_COMMENTS_QUANTITY, payload: comments.length });
        dispatch({ type: LOAD_COMMENTS, payload: comments });
      }
      // 2 If the comments array isn't empty and there was a pagination cursor in the last fetch, we fetch the next batch
      else if (comments && comments.length && cursorAfter) {
        const nextBatchUrl = `https://graph.facebook.com/v8.0/${id}/comments?fields=id,text,username&access_token=${accessToken}&limit=50&after=${cursorAfter}&pretty=1`;
        const { batch, cursor } = await fetchBatch(nextBatchUrl);
        pushComments(comments, batch);

        // Break the loop if there's no pagination cursor in the response

        cursorAfter = cursor;
        dispatch({ type: GET_COMMENTS_QUANTITY, payload: comments.length });
        dispatch({ type: LOAD_COMMENTS, payload: comments });
      } else {
        fetch = false;
        break;
      }
    }
    return comments;
  };

  const winnerCommentID = (comments) => {
    const index = Math.floor(Math.random() * Math.floor(comments.length));
    // console.log(`RANDOM INDEX IN THE RANGE OF ${comments.length}:${index}`);
    const commentID = comments[index];
    console.log(`Random comments chosen is : ${JSON.stringify(commentID.id)}`);
    return commentID.id;
  };

  const fetchCommentData = async (comments, getRandomID, winners) => {
    let findingWinner = true;
    const accessToken = localStorage.getItem("accessToken");
    let newArray = comments;
    // Start the loop. Get random winner ID and fetch comment text and username of the owner
    try {
      while (findingWinner) {
        const winnerCommentID = getRandomID(comments);
        const { text, username } = await axios
          .get(
            `https://graph.facebook.com/${winnerCommentID}?fields=text,username&access_token=${accessToken}`
          )
          .then((res) => {
            return res.data;
          });
        newArray = deleteCommentFromArray(newArray, winnerCommentID);
        // Having the username, check if it's in the winners array. If it is not, fetch the profile picture and dispatch winner comment data
        if (!winners.includes(username)) {
          const picture = await axios
            .get(`https://www.instagram.com/${username}/?__a=1 `)
            .then((res) => {
              return res.data.graphql.user.profile_pic_url;
            });
          dispatch({
            type: FETCH_COMMENT_DATA,
            payload: {
              picture: picture,
              username: username,
              content: text,
            },
          });
          dispatch({ type: UPDATE_WINNERS, payload: username });
          loader();
          findingWinner = false;
        } else if (newArray.length <= 1 && winners.includes(username)) {
          console.log(`NO MORE UNIQUE WINNERS, START OVER`);
          dispatch({
            type: FETCH_COMMENT_DATA,
            payload: {
              picture: diaBloomAvatar,
              username: "dia.bloom",
              content: "Больше не из кого выбирать!",
            },
          });
          loader();
          findingWinner = false;
        } else {
          console.log("FOUND DUPLICATEEEE");
        }
        dispatch({ type: LOAD_COMMENTS, payload: newArray });
      }
    } catch (e) {
      dispatch({
        type: FETCH_COMMENT_DATA,
        payload: {
          picture: diaBloomAvatar,
          username: "dia.bloom",
          content: "Больше не из кого выбирать!",
        },
      });
      loader();
    }
    // End of while loop
  };

  const deleteCommentFromArray = (commentsArray, winnerCommentID) => {
    let res = [];
    commentsArray.forEach((comment) => {
      if (comment.id !== winnerCommentID) {
        res.push(comment);
      }
    });
    // console.log(`NEW ARRAY,`, res);
    return res;
  };

  // const fetchCommentData = async (comments, getRandomID) => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const winnerCommentID = getRandomID(comments);
  //   const { text, username } = await axios
  //     .get(
  //       `https://graph.facebook.com/${winnerCommentID}?fields=text,username&access_token=${accessToken}`
  //     )
  //     .then((res) => {
  //       return res.data;
  //     });
  //   const picture = await axios
  //     .get(`https://www.instagram.com/${username}/?__a=1 `)
  //     .then((res) => {
  //       return res.data.graphql.user.profile_pic_url;
  //     });
  //   dispatch({
  //     type: FETCH_COMMENT_DATA,
  //     payload: {
  //       picture: picture,
  //       username: username,
  //       content: text,
  //     },
  //   });
  //   const newArray = deleteCommentFromArray(comments, winnerCommentID);
  //   dispatch({
  //     type: UPDATE_WINNERS,
  //     payload: newArray,
  //   });
  //   loader();
  // };

  // Randomizer Logic

  const randomizerLogic = async (url) => {
    try {
      const loggedIn = await loginCheck();

      // Fetch posts
      const posts = await fetchPosts();
      // Find id of the post with the matching url
      const id = await matchPost(posts, url);
      // Fetch winner comment id
      const comments = await fetchComments(id);
      // Fetch winner comment data
      await fetchCommentData(comments, winnerCommentID, state.winners);
      return false;
    } catch (e) {
      console.log(e);
      dispatch({ type: NEW_GIVE_AWAY });
      return true;
    }
  };
  // const randomizerLogic = async (url) => {
  //   try {
  //     const loggedIn = await loginCheck();
  //     if (loggedIn) {
  //       // Fetch posts
  //       const posts = await fetchPosts();
  //       // Find id of the post with the matching url
  //       const id = await matchPost(posts, url);
  //       // Fetch winner comment id
  //       const comments = await fetchComments(id);
  //       // Fetch winner comment data
  //       await fetchCommentData(comments, winnerCommentID, state.winners);
  //     } else {
  //       dispatch({ type: NEW_GIVE_AWAY });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     dispatch({ type: NEW_GIVE_AWAY });
  //   }
  // };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        postURL: state.postURL,
        posts: state.posts,
        postInstaID: state.postInstaID,
        winnerCommentID: state.winnerCommentID,
        winnerCommentData: state.winnerCommentData,
        loading: state.loading,
        commentsBank: state.commentsBank,
        commentsQuantity: state.commentsQuantity,
        loaderStatus: state.loaderStatus,
        newWinner,
        newGiveAway,
        loginCheck,
        getPostURL,
        userLoggedIn,
        fetchComments,
        fetchCommentData,
        signOut,
        randomizerLogic,
        loader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
