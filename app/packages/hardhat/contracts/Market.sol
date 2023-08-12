pragma solidity 0.8.18;

/*
 * @todo auction timer
 * @todo staking
 * @todo access control
 * @todo see about ReEntrancyGuard since there is a transfer of funds and withdrawal
 * @todo keep track of quantity sold. The auction should end when the quantity sold is equal to the quantity available
 * 
 */

// Opens a "Market" for a single product to be sold by multiple sellers to multiple buyers
// Market is the same as a "Product" in the context of the marketplace
contract Market {
    /**
     * WORKFLOW
     * 1. A product is added to the marketplace
     * 2. Buyers fill the order book with orders before the auction starts
     * 3. Once the auction starts, the sellers fill the order book with orders as well
     * 3a. Each seller can only fill the order book with one order
     * 4. Once enough orders are added to the order book, the price matching algorithm starts
     * 5. The price matching algorithm matches the orders and creates a trade
     * 6. The trade is executed
     * 7. The seller receives the payment
     * 8. The buyer receives the product
     */

    /**
     * Staking NOT IMPLEMENTED YET
     * Staking is used to prevent spamming the order book with orders
     * Staking is also used to prevent against malicious actors
     * 1. A seller stakes a certain amount of tokens to sell a product
     *
     */

    struct Market {
        uint256 id;
        string name;
        string description;
        string mainImage;
        uint256 createdAt;
        uint256 maxBuyOrders;
    }

    mapping(uint256 => Market) public markets;

    // order book is an array of BuyOrders and SellOrders
    struct OrderBook {
        BuyOrder[] buyOrders;
        SellOrder[] sellOrders;
    }

    struct BuyOrder {
        address buyer;
        uint256 id;
        uint256 price;
        uint256 amountStaked;
        uint256 quantity;
        uint256 createdAt;
    }

    struct SellOrder {
        address seller;
        uint256 id;
        uint256 price;
        uint256 quantity;
        uint256 createdAt;
    }

    OrderBook orderBookInstance;

    // Events
    event MarketCreated(Market market);
    event BuyOrderPlaced(BuyOrder buyOrder);
    event SellOrderPlaced(SellOrder sellOrder);
    event AuctionStarted(Market market);
    event AuctionEnded(SellOrder sellOrder);

    // should be called by some admin cf. access control
    function createMarket(uint256 _id, string memory _name, string memory _description, string memory _mainImage)
        public
    {
        Market memory newMarket = Market(_id, _name, _description, _mainImage, block.timestamp, 10);
        markets[_id] = newMarket;
        emit MarketCreated(newMarket);
    }

    // price: [{
    //     address:
    //     quantity:

    // }]

    /**
     * buyers can ask for more than 1 quantity but sellers are limited to 1 quantity until an expiration, this is to avoid monopolies and price manipulation
     * But each buyer can only place 1 bid per product to avoid spamming the order book
     */
    function placeBid(uint256 _bidPrice, uint256 quantity) public payable {
        uint256 amountPayable = _bidPrice * quantity;
        // @note why would anyone want to pay more than the bid price?
        require(msg.value == amountPayable, "Funds must match the bid price");
        BuyOrder memory newBuyOrder = BuyOrder(msg.sender, 1, _bidPrice, msg.value, quantity, block.timestamp);
        OrderBook storage orderBook = orderBookInstance;
        orderBook.buyOrders.push(newBuyOrder);
        //@todo decrease maxBuyOrders by 1
        emit BuyOrderPlaced(newBuyOrder);
    }

    function placeSellOrder(uint256 _askPrice) public {
        SellOrder memory newSellOrder = SellOrder(msg.sender, 1, _askPrice, 1, block.timestamp);
        OrderBook storage orderBook = orderBookInstance;
        orderBook.sellOrders.push(newSellOrder);
        emit SellOrderPlaced(newSellOrder);
    }

    function matchPrice() public {
        // loop through buy orders and sell orders and match the price
        // if the price matches, execute the purchase and remove the order from the order book
        _matchPrice();
    }

    // @note review this function. On Ethereum mainnet this is gas intensive and a bad idea unless there is a limit to the orderbook size
    // @note setting a limit to the orderbook size is possible in our use case
    // @todo there should be a threshold for the price, exact matches are not always possible
    function _matchPrice() private {
        for (uint256 i = 0; i < orderBookInstance.buyOrders.length; i++) {
            BuyOrder memory buyOrder = orderBookInstance.buyOrders[i];
            for (uint256 j = 0; j < orderBookInstance.sellOrders.length; j++) {
                SellOrder memory sellOrder = orderBookInstance.sellOrders[j];
                if (buyOrder.price == sellOrder.price) {
                    _executePurchase(buyOrder, sellOrder);
                }
            }
        }
    }

    // @todo complete this function
    function _executePurchase(BuyOrder memory _buyOrder, SellOrder memory _sellOrder) private {
        // transfer the tokens from the buyer to the seller
        // @todo handle any remaining funds
        // @todo update the staked amount in the buyOrder so that the actual buyer is not refunded
        address payable seller = payable(_sellOrder.seller);
        seller.transfer(_buyOrder.price);
        // @todo close the auction
        // @todo refund all other bids
        // @todo reset all the states
        // @note whichever seller wins the auction receives some native tokens as a reward

        emit AuctionEnded(_sellOrder);
    }

    function _withdraw() private {
        // once the auction is over, all funds in the contract should be returned to the buyers who did not win the auction
    }

    //////////////////////

    // helper functions
    function getMarket(uint256 _id) public view returns (Market memory) {
        return markets[_id];
    }

    function getBuyOrder(uint256 _id) public view returns (BuyOrder memory) {
        OrderBook storage orderBook = orderBookInstance;
        return orderBook.buyOrders[_id];
    }
}
