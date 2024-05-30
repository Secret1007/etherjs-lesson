import dotenv from "dotenv";
import { ethers, Wallet } from "ethers";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_ID);

const main = async () => {
    // 利用私钥和provider创建wallet对象
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    // 发送ETH
    // 我用我的账户2给我的账户1发送测试币
    const Account1 = '0xc92Ad23a1dAC9d6C2CdE3943cFc41ec5b483Bb2b'
    console.log(`i. 发送前余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(Account1))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet))} ETH`)
    // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
        to: Account1,
        value: ethers.parseEther("0.001")
    }
    // iii. 发送交易，获得收据
    console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
    const receipt = await wallet.sendTransaction(tx)
    await receipt.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易详情
    // iv. 打印交易后余额
    console.log(`\niii. 发送后余额`)
    console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(Account1))} ETH`)
    console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet))} ETH`)

};
main()
