import {
  FADE_IN,
  FETCH_COMMENT_DATA,
  FETCH_WINNER_COMMENT_ID,
  GET_POST_ID,
  GET_POST_INSTA_ID,
  GET_POST_INSTA_URL,
  GET_POST_URL,
  INIT,
  LOADING,
  LOAD_COMMENTS,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
  NEW_GIVE_AWAY,
  NEW_WINNER,
  POSTS_FETCHED,
  TOKEN_DISMISSED,
  TOKEN_RECEIVED,
} from "./types";

const handlers = {
  [LOGIN_SUCCEEDED]: (state) => ({
    ...state,
    isLoggedIn: true,
  }),

  [LOGIN_FAILED]: (state) => ({ ...state, isLoggedIn: false }),
  [GET_POST_URL]: (state, { payload }) => ({ ...state, postURL: payload }),
  [GET_POST_INSTA_ID]: (state, { payload }) => ({
    ...state,
    postInstaID: payload,
  }),
  [LOAD_COMMENTS]: (state, { payload }) => ({
    ...state,
    commentsCount: payload,
  }),
  [FETCH_WINNER_COMMENT_ID]: (state, { payload }) => ({
    ...state,
    winnerCommentID: payload,
  }),
  [POSTS_FETCHED]: (state, { payload }) => ({ ...state, posts: payload }),
  [FETCH_COMMENT_DATA]: (state, { payload }) => ({
    ...state,
    winnerCommentData: payload,
  }),
  [LOADING]: (state) => ({ ...state, loading: !state.loading }),
  [INIT]: () => ({
    isLoggedIn: null,
    loading: false,
    tokenReceived: null,
    postID: "",
    postInstaID: null,
    posts: null,
    winnerCommentID: null,
    winnerCommentData: null,
    commentsCount: [],
  }),
  [NEW_WINNER]: (state) => ({
    ...state,
    winnerCommentID: null,
    winnerCommentData: null,
    commentsCount: [],
  }),
  [NEW_GIVE_AWAY]: () => ({
    isLoggedIn: true,
    loading: false,
    tokenReceived: null,
    postID: "",
    postInstaID: null,
    posts: null,
    winnerCommentID: null,
    winnerCommentData: null,
    commentsCount: [],
  }),
  DEFAULT: (state) => state,
};

export const globalReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
