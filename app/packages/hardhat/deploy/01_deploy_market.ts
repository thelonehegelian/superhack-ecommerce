import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMarket: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Market", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};

export default deployMarket;

deployMarket.tags = ["Market"];
