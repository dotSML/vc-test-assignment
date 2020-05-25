import axios from "axios";
import { URI } from "../../../config";
import { User } from "../types/user";

const fetchSignup: (user: User) => Promise<any> = user => {
  return axios.post(URI + "/signup", {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  });
};

export default fetchSignup;
