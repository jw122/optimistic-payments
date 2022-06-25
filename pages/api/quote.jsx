const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://ropsten.api.0x.org/",
});

async function getSwapQuote(sellToken, buyToken, buyAmount) {
  console.log("getting swap quote");

  const response = await fetch(
    `https://ropsten.api.0x.org/swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}`
  );
  console.log("response from 0x: ", response.body);
  return response.body;
}

export default function handler(req, res) {
  console.log(req.query);
  getSwapQuote(
    req.query.sellToken,
    req.query.buyToken,
    req.query.buyAmount
  ).then((result) => res.status(200).json(result));
}
