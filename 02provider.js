import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();
/**
 * 学会使用服务商提供的rpc
 */
// 这里我们连接的是sepolia测试网
const provider = new ethers.JsonRpcProvider(process.env.INFURA_ID);

// 用自己的provider可以做很多事情
async function main() {
    // 1.查询余额
    const balance = await provider.getBalance("vitalik.eth");
    console.log("balance:", balance, ethers.formatEther(balance));

    // 2.查询provider连接到了哪条链
    const network = await provider.getNetwork();
    console.log(network.toJSON());

    // 3.查询当前区块高度
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber);

    // 4.查询钱包历史交易次数
    const txCount = await provider.getTransactionCount("0x8d2E185C8422021D7A23C9bFAc3064e37348FAB8");
    console.log(txCount);

    // 5.查询当前建议的gas设置
    const feeData = await provider.getFeeData();
    console.log(feeData);

    // 6.利用getBlock()查询区块信息，参数为要查询的区块高度
    const block = await provider.getBlock(0);
    console.log(block);

    // 7.利用getCode()查询某个地址的合约bytecode，参数为合约地址，下面例子中用的Sepolia WETH的合约地址
    const code = await provider.getCode("0xf531B8F309Be94191af87605CfBf600D71C2cFe0");
    console.log(code);
}

main();
