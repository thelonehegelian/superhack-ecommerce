import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

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
};

export default config;
