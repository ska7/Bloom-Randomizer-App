import React, { useReducer } from "react";
import axios from "axios";
import bigInt from "big-integer";
import { GlobalContext, IGlobalContext } from "./globalContext";
import { globalReducer, IGlobalState, IPost, IComment } from "./globalReducer";
import {
  FETCH_COMMENT_DATA,
  GET_COMMENTS_QUANTITY,
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

const fbUrl = "https://graph.facebook.com/me/accounts?access_token=";
const diaBloomAvatar =
  "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-19/s150x150/120194219_1405772352959804_3358456821050278774_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_ohc=-OfRSODnoAkAX-QukDj&_nc_tp=25&oh=08de320eec28af9aa253d2fa80ca54bf&oe=5FD4FE85";

const GlobalState: React.FC<React.ReactNode> = ({ children }) => {
  const initState: IGlobalState = {
    isLoggedIn: null,
    loading: null,
    winnerCommentID: null,
    winners: [],
    igUsername: "",
    igBusinessAccountID: "",
    igPosts: [],
    winnerCommentData: null,
    commentsBank: [],
    commentsQuantity: 0,
    loaderStatus: "",
  };

  const [state, dispatch] = useReducer(globalReducer, initState);

  // Displays loader
  const loader = () => dispatch({ type: LOADING });

  const updateLoaderStatus = (status: string) => {
    dispatch({ type: UPDATE_LOADER_STATUS, payload: status });
  };
  // Runs when 'new winner' button is clicled
  const newWinner = async (): Promise<void> => {
    // Login Check is needed because sometimes an access token may expire in the middle of a give-away and cause bugs.
    const loggedIn = await loginCheck();
    if (loggedIn) {
      updateLoaderStatus("Ищу нового победителя");
      dispatch({ type: NEW_WINNER });
      fetchCommentData(state.commentsBank, winnerCommentID, state.winners);
    } else {
      dispatch({ type: INIT });
    }
  };

  // Runs when 'new give' button is clicled
  const newGiveAway = (): void => dispatch({ type: NEW_GIVE_AWAY });

  // =================== Login Related Functions

  const signOut = (): void => {
    localStorage.removeItem("id");
    localStorage.removeItem("accessToken");
    dispatch({ type: INIT });
    loginCheck();
  };

  const userLoggedIn = (token: string): void => {
    localStorage.setItem("accessToken", token);
    dispatch({
      type: LOGIN_SUCCEEDED,
    });
  };

  const checkToken = async (token: string): Promise<string> => {
    const res = await axios
      .get(`${fbUrl}${token}`)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e.response.status;
      });
    console.log("TOKEN IN CHECK TOKEN", res);
    return res;
  };

  const loginCheck = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("accessToken");
    const check = accessToken ? await checkToken(accessToken) : 400;

    if ((accessToken && check === 400) || accessToken === null) {
      dispatch({ type: LOGIN_FAILED });
      return false;
    } else {
      dispatch({ type: LOGIN_SUCCEEDED });
      return true;
    }
  };

  // =================== Instagram Posts Related Functions

  // Func makes use of bigInt library to emulate url link of the instagram post to later compare it to the input so we can find the one matching.
  const getInstagramUrlFromMediaId = (media_id: any): string => {
    var alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    var shortenedId = "";
    while (media_id > 0) {
      var remainder: any = bigInt(media_id).mod(64);
      media_id = bigInt(media_id).minus(remainder).divide(64).toString();
      console.log("WHAT IS UP WITH MEDIA ID", media_id);
      shortenedId = alphabet.charAt(remainder) + shortenedId;
    }
    return "https://www.instagram.com/p/" + shortenedId + "/";
  };

  // Func to fetch instagram username and instagram business page id. Both are stored in the local storage
  const fetchInstaInfo = async (token: string): Promise<void> => {
    try {
      const fbBusinessPageID = await axios
        .get(`https://graph.facebook.com/me/accounts?access_token=${token}`)
        .then((fbRes) => {
          return fbRes.data.data[0].id;
        });

      await axios
        .get(
          `https://graph.facebook.com/${fbBusinessPageID}?fields=instagram_business_account,username&access_token=${token}`
        )
        .then((fbRes) => {
          return axios.get(
            `https://graph.facebook.com/${fbRes.data.instagram_business_account.id}?fields=username&access_token=${token}`
          );
        })
        .then((res) => {
          localStorage.setItem("name", res.data.username);
          localStorage.setItem("id", res.data.id);
          return res.data.id;
        });
    } catch (e) {
      console.log("Error white getting Insta Info. Global State.", e);
    }
  };

  const fetchPosts = async (): Promise<IPost[]> => {
    updateLoaderStatus("Собираю комменты");
    const accessToken = localStorage.getItem("accessToken");
    const igBusinessPageID = localStorage.getItem("id");
    try {
      // We fetch posts and store them in the state.
      const igPosts: IPost[] = await axios
        .get(
          `https://graph.facebook.com/v8.0/${igBusinessPageID}/media?access_token=${accessToken}`
        )
        .then((fbRes) => {
          return fbRes.data.data;
        });

      dispatch({ type: POSTS_FETCHED, payload: igPosts });
      return igPosts;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // Each IG post has two different IDs : public ID and Instagram API ID.
  // Public ID is exposed whereas Instagram API ID must be fetched via API by using its public ID. IG API ID will be used to fetch post data.
  const fetchPostIgId = async (id: string, token: string): Promise<string> => {
    const res: string = await axios
      .get(
        `https://graph.facebook.com/v8.0/${id}?fields=ig_id&access_token=${token}`
      )
      .then((res) => {
        return res.data.ig_id;
      })
      .catch((e) => {
        return e;
      });
    return res;
  };

  // Func that loops through the array of fetched IG posts and does a get request for each post to get its Instagram API ID.
  // Having Insta API ID of each post, we then emulate the url link for each to compare it to the user input.
  // In the end, we return the Instagram API ID of the matched post.
  const matchID = async (
    array: string[],
    callback: (id: string, token: string) => Promise<string>,
    token: string,
    inputUrl: string
  ): Promise<string> => {
    let matchedID = "";
    for (const id of array) {
      const ig_id = await callback(id, token);
      const url = getInstagramUrlFromMediaId(ig_id);
      if (url === inputUrl) {
        matchedID = id;
      }
    }

    return matchedID;
  };

  // Here we glue the match post logic together. This func uses matchID and fetchPostIgId funcs from above.
  const matchPost = async (posts: IPost[], url: string): Promise<string> => {
    try {
      const accessToken = localStorage.getItem("accessToken") || "";
      // Create an array with IDs
      const IDs = posts.map((post: { id: string }) => {
        return post.id;
      });
      // Map through all the IDs and return the one mathing postID.
      const matchedID = await matchID(IDs, fetchPostIgId, accessToken, url);
      return matchedID;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // ====================== Comments related functions

  // Function to fetch a single comments batch

  const fetchBatch = async (
    url: string
  ): Promise<{ batch: IComment[]; cursor: string }> => {
    // If this func returns a cursor, the app will know that there's another page with comments and it should fetch it.
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

  // Func to merge a single comments batch with all other batches
  const pushComments = (commentsArray: IComment[], batch: IComment[]) => {
    batch.forEach((comment) => {
      commentsArray.push(comment);
    });

    return commentsArray;
  };

  // Comments are fetched by using the Instagram API ID of the matched post.
  const fetchComments = async (id: string) => {
    // Loader status changes to an empty string so the number of comments processed can be displayed on the loader
    updateLoaderStatus("");
    const accessToken = localStorage.getItem("accessToken");
    const primaryBatchUrl = `https://graph.facebook.com/v8.0/${id}/comments?access_token=${accessToken}`;
    let cursorAfter = "";
    let fetch = true;
    let comments: IComment[] = [];

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
      // 2. If the comments array isn't empty and there was a pagination cursor in the last fetch, we fetch the next batch
      else if (comments && comments.length && cursorAfter) {
        const nextBatchUrl = `https://graph.facebook.com/v8.0/${id}/comments?fields=id,text,username&access_token=${accessToken}&limit=50&after=${cursorAfter}&pretty=1`;
        const { batch, cursor } = await fetchBatch(nextBatchUrl);

        pushComments(comments, batch);
        cursorAfter = cursor;
        dispatch({ type: GET_COMMENTS_QUANTITY, payload: comments.length });

        dispatch({ type: LOAD_COMMENTS, payload: comments });
      } else {
        // Break the loop if there's no pagination cursor in the response
        fetch = false;
        break;
      }
    }

    return comments;
  };

  // Func generates a random number from 0 to comments.length and returns the id of the winner comment.

  const winnerCommentID = (comments: IComment[]) => {
    const index = Math.floor(Math.random() * Math.floor(comments.length));
    // console.log(`RANDOM INDEX IN THE RANGE OF ${comments.length}:${index}`);
    const commentID = comments[index];
    return commentID.id;
  };

  // Func takes in 3 params : array with IG comments, func to generate a random number, and array with usernames who already won thus should not participate

  const fetchCommentData = async (
    comments: IComment[],
    getRandomID: (comments: IComment[]) => string,
    winners: string[]
  ) => {
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
        if (!winners.includes(username) && newArray.length >= 2) {
          dispatch({ type: UPDATE_WINNERS, payload: username });
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
          findingWinner = false;
        } // If there's 0 comments left in the array and the last username already won, display the "no users left to choose from" message
        else if (newArray.length <= 1 && winners.includes(username)) {
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
        }
        dispatch({ type: LOAD_COMMENTS, payload: newArray });
      }
    } catch (e) {
      // If something goes wrong, display the error message
      dispatch({
        type: FETCH_COMMENT_DATA,
        payload: {
          picture: diaBloomAvatar,
          username: "dia.bloom",
          content: `Упс, ошибка! Давай еще раз, нажми на "Еще рандом"`,
        },
      });
      loader();
    }
    // End of while loop
  };

  // This func deletes an already processed comment from the comments array

  const deleteCommentFromArray = (
    commentsArray: IComment[],
    winnerCommentID: string
  ) => {
    let res: IComment[] = [];

    commentsArray.forEach((comment) => {
      if (comment.id !== winnerCommentID) {
        res.push(comment);
      }
    });

    return res;
  };

  // Randomizer Logic

  const randomizerLogic = async (url: string) => {
    try {
      await loginCheck();
      // if state.igPosts is empty, fetch posts.
      // We store posts in case user wants to proceed with another give away and we don't have to do more get requests than necessary
      // loader();
      const posts = !state.igPosts.length ? await fetchPosts() : state.igPosts;
      // Find id of the post with the matching url
      const id = await matchPost(posts, url);
      // Fetch winner comment id
      const comments = await fetchComments(id);
      // Fetch winner comment data
      await fetchCommentData(comments, winnerCommentID, state.winners);
    } catch (e) {
      console.log(e);
      dispatch({ type: NEW_GIVE_AWAY });
    }
  };

  const context: IGlobalContext = {
    isLoggedIn: state.isLoggedIn,
    winnerCommentData: state.winnerCommentData,
    loading: state.loading,
    commentsBank: state.commentsBank,
    commentsQuantity: state.commentsQuantity,
    loaderStatus: state.loaderStatus,
    igUsername: state.igUsername,
    updateLoaderStatus,
    fetchInstaInfo,
    newWinner,
    newGiveAway,
    loginCheck,
    userLoggedIn,
    signOut,
    randomizerLogic,
    loader,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalState;
