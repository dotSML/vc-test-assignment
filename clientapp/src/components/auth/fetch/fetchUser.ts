import axios from "axios";

const fetchUser = async (userId: number) => {
  return axios.post(
    "http://localhost:8080/users",
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
