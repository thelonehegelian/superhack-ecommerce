// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Product.sol";

contract ProductFactory {
    address[] public deployedProducts;

    function createProduct(
        uint256 _id,
        string memory _productName,
        string memory _productDescription,
        string memory mainImage
    ) public {
        address newProduct = address(new Product(_id, _productName, _productDescription, mainImage));
        deployedProducts.push(newProduct);
    }

    function getDeployedProducts() public view returns (address[] memory) {
        return deployedProducts;
    }
}
