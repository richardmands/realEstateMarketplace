const path = require("path");
require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = process.env.INFURA_PROJECT_SECRET;

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "react-app/src/contracts"),
  networks: {
    development: {
     host: process.env.GANACHE_URL_SHORT,     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,       // rinkeby's id
        gas: 5000000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 5000000000
    },
  },
   compilers: {
    solc: {
      version: "0.5.5",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
