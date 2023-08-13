import Link from 'next/link';
import Image from 'next/image';
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth/';
import { useState } from 'react';
import { on } from 'events';

interface ProductProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

const Product = ({ title, description, imageUrl, onClick }: ProductProps) => {

  const [isSelect, setIsSelect] = useState(false);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: 'SimpleStorage',
    functionName: 'store',
    args: [1021n],
  });
  const handleBid = () => {

    writeAsync();
    console.log('bid')
  };
  const handleSelect = () => {
    onClick();
    setIsSelect(!isSelect);
  };
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image className="p-8 rounded-t-lg" src={imageUrl} alt="product image" width={500} height={100} />
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <div className="flex items-center mt-2.5 mb-5">
            {/* Rating SVGs */}
            {/* ... */}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            {
              isSelect ? (<button onClick={handleSelect} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Select
              </button>) : <button onClick={handleBid} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Bid
              </button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
