import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TokenSelect from "./TokenSelect";
import { SwapWidget, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";

export default function InfoModal({ provider, accountAddress }) {
  const UNISWAP_TOKEN_LIST = "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

  const USDC = "0x7F5c764cBc14f9669B88837ca1490cCa17c31607";

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectedPrice = localStorage.getItem("selectedPrice");

  const customTheme = {
    tokenColorExtraction: true, // Enable color extraction of the output token
  };

  return (
    <>
      <Button className="nextButton" onClick={handleShow}>
        Checkout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Amount: {selectedPrice} USDC
          {/* <TokenSelect provider={provider} accountAddress={accountAddress} /> */}
          <div className="Uniswap">
            <SwapWidget
              provider={provider}
              theme={customTheme}
              tokenList={UNISWAP_TOKEN_LIST}
              defaultOutputTokenAddress={USDC}
            />
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
