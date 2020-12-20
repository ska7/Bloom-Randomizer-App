import { ICommentProps } from "components/comment/CommentBody";
import { createContext } from "react";
import { IComment } from "./globalReducer";

export interface IGlobalContext {
  isLoggedIn: boolean | null;
  winnerCommentData: ICommentProps | null;
  loading: boolean | null;
  commentsBank: IComment[];
  igUsername: string;
  commentsQuantity: number;
  loaderStatus: string;
  updateLoaderStatus: (status: string) => void;
  fetchInstaInfo: (token: string) => Promise<void>;
  newWinner: () => void;
  newGiveAway: () => void;
  loginCheck: () => Promise<boolean>;
  userLoggedIn: (token: string) => void;
  signOut: () => void;
  randomizerLogic: (url: string) => void;
  loader: () => void;
}

export const GlobalContext = createContext({} as IGlobalContext);
