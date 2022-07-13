import axios from "axios";

// let URL = "https://do-it-bro.herokuapp.com/api/";
let URL =
  "https://a901-2405-201-301b-3a9b-c01d-d1ea-1362-a566.in.ngrok.io/api/";

export default axios.create({
  baseURL: URL,
});
