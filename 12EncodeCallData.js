import dotenv from "dotenv";
import { ethers, Wallet } from "ethers";

dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.INFURA_ID);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

const WETHAddress = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'

// 人类可读abi,将合约中的abi转成人类容易读的abi
const abiWETH = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function deposit() payable",
  "function withdraw(uint256 wad)",
  "function transfer(address dst, uint256 wad)"
];


const contractWETH = new ethers.Contract(WETHAddress, abiWETH, wallet)

const address = await wallet.getAddress()
// 1. 读取WETH合约的链上信息（WETH abi）
console.log("\n1. 读取WETH余额")
// 编码calldata
const param1 = contractWETH.interface.encodeFunctionData(
  "balanceOf",
  [address]
);
console.log(`编码结果： ${param1}`)
// 创建交易
const tx1 = {
  to: WETHAddress,
  data: param1
}
// 发起交易，可读操作（view/pure）可以用 provider.call(tx)
const balanceWETH = await provider.call(tx1)
console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`)


// 调用deposit()函数，将0.001 ETH转换为0.001 WETH，打印交易详情和余额。可以看到余额变化。

// 编码calldata
const param2 = contractWETH.interface.encodeFunctionData(
  "deposit"
);
console.log(`编码结果： ${param2}`)
// 创建交易
const tx2 = {
  to: WETHAddress,
  data: param2,
  value: ethers.parseEther("0.001")
}

// 发起交易，写入操作需要 wallet.sendTransaction(tx)
const receipt1 = await wallet.sendTransaction(tx2)
// 等待交易上链
await receipt1.wait()
console.log(`交易详情：`)
console.log(receipt1)
const balanceWETH_deposit = await contractWETH.balanceOf(address)
console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`)
