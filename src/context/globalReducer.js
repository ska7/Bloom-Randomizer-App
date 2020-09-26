// import { LOGIN_SUCCEEDED } from "./types";

import {GET_POST, LOGIN_SUCCEEDED} from "./types";

const handlers = {
  [LOGIN_SUCCEEDED]: (state, {payload}) => ({...state, isLoggedIn: true, accessToken: payload}),
  [GET_POST]: (state, {payload}) => ({...state, post: payload}),
  DEFAULT: state => state,
};

export const globalReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}

// export const globalReducer = (state, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCEEDED:
//       return {
//         ...state,
//         isLoggedIn: true,
//       };
//     default:
//       return state;
//   }
// };
