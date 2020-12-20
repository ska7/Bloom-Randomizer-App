import { ICommentProps } from "components/comment/CommentBody";
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

export interface IComment {
  id: string;
  text: string;
  timestamp?: string;
}

export interface IPost {
  id: string;
}

export interface IGlobalState {
  isLoggedIn: boolean | null;
  loading: boolean | null;
  winnerCommentID: string | null;
  winners: string[];
  igUsername: string;
  igBusinessAccountID: string;
  igPosts: IPost[];
  winnerCommentData: ICommentProps | null;
  commentsBank: IComment[];
  commentsQuantity: number;
  loaderStatus: string;
}

interface Handlers {
  [key: string]: (state: IGlobalState, payload?: any) => IGlobalState;
}

export type Actions =
  | {
      type:
        | "LOGIN_SUCCEEDED"
        | "LOGIN_FAILED"
        | "INIT"
        | "LOADING"
        | "NEW_WINNER"
        | "NEW_GIVE_AWAY";
    }
  | { type: "UPDATE_WINNERS" | "UPDATE_LOADER_STATUS"; payload: string }
  | { type: "LOAD_COMMENTS"; payload: IComment[] }
  | { type: "POSTS_FETCHED"; payload: IPost[] }
  | { type: "FETCH_COMMENT_DATA"; payload: ICommentProps }
  | { type: "GET_COMMENTS_QUANTITY"; payload: number };

const handlers: Handlers = {
  [LOGIN_SUCCEEDED]: (state: IGlobalState) => ({
    ...state,
    isLoggedIn: true,
  }),

  [LOGIN_FAILED]: (state: IGlobalState) => ({ ...state, isLoggedIn: false }),
  [UPDATE_WINNERS]: (state: IGlobalState, payload: string) => ({
    ...state,
    winners: [...state.winners, payload],
  }),
  [LOAD_COMMENTS]: (
    state: IGlobalState,
    { payload }: { payload: IComment[] }
  ) => ({
    ...state,
    commentsBank: payload,
  }),
  [POSTS_FETCHED]: (
    state: IGlobalState,
    { payload }: { payload: IPost[] }
  ) => ({
    ...state,
    igPosts: payload,
  }),
  [FETCH_COMMENT_DATA]: (
    state: IGlobalState,
    { payload }: { payload: ICommentProps }
  ) => ({
    ...state,
    winnerCommentData: payload,
  }),
  [LOADING]: (state: IGlobalState) => ({ ...state, loading: !state.loading }),
  [INIT]: () => ({
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
  }),
  [GET_COMMENTS_QUANTITY]: (
    state: IGlobalState,
    { payload }: { payload: number }
  ) => ({
    ...state,
    commentsQuantity: payload,
  }),
  [NEW_WINNER]: (state: IGlobalState) => ({
    ...state,
    winnerCommentData: null,
  }),
  [NEW_GIVE_AWAY]: (state: IGlobalState) => ({
    ...state,
    isLoggedIn: true,
    loading: null,
    winnerCommentID: null,
    winners: [],
    winnerCommentData: null,
    commentsBank: [],
    commentsQuantity: 0,
    loaderStatus: "",
  }),
  [UPDATE_LOADER_STATUS]: (
    state: IGlobalState,
    { payload }: { payload: string }
  ) => ({
    ...state,
    loaderStatus: payload,
  }),
  DEFAULT: (state: IGlobalState) => state,
};

export const globalReducer = (
  state: IGlobalState,
  action: Actions
): IGlobalState => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
