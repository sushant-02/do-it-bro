import axios from "axios";

// let URL = "https://do-it-bro.herokuapp.com/api/";
let URL =
  "https://a952-2405-201-301b-3a9b-cb95-d3f9-27a3-a2c5.in.ngrok.io/api/";

export default axios.create({
  baseURL: URL,
});
