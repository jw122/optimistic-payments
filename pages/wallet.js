import Web3Modal from "web3modal";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import { ERC20_ABI } from "./erc20.js"

const USDC_CONTRACT_ADDRESS = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";

const config = {
  "ropsten": {
    "usdc": "0xfe724a829fdf12f7012365db98730eee33742ea2",
    "dai": "0xad6d458402f60fd3bd25163575031acdce07538d",
    "weth": "0xc778417e063141139fce010982780140aa0cd5ab"
  }
}

export async function checkWalletConnection() {
  if (!window.ethereum) {
    console.error("Metamask not initialized.")
    return {providers: null, accounts: []};
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.listAccounts();

  if (accounts.length === 0) {
    console.error("no connected accounts");
    return {providers: null, accounts: []};
  }

  return {
    provider: provider,
    accounts: accounts
  };
}

export async function connectWallet() {
  const web3Modal = new Web3Modal({
    network: "testnet",
    cacheProvider: true, // optional
  });

  const connection = await web3Modal.connect();
  console.log("wallet connected! ", connection);
  return await checkWalletConnection();
}


/**
 * Swap input token to USDC
 */
export async function swapForUSDC(provider, txObject) {
  const signer = provider.getSigner();
  signer.sendTransaction(txObject);
}

/**
 * Send a certain `amount` of USDC to `to_address`.
 */
export async function sendUSDC(provider, to_address, amount) {
  const signer = provider.getSigner()
  const gasPrice = provider.getGasPrice()
  const contract = new ethers.Contract(
    USDC_CONTRACT_ADDRESS,
    ERC20_ABI,
    signer
  );
  return contract.transfer(to_address, amount).then((transferResult) => {
    return transferResult
  })
}

/**
 * Get an ERC20 token balance.
 */
export async function getTokenBalance(provider, network, contractName, account) {
  const signer = provider.getSigner();
  const contractAddress = config[network][contractName];
  const contract = new ethers.Contract(
    contractAddress,
    ERC20_ABI,
    signer
  );
  const bal = await contract.balanceOf(account);
  return bal.toNumber();
}
