import {
  FADE_IN,
  FETCH_COMMENT_DATA,
  FETCH_WINNER_COMMENT_ID,
  GET_POST_ID,
  GET_POST_INSTA_ID,
  LOADING,
  LOAD_COMMENTS,
  LOGIN_FAILED,
  LOGIN_SUCCEEDED,
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
  [GET_POST_ID]: (state, { payload }) => ({ ...state, postID: payload }),
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
  DEFAULT: (state) => state,
};

export const globalReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
