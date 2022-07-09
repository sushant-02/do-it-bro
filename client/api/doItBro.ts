import axios from "axios";

let URL = "https://do-it-bro.herokuapp.com/api/";

export default axios.create({
  baseURL: URL,
});
