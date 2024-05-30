import dotenv from "dotenv";
import { ethers, Wallet } from "ethers";

dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.INFURA_ID);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

// ERC20 是一种通用的以太坊代币标准，广泛用于创建和管理代币。其ABI包含了一组标准的方法，使得代币能够被其他智能合约和应用程序一致地处理
const abiERC20 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

// WETH（Wrapped Ether）是一种将以太坊原生代币（ETH）包装成ERC20标准的代币，使得ETH可以与其他ERC20代币进行互操作。其ABI通常包含ERC20标准的方法，同时可能包含一些特定于WETH的功能
const abiWETH = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function deposit() payable",
  "function withdraw(uint256)"
];

const sepoliaWETHAddress = '0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa'

const WETHAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

const contractWETH = new ethers.Contract(WETHAddress, abiWETH, wallet)
const contractWETHSepolia = new ethers.Contract(sepoliaWETHAddress, abiERC20, wallet)

const main = async () => {
  const address = await wallet.getAddress()

  console.log('address:', address)
  
  // // 包装 ETH 成 WETH
  // const txDeposit = await contractWETH.deposit({ value: ethers.parseEther("0.1") });
  // await txDeposit.wait();
  // console.log('Deposited 0.1 ETH to WETH');
  const balanceETH = await contractWETHSepolia.balanceOf(address)

  console.log('balanceETH', balanceETH)

  // // 检查 ETH 余额
  // const balanceETH = await provider.getBalance(address);
  // console.log('ETH balance:', ethers.formatEther(balanceETH));
}

main()
