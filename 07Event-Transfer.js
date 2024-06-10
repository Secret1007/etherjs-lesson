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
const addressWETH = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14'
// 声明合约实例
const contract = new ethers.Contract(addressWETH, abiWETH, provider)

async function main() {
  // 得到当前block
  const block = await provider.getBlockNumber()
  console.log(`当前区块高度: ${block}`);
  console.log(`打印事件详情:`);

  // 查询过去100个区块内的Transfer事件
  const fromBlock = block - 100;
  console.log(`查询区块范围: 从 ${fromBlock} 到 ${block}`);

  try {
    // 设置过滤器
    const filter = contract.filters.Transfer();

    // 查询过滤器内的事件
    const transferEvents = await contract.queryFilter(filter, fromBlock, block);

    // 打印事件详情
    if (transferEvents.length > 0) {
      console.log(`找到 ${transferEvents.length} 个 Transfer 事件`);
      transferEvents.forEach((event, index) => {
        console.log(`事件 ${index + 1}:`, event);
      });
    } else {
      console.log('没有找到任何 Transfer 事件');
    }
  } catch (error) {
    console.error('查询事件时发生错误:', error);
  }


}

main();
