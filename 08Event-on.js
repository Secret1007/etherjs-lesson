import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.INFURA_ID);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

// WETH ABI，只包含我们关心的Transfer事件
const abiWETH = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];
// 测试网WETH地址
const addressWETH = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';
// 声明合约实例
const contract = new ethers.Contract(addressWETH, abiWETH, provider);

async function main() {
  // 得到当前block
  const block = await provider.getBlockNumber();
  console.log(`当前区块高度: ${block}`);
  console.log(`打印事件详情:`);

  const WETHAddress = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';

  const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 value)"
  ];
  // 生成WETH合约对象
  const contractETH = new ethers.Contract(WETHAddress, abi, provider);

  // 持续监听WETH合约
  console.log("\n2. 利用contract.on()，持续监听Transfer事件");
  contractETH.on('Transfer', (from, to, value) => {
    console.log(
      // 打印结果
      `${from} -> ${to} ${ethers.formatUnits(value, 18)}`
    );
  });
}
main();
