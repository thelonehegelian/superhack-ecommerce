import { useState } from "react";
import Product from "../components/marketplace/Product";
interface Item {
  id: number;
  itemName: string;
  imageUrl: string;
  itemPrice: number;
  isSold: boolean;
  description: string;
}

// NOTE: this data should come from the smart contract
const items: Item[] = [
  { id: 1, itemName: "Circus Clown", imageUrl: "https://plus.unsplash.com/premium_photo-1664391892863-155a57b0bdfa", itemPrice: 10.99, isSold: false, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 2, itemName: "Invisible Unicorn Horn", imageUrl: "https://plus.unsplash.com/premium_photo-1664391892863-155a57b0bdfa", itemPrice: 25.49, isSold: true, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 3, itemName: "Fizzing Whizbang Popcorn", imageUrl: "https://plus.unsplash.com/premium_photo-1664391892863-155a57b0bdfa", itemPrice: 5.99, isSold: false, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 4, itemName: "Sasquatch Slippers", imageUrl: "https://plus.unsplash.com/premium_photo-1664391892863-155a57b0bdfa", itemPrice: 15.0, isSold: true, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
  { id: 5, itemName: "Banana Peel Skateboard", imageUrl: "https://plus.unsplash.com/premium_photo-1664391892863-155a57b0bdfa", itemPrice: 8.75, isSold: false, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae nostrum deleniti pariatur sit fugiat eos cupiditate asperiores reprehenderit! Necessitatibus, similique! Asperiores, ad nam deserunt tempore tempora nemo! Sunt, nulla molestiae?" },
];

console.log(items);
const Market: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Item>();

  const handleProductClick = (id: number) => {
    const item = items.filter(item => item.id === id);
    setSelectedProduct(item[0]);
    console.log(selectedProduct);
  };

  const renderProducts = () => {
    return items.map(item => (
      <Product
        key={item.id}
        title={item.itemName}
        description=" This is a description of the product."
        imageUrl={item.imageUrl} // You can provide the actual imageUrl here
        itemPrice={item.itemPrice}
        isSold={item.isSold}
        onClick={() => handleProductClick(item.id)}
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
        {selectedProduct && (<Product title={selectedProduct.itemName} description="" imageUrl={selectedProduct.imageUrl} />)}
      </div>
      <div className="flex-1 bg-green-500 p-4">{/* Content for the third group */}</div>
      <div className="flex-1 bg-yellow-500 p-4">{/* Content for the fourth group */}</div>
    </div>
  );
};

export default Market;
