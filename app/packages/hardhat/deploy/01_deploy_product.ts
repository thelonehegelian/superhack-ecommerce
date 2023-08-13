import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployProduct: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Product", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    estimatedGasLimit: 2000000,
  });
};

export default deployProduct;

deployProduct.tags = ["Product"];
