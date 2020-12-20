import { ICommentProps } from "components/comment/CommentBody";
import { createContext } from "react";
import { IGlobalState } from "./globalReducer";

export interface IGlobalContext extends IGlobalState {
  updateLoaderStatus: (status: string) => void;
  fetchInstaInfo: (token: string) => string;
  newWinner: () => void;
  newGiveAway: () => void;
  loginCheck: () => boolean;
  userLoggedIn: (token: string) => void;
  signOut: () => void;
  randomizerLogic: (url: string) => void;
  loader: () => void;
}

export const GlobalContext = createContext({} as IGlobalContext);
