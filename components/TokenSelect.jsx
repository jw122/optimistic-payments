import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import {
  sendUSDC,
  swapForUSDC,
  getTokenBalance,
  checkWalletConnection,
} from "../pages/wallet";

function TokenSelect({ provider, accountAddress }) {
  // when an item is clicked in the dropdown, get the selected token
  const handleClick = (event) => {
    console.log("token selected", event.target.textContent);
    const token = event.target.textContent;
    const selectedPrice = localStorage.getItem("selectedPrice");
    search(token, selectedPrice);
  };

  const search = async (token, amount) => {
    console.log("searching for quote for " + token + " , amount " + amount);
    let swapQuery = await fetch(
      `api/quote?sellToken=${token}&buyToken=USDC&buyAmount=${amount}`
    );
    console.log("results: ", swapQuery);
    swapQuery = await swapQuery.json();
    // setFetching(false);

    // TODO: extract the exchange rate from results and render in UI
    const { provider, accounts } = await checkWalletConnection();
    console.log("provider", provider);
    await swapForUSDC(provider, swapQuery);
  };

  const [network, setNetwork] = React.useState("ropsten");
  const [balances, setBalances] = React.useState({});
  const currencies = ["dai", "weth", "usdc"];

  React.useEffect(() => {
    if (Object.keys(balances).length == 0) {
      // load all token balances
      const requests = currencies.map((currency) => {
        return getTokenBalance(provider, network, currency, accountAddress);
      });
      Promise.all(requests).then((allResults) => {
        const updatedBalances = {};
        allResults.map((balance, i) => {
          updatedBalances[currencies[i]] = balance;
        });
        setBalances(updatedBalances);
      });
    }
  });

  const hasAnyNonzeroCurrency =
    balances &&
    !!Object.keys(balances).find((currency) => {
      balances[currency] > 0;
    });
  const paymentDisabled = !hasAnyNonzeroCurrency;

  return (
    <Dropdown>
      <Dropdown.Toggle
        // disabled={paymentDisabled}
        variant="success"
        id="dropdown-basic"
      >
        Select a token to pay
      </Dropdown.Toggle>
      {/* {paymentDisabled && <p>You don't have any tokens :(</p>} */}

      <Dropdown.Menu>
        {currencies
          .filter((currency) => balances)
          .map((currency, index) => (
            <Dropdown.Item onClick={handleClick} value={currency} key={index}>
              {currency.toUpperCase()}
              {/* {currency} ({balances[currency]}) */}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TokenSelect;
