const axios = require('axios');

const priceOfCoffeeInDollars = 2;
const buyAmount = priceOfCoffeeInDollars; // priceOfCoffeeInDollars is populated from what the user selects

const axiosInstance = axios.create({
    baseURL: 'https://optimism.api.0x.org/',
    timeout: 1000,
  });

async function getSwapQuote(sellToken, buyToken) {
    const response = await axiosInstance.get(`swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}`);
    return response.data;
}

export default function handler(req, res) {
    console.log(req.query);
    getSwapQuote(req.query.sellToken, req.query.buyToken).then(result => res.status(200).json(result));
}

