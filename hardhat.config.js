require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC || '';

module.exports = {
  solidity: {
    version: '0.8.0',
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      gasPrice: 'auto',
    },
    hardhat: {
      forking: {
        url: `https://api.avax.network/ext/bc/C/rpc`,
      },
      mining: {
        auto: false,
        interval: [2000, 3000]
      },
      hardfork: 'london',
      chainId: 43114,
      accounts: {
        mnemonic,
      },
    },
    avalanche: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
      chainId: 43114,
      accounts: { mnemonic },
    },
  },
};
