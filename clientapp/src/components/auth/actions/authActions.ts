export const SET_AUTH_IS_AUTHENTICATED = (payload: boolean) => ({
  type: "SET_AUTH_IS_AUTHENTICATED",
  payload: payload
});

export const SET_AUTH_USER_DATA = (payload: {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}) => ({
  type: "SET_AUTH_USER_DATA",
  payload: payload
});

export const SET_AUTH_TOKEN = (payload: string) => ({
  type: "SET_AUTH_TOKEN",
  payload: payload
});
