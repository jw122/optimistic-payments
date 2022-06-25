import { checkResultErrors } from "ethers/lib/utils";
import Dropdown from "react-bootstrap/Dropdown";
import { sendUSDC, swapForUSDC, checkWalletConnection } from '../pages/wallet'

function TokenSelect() {
  // when an item is clicked in the dropdown, get the selected token
  const handleClick = (event) => {
    console.log("clicked on dropdown!", event.target.textContent);
    const token = event.target.textContent;
    search(token, 10);
  };

  const search = async (token, amount) => {
    console.log("searching for quote for " + token + " , amount " + amount);

    let swapQuery = await fetch(
      `api/quote?sellToken=${token}&buyToken=USDC&amount=${amount}`
    );
    swapQuery = await swapQuery.json();
    console.log("results: ", swapQuery);
    const { provider, accounts } = await checkWalletConnection();
    console.log('provider', provider);
    await swapForUSDC(provider, swapQuery);
  };

  

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select a token to pay
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
