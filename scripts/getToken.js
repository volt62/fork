const hre = require("hardhat");
const { ethers } = require('ethers');

const currentToken = 'NXUSD';
const data = {
  WXT: {
    token: '0xfcDe4A87b8b6FA58326BB462882f1778158B02F1',
    recipient: undefined, // first if undefined
    amount: ethers.utils.parseEther('1000000'),
    sender: '0x2f13d388b85e0ecd32e7c3d7f36d1053354ef104'
  },
  NXUSD: {
    token: '0xF14f4CE569cB3679E99d5059909E23B07bd2F387',
    recipient: undefined, // first if undefined
    amount: ethers.utils.parseEther('2000000'),
    sender: '0x0b1f9c2211f77ec3fa2719671c5646cf6e59b775'
  }
}

async function main() {
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [data[currentToken].sender],
  });

  const [first] = await hre.ethers.getSigners();

  const transactionHash = await first.sendTransaction({
    to: data[currentToken].sender,
    value: ethers.utils.parseEther("1"),
  });
  await transactionHash.wait();

  const signer = await hre.ethers.getSigner(data[currentToken].sender);
  const recipient = data[currentToken].recipient || (await hre.ethers.getSigners())[0].address;
  const erc20 = await hre.ethers.getContractAt('ERC20',
    data[currentToken].token);
  const balanceBefore = ethers.utils.formatUnits(await erc20.balanceOf(recipient),
    await erc20.decimals())
  console.log('balanceBefore', balanceBefore)
  const tx = await erc20.connect(signer).transfer(recipient, data[currentToken].amount);
  await tx.wait();
  const balanceAfter = ethers.utils.formatUnits(await erc20.balanceOf(recipient),
    await erc20.decimals())
  console.log('balanceAfter', balanceAfter)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
