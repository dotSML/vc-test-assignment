import {
  authReducer,
  initialState
} from "../../components/auth/reducers/authReducer";
import {
  SET_AUTH_IS_AUTHENTICATED,
  SET_AUTH_TOKEN,
  SET_AUTH_USER_DATA
} from "../../components/auth/actions/authActions";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "", payload: "" })).toEqual({
      isAuthenticated: false,
      token: "",
      user: { firstName: "", lastName: "", id: null, email: "" }
    });
  });

  it("should handle SET_AUTH_IS_AUTHENTICATED", () => {
    expect(authReducer(undefined, SET_AUTH_IS_AUTHENTICATED(true))).toEqual({
      isAuthenticated: true,
      token: "",
      user: { firstName: "", lastName: "", id: null, email: "" }
    });
  });

  it("should handle SET_AUTH_TOKEN", () => {
    expect(authReducer(undefined, SET_AUTH_TOKEN("testtoken"))).toEqual({
      isAuthenticated: false,
      token: "testtoken",
      user: { firstName: "", lastName: "", id: null, email: "" }
    });
  });

  it("should handle SET_AUTH_USER_DATA", () => {
    expect(
      authReducer(
        undefined,
        SET_AUTH_USER_DATA({
          firstName: "testfirst",
          lastName: "testlast",
          email: "test@test.com",
          id: 59
        })
      )
    ).toEqual({
      isAuthenticated: false,
      token: "",
      user: {
        firstName: "testfirst",
        lastName: "testlast",
        email: "test@test.com",
        id: 59
      }
    });
  });
});
