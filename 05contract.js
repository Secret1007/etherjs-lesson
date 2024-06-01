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

const main = async () => {

  const address = await wallet.getAddress()
  // 1. 读取WETH合约的链上信息（WETH abi）
  console.log("\n1. 读取WETH余额")
  const balanceWETH = await contractWETH.balanceOf(address)
  console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`)
  //读取钱包内ETH余额
  const balanceETH = await provider.getBalance(wallet)

  // 如果钱包ETH足够
  if (ethers.formatEther(balanceETH) > 0.0015) {
    // // 2. 调用deposit()函数，将0.001 ETH转为WETH
    // console.log("\n2. 调用deposit()函数，存入0.001 ETH")
    // // 发起交易
    // const tx = await contractWETH.deposit({ value: ethers.parseEther("0.001") })
    // // 等待交易上链
    // await tx.wait()
    // console.log(`交易详情：`)
    // console.log(tx)
    // const balanceWETH_deposit = await contractWETH.balanceOf(address)
    // console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`)

    // 3. 调用transfer()函数，将0.001 WETH转账给 Account1
    // const Account1 = '0xc92Ad23a1dAC9d6C2CdE3943cFc41ec5b483Bb2b' 
    // console.log("\n3. 调用transfer()函数，给Account1转账0.001 WETH")
    // // 发起交易
    // const tx2 = await contractWETH.transfer(Account1, ethers.parseEther("0.001"))
    // // 等待交易上链
    // await tx2.wait()
    // const balanceWETH_transfer = await contractWETH.balanceOf(address)
    // console.log(`转账后WETH持仓: ${ethers.formatEther(balanceWETH_transfer)}\n`)
    
    // 4. 调用withdraw()函数，将0.001 WETH转换回ETH
    console.log("\n4. 调用withdraw()函数，将0.001 ETH转为0.001ETH")
    // 发起交易
    const tx3 = await contractWETH.withdraw(ethers.parseEther("0.001") )
    // 等待交易上链
    await tx3.wait()
    const balanceWETH_transfer = await contractWETH.balanceOf(address)
    console.log(`转账后WETH持仓: ${ethers.formatEther(balanceWETH_transfer)}\n`)


  } else {
    // 如果ETH不足..
    console.log('ETH不足..')
  }
}

main()
