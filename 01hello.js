import { ethers } from "ethers";

// Provider类是一个为以太坊网络连接提供抽象的类，它提供对区块链及其状态的只读访问。
// 我们声明一个provider用于连接以太坊网络
// ethers内置了一些公用rpc,方便用户连接以太坊
// ethers内置的rpc访问速度有限制，仅测试用,生产环境还是要申请个人rpc
const provider = ethers.getDefaultProvider();

const main = async () => {
    const balance = await provider.getBalance("vitalik.eth");
    console.log("balance:", balance, ethers.formatEther(balance));
};

main();
