import axios from "axios";
import { URI } from "../../../config";

const fetchLogin = async (email: string, password: string) => {
  return axios.post(URI + "/login", {
    email: email,
    password: password
  });
};

export default fetchLogin;
