import Web3Modal from "web3modal";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import { ERC20_ABI } from "./erc20.js"

const USDC_CONTRACT_ADDRESS = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";


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
  // Send tokens
  return contract.transfer(to_address, amount).then((transferResult) => {
    return transferResult
  })
}
