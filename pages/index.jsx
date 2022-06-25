import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useEffect } from "react";
import BuyModal from "../components/BuyModal";

export default function Home() {
  useEffect(() => {
    checkWalletConnection();
  });

  async function checkWalletConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    console.log("provider: ", provider);
    const accounts = await provider.listAccounts();
    console.log("current accounts: ", accounts);

    if (accounts.length === 0) {
      console.log("no connected accounts");
    }
  }

  async function connectWallet() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    console.log("wallet connected! ", connection);
    checkWalletConnection();
  }

  async function buyModal() {
    console.log("clicked on buyModal");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Optimistic Cafe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Optimistic Cafe</h1>

        <div className="top-nav">
          <Button
            onClick={connectWallet}
            className="connect-btn"
            variant="warning"
          >
            🔌 Connect wallet
          </Button>
        </div>

        <div className={styles.grid}>
          <a className={styles.card}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/coffee-19/442/tea-1024.png"
              style={{ width: "50px" }}
            ></img>
            <h4>5 USDC</h4>
            {/* <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p> */}
            <BuyModal></BuyModal>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}