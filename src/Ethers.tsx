import {
  ContractTransactionResponse,
  ContractTransactionReceipt,
  ethers,
} from "ethers";
import Lock from "./contracts/Lock.json";
import { EventLog } from "ethers";

function Ethers() {
  const connect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        // Request account access if needed
        await provider.send("eth_requestAccounts", []);
        // We are now connected and can get the signer
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        console.log("account address", account);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("please install metamask");
    }
  };

  const readMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const lock = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      Lock.abi,
      provider,
    );
    const message = await lock.message();
    console.log(message);
  };

  const writeMessage = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const lock = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      Lock.abi,
      signer,
    );

    /**
      TransactionResponse。这是一个包含了关于已发送事务的详细信息的对象。TransactionResponse 对象通常包括以下属性：
        to：接收者的地址，这里是合约的地址。
        from：发送者的地址，即发起交易的钱包地址。
        nonce：发送者发送的交易次数。
        gasLimit：交易可以消耗的最大 gas。
        gasPrice：交易者愿意支付的每单位 gas 的价格。
        data：交易数据，包含调用合约函数的编码信息。
        value：发送的以太币数量，对于非支付交易，通常是 0。
        chainId：交易发生在哪条链上的标识符。
        hash：事务的哈希值，是事务的唯一标识符。
     */

    // 使用签名者创建合约实例，并发送交易到以太坊网络
    // 这个函数解决（resolve）意味着交易已经被发送到以太坊网络，并且网络已经给出了一个交易哈希，即transactionResponse。
    // 然而，此时交易可能还没有被矿工打包进区块中；也就是说，它还没有被确认。
    const transactionResponse: ContractTransactionResponse =
      await lock.setMessage("Hello Paul");

    /**
     * 调用 wait() 方法时，它会返回一个 TransactionReceipt 对象，其中包含了更多的信息，如交易是否成功、产生的事件日志等。
     */

    // 等待交易被挖掘（即被区块链确认）
    // 它会异步等待直到交易被矿工处理并且包含在一个区块中，这通常需要一段时间。
    // 一旦交易被确认，.wait()方法会解决，并返回一个包含了交易确认细节的交易收据对象transactionReceipt。
    const transactionReceipt: ContractTransactionReceipt | null =
      await transactionResponse.wait();

    /**
     * A Log in Ethereum represents an event that has been included in a transaction using the LOG* opcodes,
     * which are most commonly used by Solidity's emit for announcing events.
     */

    /**
     * 在以太坊中，交易收据中的 logs 数组包含了在该交易执行过程中触发的所有事件的日志。
     * 如果你的交易调用了智能合约中的函数，并且这个函数执行中触发了事件，那么这些事件的日志就会被包含在交易收据的 logs 数组里
     * logs 数组包含了交易中所有事件的日志数据。
     * 每个日志对应一个特定的事件，包含该事件的参数和一些其他元数据。
     */

    const logs = transactionReceipt?.logs;
    const event = logs![0] as EventLog;
    console.log(event.args[0]);
  };

  return (
    <>
      <button onClick={connect}>连接到钱包（Ethers）</button>
      <button onClick={readMessage}>读合约</button>
      <button onClick={writeMessage}>写合约</button>
    </>
  );
}

export default Ethers;
