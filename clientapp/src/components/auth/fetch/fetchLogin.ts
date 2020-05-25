import axios from "axios";

const fetchLogin = async (email: string, password: string) => {
  return axios.post("http://localhost:8080/login", {
    email: email,
    password: password
  });
};

export default fetchLogin;
