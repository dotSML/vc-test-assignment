import axios from "axios";
import { URI } from "../../../config";

const fetchUser = async (userId: number) => {
  return axios.post(
    URI + "/users",
    {
      userId: userId
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  );
};

export default fetchUser;
