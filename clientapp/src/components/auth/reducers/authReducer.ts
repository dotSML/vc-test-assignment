import { Action } from "../../../types/reduxTypes";
import { User } from "../types/user";

export type AuthReducerStateType = {
  isAuthenticated: boolean;
  token: string;
  user: User;
};

export const initialState: AuthReducerStateType = {
  isAuthenticated: false,
  token: "",
  user: { firstName: "", lastName: "", email: "", id: null }
};

export const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_AUTH_USER_DATA": {
      return {
        ...state,
        user: action.payload
      };
    }
    case "SET_AUTH_IS_AUTHENTICATED": {
      return {
        ...state,
        isAuthenticated: action.payload
      };
    }
    case "SET_AUTH_TOKEN": {
      return {
        ...state,
        token: action.payload
      };
    }

    default:
      return state;
  }
};
