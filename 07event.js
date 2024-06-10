import dotenv from "dotenv";
import { ethers, Wallet } from "ethers";

dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.INFURA_ID);
const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

const addressWETH = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
const abiWETH = [
    // 转账事件
    "event Transfer(address indexed from, address indexed to, uint256 value)",
];

const main = async () => {
    // 声明合约实例
    const contract = new ethers.Contract(addressWETH, abiWETH, provider);
    // // 得到当前block
    // const block = await provider.getBlockNumber();
    const balance = await provider.getBalance("vitalik.eth");
    console.log("provider:", balance);
    // console.log(`当前区块高度: ${block}`);
    // console.log(`打印事件详情:`);
    // const transferEvents = await contract.queryFilter("Transfer", block - 10, block);
    // // 打印第1个Transfer事件
    // console.log(transferEvents[0]);
};

main();
