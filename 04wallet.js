import dotenv from "dotenv";
import { ethers, Wallet } from "ethers";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_ID);

// 1.创建钱包
const createWallet = async () => {
    // 创建随机的wallet对象
    const wallet1 = ethers.Wallet.createRandom();
    const wallet1WithProvider = wallet1.connect(provider);
    const mnemonic = wallet1.mnemonic; // 获取助记词

    // console.log("wallet1:", wallet1);

    // 利用私钥和provider创建wallet对象
    const privateKey = process.env.WALLET_PRIVATE_KEY;

    const wallet2 = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    // console.log("wallet2:", wallet2);

    // 利用助记词创建钱包
    const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase);
    // console.log("wallet3:", wallet3);

    // console.log(wallet1.address === wallet3.address);
};
