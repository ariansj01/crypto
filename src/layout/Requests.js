import axios from "axios";

let BaseURL = "https://api.coinlore.net/api"

export const Crypto = axios.create({
    baseURL: BaseURL
})