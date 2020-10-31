import React, { useReducer } from "react";
import axios from "axios";
import bigInt from 'big-integer';
import { GlobalContext } from "./globalContext";
import { globalReducer } from "./globalReducer";
import {
  FADE_IN,
  FETCH_COMMENT_DATA,
  FETCH_WINNER_COMMENT_ID,
  GET_POST_ID,
  GET_POST_INSTA_ID,
  GET_POST_URL,
  INIT,
  LOADING,
  LOAD_COMMENTS,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
  NEW_GIVE_AWAY,
  NEW_WINNER,
  POSTS_FETCHED,
} from "./types";

const fbUrl = "https://graph.facebook.com/me/accounts?access_token=";

export const GlobalState = ({ children }) => {
  const initState = {
    isLoggedIn: null,
    loading: null,
    tokenReceived: null,
    postURL: "",
    postInstaID: null,
    posts: null,
    winnerCommentID: null,
    winnerCommentData: null,
    commentsCount: [],
  };
  const [state, dispatch] = useReducer(globalReducer, initState);

  const loader = () => dispatch({ type: LOADING });

  const newWinner = () => {
    dispatch({ type: NEW_WINNER });
    loader();
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
    dispatch({ type: INIT });
  };

  const userLoggedIn = (token) => {
    // adding token to local storage
    localStorage.setItem("accessToken", token);
    setTimeout(() => {
      storeLoginStatus(token);
    }, 2000);
    dispatch({
      type: LOGIN_SUCCEEDED,
    });
  };

  const checkToken = async (token) => {
    const res = await axios
      .get(`${fbUrl}${token}`)
      .then((res) => {
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
      storeLoginStatus("");
      return false;
    } else {
      console.log("Success in login check");
      dispatch({ type: LOGIN_SUCCEEDED });

      return true;
    }
  };

  // Instagram Posts Related Functions

  const getPostURL = (url) => {
    dispatch({ type: GET_POST_URL, payload: url })
  }

  function getInstagramUrlFromMediaId(media_id) {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var shortenedId = '';
    // media_id = media_id.substring(0, media_id.indexOf('_'));

    while (media_id > 0) {
        var remainder = bigInt(media_id).mod(64);
        media_id = bigInt(media_id).minus(remainder).divide(64).toString();
        shortenedId = alphabet.charAt(remainder) + shortenedId;
    }

    return 'https://www.instagram.com/p/' + shortenedId + '/';
}

  const fetchPosts = async () => {
    loader();
    dispatch({ type: LOAD_COMMENTS, payload: "Собираю комменты" });
    const accessToken = localStorage.getItem("accessToken");
    try {
      const fbBusinessPageID = await axios
        .get(
          `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
        )
        .then((fbRes) => {
          console.log("fbBusinessPageID", fbRes.data.data[0].id);
          return fbRes.data.data[0].id;
        });

      const igBusinessPageID = await axios
        .get(
          `https://graph.facebook.com/${fbBusinessPageID}?fields=instagram_business_account&access_token=${accessToken}`
        )
        .then((fbRes) => {
          console.log(
            "IG Business Page ID",
            fbRes.data.instagram_business_account.id
          );
          return fbRes.data.instagram_business_account.id;
        });

      const igPosts = await axios
        .get(
          `https://graph.facebook.com/v8.0/${igBusinessPageID}/media?access_token=${accessToken}`
        )
        .then((fbRes) => {
          console.log("IG Posts:", fbRes.data.data);
          return fbRes.data.data;
        });
      dispatch({ type: POSTS_FETCHED, payload: igPosts });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostIgId = async (id, token) => {
    const res = await axios
      .get(
        `https://graph.facebook.com/v8.0/${id}?fields=comments_count, caption,id,ig_id,like_count,permalink,timestamp,username&access_token=${token}`
      )
      .then((res) => {
        return res.data.ig_id;
      });
    return res;
  };

  const matchID = async (array, callback, token) => {
    for (const id of array) {
      const ig_id = await callback(id, token);
      const url = getInstagramUrlFromMediaId(ig_id);
      if (url === state.postURL) {
        return id;
      } else {
        console.log("MATCH ID FUNCTION, NO ID MATCHED");
      }
    }
  };

  const matchPost = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // Create an array with IDs
      const IDs = state.posts.map((post) => {
        return post.id;
      });
      // Map through all the IDs and return the one mathing postID.
      const matchedID = await matchID(IDs, fetchPostIgId, accessToken);
      console.log("ID was matched successfully:", matchedID);
      dispatch({ type: GET_POST_INSTA_ID, payload: matchedID });
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
    console.log("HOW BATCH LOOK LIKE", batch);
    batch.forEach((comment) => {
      commentsArray.push(comment);
    });

    return commentsArray;
  };

  const winnerCommentID = (comments) => {
    const index = Math.floor(Math.random() * Math.floor(comments.length));
    console.log(`RANDOM INDEX IN THE RANGE OF ${comments.length}:${index}`);
    const commentID = comments[index];
    console.log(`Random comments chosen is : ${JSON.stringify(commentID.id)}`);
    return commentID.id;
  };

  const fetchCommentID = async () => {
    console.log("Starting fetching comments");
    const accessToken = localStorage.getItem("accessToken");
    const primaryBatchUrl = `https://graph.facebook.com/v8.0/${state.postInstaID}/comments?access_token=${accessToken}`;
    let cursorAfter = "";
    let fetch = true;
    let comments = [];

    while (fetch) {
      // 1. If the comments array is empty, we fetch the first batch
      console.log("COMMENTS ARRAY BEFORE FETCHING:", comments);

      if (!comments.length) {
        console.log("FIRST PART OF THE LOOP");
        const { batch, cursor } = await fetchBatch(primaryBatchUrl);
        pushComments(comments, batch);

        console.log("COMMENTS ARRAY AFTER FIRST BATCH:", comments);
        // Break the loop if there's no pagination cursor in the response

        cursorAfter = cursor;
        // runCommentsCounter(comments);
        dispatch({ type: LOAD_COMMENTS, payload: comments });
      }
      // 2 If the comments array isn't empty and there was a pagination cursor in the last fetch, we fetch the next batch
      else if (comments && comments.length && cursorAfter) {
        console.log("SECOND PART OF THE LOOP");
        const nextBatchUrl = `https://graph.facebook.com/v8.0/${state.postInstaID}/comments?access_token=${accessToken}&limit=50&after=${cursorAfter}&pretty=1`;
        const { batch, cursor } = await fetchBatch(nextBatchUrl);
        pushComments(comments, batch);

        // Break the loop if there's no pagination cursor in the response

        cursorAfter = cursor;
        dispatch({ type: LOAD_COMMENTS, payload: comments });
      } else {
        fetch = false;

        break;
      }
    }
    // Comments come in batches so we have to merge them all into one single list
    dispatch({
      type: FETCH_WINNER_COMMENT_ID,
      payload: winnerCommentID(comments),
    });
  };

  const fetchCommentData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const { text, username } = await axios
      .get(
        `https://graph.facebook.com/${state.winnerCommentID}?fields=text,username&access_token=${accessToken}`
      )
      .then((res) => {
        return res.data;
      });
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
    loader();
  };

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
        commentsCount: state.commentsCount,
        newWinner,
        newGiveAway,
        loader,
        storeLoginStatus,
        loginCheck,
        userLoggedIn,
        checkToken,
        getPostURL,
        fetchPosts,
        matchPost,
        fetchCommentID,
        fetchCommentData,
        signOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};