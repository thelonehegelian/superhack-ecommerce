import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { Product, ProductFactory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ProductFactory", function () {

  let productFactoryContract: ProductFactory;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let productContract: Product;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  before(async () => {
    [owner, user1, user2, user3] = await ethers.getSigners();
    const productFactoryContractFactory = await ethers.getContractFactory("ProductFactory");
    productFactoryContract = (await productFactoryContractFactory.deploy()) as ProductFactory;
    await productFactoryContract.deployed();
  });
  describe("Create item", function () {
    it("Should create and get an item", async function () {
      await expect(productFactoryContract.createProduct(1, "item1", "item 1 decription", "image_url"))
        .to.emit(productFactoryContract, "ItemCreated");
      const market = await productFactoryContract.getItem(1);
      expect(market.id).to.equal(1);
      expect(market.name).to.equal("item1");
      expect(market.description).to.equal("item 1 decription");
      expect(market.mainImage).to.equal("image_url");
      const blockTimestamp = (await ethers.provider.getBlock('latest')).timestamp;
      expect(market.createdAt).to.lessThanOrEqual(blockTimestamp);
      expect(market.maxBuyOrders).to.equal(10);
    });
    it("Should get an empty item for non-existing id", async function () {
      const market = await productFactoryContract.getItem(2);
      expect(market.id).to.equal(0);
      expect(market.createdAt).to.equal(0);
    });
  });
  describe("Placing bids", function () {
    it("Should place a bid", async function () {
      const price = ethers.utils.parseEther("1.0");
      await expect(productFactoryContract.placeBid(price, 1, {value: price}))
        .to.emit(productFactoryContract, "BuyOrderPlaced");
      const order = await productFactoryContract.getBuyOrder(0);
      expect(order.id).to.equal(1);
      expect(order.buyer).to.equal(owner.address);      
      expect(order.price).to.equal(price);
      expect(order.amountStaked).to.equal(price);
      expect(order.quantity).to.equal(1);
      const blockTimestamp = (await ethers.provider.getBlock('latest')).timestamp;
      expect(order.createdAt).to.lessThanOrEqual(blockTimestamp);
    });
    it("Funds should match a bid price", async function () {
      let price: BigNumber = ethers.utils.parseEther("1.0");
      await expect(productFactoryContract.placeBid(price, 1, {value: price}))
        .to.emit(productFactoryContract, "BuyOrderPlaced");
      let funds: BigNumber = price.mul(BigNumber.from(2));
      await expect(productFactoryContract.placeBid(price, 2, {value: funds}))
        .to.emit(productFactoryContract, "BuyOrderPlaced");
      await expect(productFactoryContract.placeBid(price, 1, {value: funds}))
        .to.be.revertedWith("Funds must match the bid price");
    });
  });
  describe("Placing sell orders", function () {
    it("Should place a sell order", async function () {
      const price = ethers.utils.parseEther("1.0");
      await expect(productFactoryContract.placeSellOrder(price))
        .to.emit(productFactoryContract, "SellOrderPlaced");
      const order = await productFactoryContract.getSellOrder(0);
      expect(order.seller).to.equal(owner.address); 
      expect(order.id).to.equal(1);           
      expect(order.price).to.equal(price);
      expect(order.quantity).to.equal(1);
      const blockTimestamp = (await ethers.provider.getBlock('latest')).timestamp;
      expect(order.createdAt).to.lessThanOrEqual(blockTimestamp);
    });
  });
  describe("Match price", function () {
    it.only("Should match price and complete purchase", async function () {
      const price1 = ethers.utils.parseEther("555.0");
      const price2 = ethers.utils.parseEther("2.0");
      const price3 = ethers.utils.parseEther("3.0");
      await productFactoryContract.connect(user1).placeBid(price1, 1, {value: price1});
      await productFactoryContract.connect(user2).placeBid(price2, 1, {value: price2});
      await productFactoryContract.placeSellOrder(price3);
      await productFactoryContract.connect(user3).placeSellOrder(price1); // gets money
      
      console.log("user3 balance before: ", await ethers.provider.getBalance(user3.address));
      await expect(productFactoryContract.matchPrice())
        .to.emit(productFactoryContract, "AuctionEnded");
      console.log("user3 balance after: ", await ethers.provider.getBalance(user3.address));
    });
  });
});
