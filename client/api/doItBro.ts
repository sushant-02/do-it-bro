import axios from "axios";

// let URL = "https://do-it-bro.herokuapp.com/api/";
let URL =
  "https://41fc-2405-201-301b-3a9b-be85-3f0e-5d60-a18f.in.ngrok.io/api/";

export default axios.create({
  baseURL: URL,
});
