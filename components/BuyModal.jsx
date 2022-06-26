import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/Home.module.css";
import TokenSelect from "./TokenSelect";
import { SwapWidget, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { ethers } from "ethers";
import { ERC20_ABI } from "../pages/erc20";

export default function InfoModal({ provider, accountAddress }) {
  const UNISWAP_TOKEN_LIST = "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

  const USDC = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607"; // USDC on optimism

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectedPrice = localStorage.getItem("selectedPrice");

  const customTheme = {
    tokenColorExtraction: true, // Enable color extraction of the output token
  };

  // pay merchant in USDC

  const payMerchant = async () => {
    // USDC contract
    const merchantAddress = "0xB851b9C7f834c8988E30221336C90E9688cF60B5";
    let walletSigner = provider.getSigner();
    const usdcContract = new ethers.Contract(USDC, ERC20_ABI, walletSigner);
    // prep amount
    let send_token_amount = selectedPrice.toString();
    const amountInDecimals = ethers.utils.parseUnits(send_token_amount, 6);
    const tx = await usdcContract.transfer(merchantAddress, amountInDecimals);
    console.log(`Transaction hash: ${tx.hash}`);
  };

  return (
    <>
      <Button className={styles.btnHover} onClick={handleShow}>
        Buy
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pay with any token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Price: {selectedPrice} USDC</b>
          <p>No USDC? No problem. Swap from any token: </p>
          {/* <TokenSelect provider={provider} accountAddress={accountAddress} /> */}
          <div className="Uniswap">
            <SwapWidget
              provider={provider}
              theme={customTheme}
              tokenList={UNISWAP_TOKEN_LIST}
              defaultOutputTokenAddress={USDC}
            />
          </div>
          <div>
            <Button onClick={payMerchant} className={styles.btnHoverCheckout}>
              Checkout
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
