import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.MAINNET_INFURA_ID);
// 合约地址
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 交易所地址
const accountBinance = '0x28C6c06298d514Db089934071355E5743bf21d60'
// 构建ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
];
// 构建合约对象
const contractUSDT = new ethers.Contract(addressUSDT, abi, provider);

async function main() {
  const balanceUSDT = await contractUSDT.balanceOf(accountBinance)
  console.log(`USDT余额: ${ethers.formatUnits(balanceUSDT, 6)}\n`)
}
main();
