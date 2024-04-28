import { createWalletClient, custom } from "viem";
import { hardhat } from "viem/chains";

function Viem() {
  const connect = async () => {
    if (window.ethereum) {
      try {
        const [address] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("account address", address);

        const client = createWalletClient({
          account: address,
          chain: hardhat,
          transport: custom(window.ethereum!),
        });
        console.log(client);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("please install metamask");
    }
  };

  return (
    <>
      <button onClick={connect}>连接到钱包（Viem）</button>
    </>
  );
}

export default Viem;
