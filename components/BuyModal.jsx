import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TokenSelect from "./TokenSelect";

export default function InfoModal({provider, accountAddress}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const selectedPrice = localStorage.getItem("selectedPrice");
  return (
    <>
      <Button className="nextButton" onClick={handleShow}>
        Checkout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How would you like to pay?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Amount: {selectedPrice} USDC
          <TokenSelect provider={provider} accountAddress={accountAddress} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
