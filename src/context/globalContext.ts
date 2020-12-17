import { ICommentProps } from "components/comment/CommentBody";
import { createContext } from "react";

interface IComment {
  id: string;
  text: string;
  timestamp?: string;
}

export interface IGlobalContext {
  isLoggedIn: boolean | null;
  winnerCommentData: ICommentProps | null;
  loading: boolean | null;
  commentsBank: IComment[];
  commentsQuantity: number;
  loaderStatus: string;
  igUsername: string;
  updateLoaderStatus: (status: string) => void;
  fetchInstaInfo: () => string;
  newWinner: () => void;
  newGiveAway: () => void;
  loginCheck: () => boolean;
  userLoggedIn: (token: string) => void;
  signOut: () => void;
  randomizerLogic: (url: string) => void;
  loader: () => void;
}

export const GlobalContext = createContext({} as IGlobalContext);
