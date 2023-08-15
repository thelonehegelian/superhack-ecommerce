const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        SimpleStorage: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              name: "retrieve",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "num",
                  type: "uint256",
                },
              ],
              name: "store",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  420: [
    {
      chainId: "420",
      name: "optimismGoerli",
      contracts: {
        ProductFactory: {
          address: "0x8D50094410571c85bcAA71D7fA52FaCA68043DD3",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_productName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_productDescription",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "mainImage",
                  type: "string",
                },
              ],
              name: "createProduct",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "deployedProducts",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getDeployedProducts",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
