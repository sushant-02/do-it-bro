import axios from "axios";

let URL;
// URL = "https://do-it-bro.herokuapp.com/api/";
URL = "https://50c8-2405-201-301b-3a9b-f6f4-6e85-11a7-5916.in.ngrok.io/api/";

// if (process.env.NODE_ENV === "production") {
// } else {
//   URL = "https://23bb-2405-201-301b-3a9b-4696-926e-e50d-1c8d.in.ngrok.io/api/";
// }

export default axios.create({
  baseURL: URL,
});

// headers: {
//   Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
// },
