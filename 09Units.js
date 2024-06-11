import { ethers } from "ethers";
async function main() {
  const oneGwei = ethers.getBigInt("1000000000"); // 从十进制字符串生成
  //代码参考：https://docs.ethers.org/v6/api/utils/#about-units
  console.group('\n2. 格式化：小单位转大单位，formatUnits');
  console.log(ethers.formatUnits(oneGwei, 0));
  // '1000000000'
  console.log(ethers.formatUnits(oneGwei, "gwei"));
  // '1.0'
  console.log(ethers.formatUnits(oneGwei, 9));
  // '1.0'
  console.log(ethers.formatUnits(oneGwei, "ether"));
  // `0.000000001`
  console.log(ethers.formatUnits(1000000000, "gwei"));
  // '1.0'
  console.log(ethers.formatEther(oneGwei));
  // `0.000000001` 等同于formatUnits(value, "ether")
  console.groupEnd();

  // 3. 解析：大单位转小单位
  // 例如将ether转换为wei：parseUnits(变量, 单位),parseUnits默认单位是 ether
  // 代码参考：https://docs.ethers.org/v6/api/utils/#about-units
  console.group('\n3. 解析：大单位转小单位，parseUnits');
  console.log(ethers.parseUnits("1.0").toString());
  // { BigNumber: "1000000000000000000" }
  console.log(ethers.parseUnits("1.0", "ether").toString());
  // { BigNumber: "1000000000000000000" }
  console.log(ethers.parseUnits("1.0", 18).toString());
  // { BigNumber: "1000000000000000000" }
  console.log(ethers.parseUnits("1.0", "gwei").toString());
  // { BigNumber: "1000000000" }
  console.log(ethers.parseUnits("1.0", 9).toString());
  // { BigNumber: "1000000000" }
  console.log(ethers.parseEther("1.0").toString());
  // { BigNumber: "1000000000000000000" } 等同于parseUnits(value, "ether")
  console.groupEnd();
}
main();