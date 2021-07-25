import axios from "axios";

export default axios.create({
  baseURL: "https://stockmarketcharting.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});