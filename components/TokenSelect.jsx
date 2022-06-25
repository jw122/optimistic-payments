import Dropdown from "react-bootstrap/Dropdown";
import { sendUSDC, swapForUSDC, checkWalletConnection } from "../pages/wallet";
import { useState } from "react";

function TokenSelect() {
  const [fetching, setFetching] = useState(false);

  // when an item is clicked in the dropdown, get the selected token
  const handleClick = (event) => {
    console.log("token selected", event.target.textContent);
    const token = event.target.textContent;
    // TODO: pass in the actual amount
    setFetching(true);
    search(token, 100);
  };

  const search = async (token, amount) => {
    console.log("searching for quote for " + token + ", amount " + amount);

    // add a spinner
    let swapQuery = await fetch(
      `api/quote?sellToken=${token}&buyToken=USDC&amount=${amount}`
    );
    swapQuery = await swapQuery.json();
    setFetching(false);
    console.log("results: ", swapQuery);

    // TODO: extract the exchange rate from results and render in UI
    const { provider, accounts } = await checkWalletConnection();
    console.log("provider", provider);
    await swapForUSDC(provider, swapQuery);
  };

  return (
    <Dropdown>
      <span>
        {/* working */}
        {fetching ? (
          <p>
            <img
              src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
              style={{ width: "1em" }}
            ></img>{" "}
            Loading...
          </p>
        ) : (
          <></>
        )}
      </span>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select payment token
      </Dropdown.Toggle>

      {/* TODO: this dropdown should be based on the tokens actually held by the user */}
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleClick} value="DAI">
          DAI
        </Dropdown.Item>
        <Dropdown.Item onClick={handleClick}>WETH</Dropdown.Item>

        <Dropdown.Item onClick={handleClick}>OP</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TokenSelect;
