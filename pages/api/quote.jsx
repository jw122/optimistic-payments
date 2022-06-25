const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://ropsten.api.0x.org/",
  timeout: 8000,
});

async function getSwapQuote(sellToken, buyToken, buyAmount) {
  console.log("getting swap quote");
  // https://ropsten.api.0x.org/swap/v1/quote?sellToken=USDC&buyToken=OP&buyAmount=10
  const response = await axiosInstance.get(
    `swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}`
  );
  console.log("respnose from 0x: ", response);
  return response.data;
}

export default function handler(req, res) {
  console.log(req.query);
  getSwapQuote(
    req.query.sellToken,
    req.query.buyToken,
    req.query.buyAmount
  ).then((result) => res.status(200).json(result));
}
