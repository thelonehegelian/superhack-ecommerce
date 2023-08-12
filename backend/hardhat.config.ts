import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "./tasks";
import * as dotenvenc from '@chainlink/env-enc'
dotenvenc.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHEREUM_SEPOLIA_RPC_URL = process.env.ETHEREUM_SEPOLIA_RPC_URL;
const OPTIMISM_GOERLI_RPC_URL = process.env.OPTIMISM_GOERLI_RPC_URL;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {version: "0.8.18"}, 
      {version: "0.4.24"},
    ],
  },
  namedAccounts: {
    deployer: { default: 0 },
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    ethereumSepolia: {
      url: ETHEREUM_SEPOLIA_RPC_URL !== undefined ? ETHEREUM_SEPOLIA_RPC_URL : '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 11155111
    },
    optimismGoerli: {
      url: OPTIMISM_GOERLI_RPC_URL !== undefined ? OPTIMISM_GOERLI_RPC_URL : '',
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 420,
    },
  },
  typechain: {
    externalArtifacts: ['./abi/*.json']
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
};

export default config;
