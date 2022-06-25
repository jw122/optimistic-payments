import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Web3Modal from "web3modal";
import React, { useEffect } from "react";
import BuyModal from "../components/BuyModal";
import { ethers } from "ethers";

import { checkWalletConnection, connectWallet, sendUSDC } from "./wallet.js";

export default function Home() {
  const [ethersProvider, setEthersProvider] = React.useState(null);
  const [connectedAccounts, setConnectedAccounts] = React.useState([]);
  const [walletAddress, setWalletAddress] = React.useState("walletAddress")

  useEffect(() => {
    checkWalletConnection().then((res) => {
      setEthersProvider(res.provider);
      setConnectedAccounts(res.accounts);
      if (res.accounts.length > 0) {
        setWalletAddress("Connected to wallet " + res.accounts[0] + "! :)");
      } else {
        setWalletAddress("Wallet not connected! :(")
      }
    });
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Optimistic Cafe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Optimistic Cafe</h1>
        <div>{walletAddress}</div>

        {connectedAccounts.length == 0 && (
          <div className="top-nav">
            <Button
              onClick={() => {
                connectWallet().then((res) => {
                  setEthersProvider(res.provider);
                  setConnectedAccounts(res.accounts);
                });
              }}
              className="connect-btn"
              variant="warning"
            >
              🔌 Connect wallet
            </Button>
          </div>
        )}

        {ethersProvider && connectedAccounts > 0 && (
          <div className={styles.grid}>
            <a className={styles.card}>
              <img
                src="https://cdn2.iconfinder.com/data/icons/coffee-19/442/tea-1024.png"
                style={{ width: "50px" }}
              ></img>
              <h4>5 USDC</h4>

              <BuyModal provider={ethersProvider} accountAddress={connectedAccounts[0]}/>
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
