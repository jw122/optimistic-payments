const axios = require('axios');

const priceOfCoffeeInDollars = 2;
const sellToken = 'WETH'; //  // populated from what the user selects
const buyToken =  'USDC'; // USDC
const buyAmount = priceOfCoffeeInDollars; // priceOfCoffeeInDollars is populated from what the user selects

const axiosInstance = axios.create({
    baseURL: 'https://optimism.api.0x.org/',
    timeout: 1000,
  });

async function getSwapQuote() {
    const response = await axiosInstance.get(`swap/v1/quote?sellToken=${sellToken}&buyToken=${buyToken}&buyAmount=${buyAmount}`);
    return response.data;
}

export default function handler(req, res) {
    getSwapQuote().then(result => res.status(200).json(result));
}

