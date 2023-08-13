import React from 'react';

// Assume that you have the soldTo and soldPrice data available
const soldTo = "John Doe";
const soldPrice = 49.99;

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white border border-gray-200 rounded-lg shadow w-full max-w-md p-4 sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Standard plan</h5>
        <div className="flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">{soldPrice}</span>
          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <p className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
          Item sold to {soldTo} for ${soldPrice} per month.
        </p>
        {/* Other list items */}
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center mt-6"
        >
          Choose plan
        </button>
      </div>
    </div>
  );
};

export default ModalOverlay;
