import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: "AIzaSyA0Cdq8bhp013fPPeHNB_PQXOioccOJt84",
    type: "video",
  },
});
