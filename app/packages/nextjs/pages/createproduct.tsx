import { useState } from "react";
import { useScaffoldContractRead } from "../hooks/scaffold-eth";
import { useContractRead } from 'wagmi';

// TODO: Get deployed factory contract
// TODO: write to deployed factory contract
// TODO: Return to Products page

const CreateProductForm = () => {
  const { data: products } = useScaffoldContractRead({
    contractName: "ProductFactory",
    functionName: "deployedProducts",
    args: [0n],
  });
  console.log(products);
  const { data: product } = useContractRead({
    address: products,
    abi: [
      {
        inputs: [],
        name: "getEthUsdRate",
        outputs: [
          {
            internalType: "int256",
            name: "",
            type: "int256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
    ],
    functionName: "getEthUsdRate",

  });

  console.log("Exchange Rate", product);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageLink, setImageLink] = useState('');



  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Product Name"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="productDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Product Description"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="imageLink" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Image Link
        </label>
        <input
          type="text"
          id="imageLink"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Image Link"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Product
      </button>
    </form>
  );
};

export default CreateProductForm;
