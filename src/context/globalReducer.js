import {
  FETCH_COMMENT_DATA,
  FETCH_WINNER_COMMENT_ID,
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

const handlers = {
  [LOGIN_SUCCEEDED]: (state) => ({
    ...state,
    isLoggedIn: true,
  }),

  [LOGIN_FAILED]: (state) => ({ ...state, isLoggedIn: false }),
  [UPDATE_WINNERS]: (state, { payload }) => ({
    ...state,
    winners: [...state.winners, payload],
  }),
  [LOAD_COMMENTS]: (state, { payload }) => ({
    ...state,
    commentsBank: payload,
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
    loading: null,
    postURL: "",
    winnerCommentID: null,
    winners: [],
    winnerCommentData: null,
    commentsBank: [],
    commentsQuantity: 0,
  }),
  [GET_COMMENTS_QUANTITY]: (state, { payload }) => ({
    ...state,
    commentsQuantity: payload,
  }),
  [NEW_WINNER]: (state) => ({
    ...state,
    winnerCommentData: null,
  }),
  [NEW_GIVE_AWAY]: () => ({
    isLoggedIn: true,
    loading: null,
    postURL: "",
    winnerCommentID: null,
    winners: [],
    winnerCommentData: null,
    commentsBank: [],
    commentsQuantity: 0,
  }),
  [UPDATE_LOADER_STATUS]: (state, { payload }) => ({
    ...state,
    loaderStatus: payload,
  }),
  DEFAULT: (state) => state,
};

export const globalReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
