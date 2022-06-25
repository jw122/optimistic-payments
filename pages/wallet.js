import Web3Modal from "web3modal";
import React, { useEffect } from "react";
import { ethers } from "ethers";

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
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  console.log("wallet connected! ", connection);
  return await checkWalletConnection();
}

export async function sendUSD(provider, amount) {
  // TODO: implement using provider.sendToken(..)
}
