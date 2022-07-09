import axios from "axios";

// let URL = "https://do-it-bro.herokuapp.com/api/";
let URL =
  "https://99c4-2405-201-301b-3a9b-6b98-e7c3-7529-6339.in.ngrok.io/api/";

export default axios.create({
  baseURL: URL,
});
