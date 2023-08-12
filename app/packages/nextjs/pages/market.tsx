import { useState } from "react";
import Product from "../components/marketplace/Product";
interface Item {
  id: number;
  itemName: string;
  itemPrice: number;
  isSold: boolean;
  description: string;
}

// NOTE: this data should come from the smart contract
const items: Item[] = [
  { id: 1, itemName: "Circus Clown", itemPrice: 10.99, isSold: false, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 2, itemName: "Invisible Unicorn Horn", itemPrice: 25.49, isSold: true, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 3, itemName: "Fizzing Whizbang Popcorn", itemPrice: 5.99, isSold: false, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 4, itemName: "Sasquatch Slippers", itemPrice: 15.0, isSold: true, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 5, itemName: "Banana Peel Skateboard", itemPrice: 8.75, isSold: false, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
];

console.log(items);
const Market: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderProducts = () => {
    return items.map(item => (
      <Product
        key={item.id}
        id={item.id}
        title={item.itemName}
        description=" This is a description of the product."
        imageUrl={""} // You can provide the actual imageUrl here
        itemPrice={item.itemPrice}
        isSold={item.isSold}
      />
    ));
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-red-500 p-4">
        <h1 className="text-4xl font-bold text-white ">All Products</h1>
        {renderProducts()}
      </div>
      <div className="flex-1 bg-blue-500 p-4">
        <h1 className="text-4xl font-bold text-white ">Selected Product</h1>

      </div>
      <div className="flex-1 bg-green-500 p-4">{/* Content for the third group */}</div>
      <div className="flex-1 bg-yellow-500 p-4">{/* Content for the fourth group */}</div>
    </div>
  );
};

export default Market;
