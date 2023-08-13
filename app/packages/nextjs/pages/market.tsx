import { useState } from "react";
import Product from "../components/marketplace/Product";
import OrderBook from "~~/components/marketplace/OrderBook";
// import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";


interface Order {
  id: number;
  buyer: string;
  bid: number;
  isAccepted: boolean;
}
interface Item {
  id: number;
  itemName: string;
  imageUrl: string;
  itemPrice: number;
  isSold: boolean;
  description: string;
  orderBook: Order[];
}


const orders: Order[] = [
  {
    id: 1,
    buyer: "0xAbCdEf0123456789ABCDEF0123456789abcdef01",
    bid: 25.99,
    isAccepted: true,
  },
  {
    id: 2,
    buyer: "0x1234567890abcdefABCDEF0123456789aBcDeF01",
    bid: 19.99,
    isAccepted: false,
  },
  {
    id: 3,
    buyer: "0x9876543210ABCDEFabcdef0123456789aBCDEf01",
    bid: 34.99,
    isAccepted: true,
  },
  {
    id: 4,
    buyer: "0xfedcba0987654321FEDCBA0123456789aBcDef01",
    bid: 42.99,
    isAccepted: true,
  },
  {
    id: 5,
    buyer: "0x0123456789ABCDEFabcdef0123456789aBCDef01",
    bid: 15.99,
    isAccepted: false,
  },
  {
    id: 6,
    buyer: "0xCbA9876543210FEDCBA0123456789abcdef0123",
    bid: 29.99,
    isAccepted: true,
  },
  {
    id: 7,
    buyer: "0xFEDCBA9876543210abcdef0123456789aBcDeF01",
    bid: 21.99,
    isAccepted: false,
  },
  {
    id: 8,
    buyer: "0x4567890aBcDef0123456789ABCDEFabcdef0123",
    bid: 37.99,
    isAccepted: true,
  },
  {
    id: 9,
    buyer: "0x67890aBcDef0123456789ABCDEFabcdef012345",
    bid: 10.99,
    isAccepted: false,
  },
  {
    id: 10,
    buyer: "0xABCDEF0123456789abcdef0123456789aBcdeF01",
    bid: 50.99,
    isAccepted: true,
  },
];
// NOTE: this data should come from the smart contract
const items: Item[] = [
  {
    id: 1,
    itemName: "Postcards of the Hanging",
    description: "A set of vintage-style postcards featuring enigmatic and surreal scenes that capture the essence of Desolation Row.",
    itemPrice: 19.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmT14UeyPZkPXna2UT7ruLy23Aby2vxsA3gjTryc6wF9Nt?filename=DALL%C2%B7E%202023-08-13%2005.16.22%20-%20Postcards%20of%20the%20Hanging%2C%20A%20set%20of%20vintage-style%20postcards%20featuring%20enigmatic%20and%20surreal%20scenes.png",
    orderBook: orders,
  },

  {
    id: 2,
    itemName: "Bette Davis Style Back Pocket Jeans",
    description: "A stylish pair of jeans with back pockets designed in tribute to Bette Davis, combining fashion and classic Hollywood charm.",
    itemPrice: 59.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmPoMjf9vkthucE29rs4nbESFcXLJZYALd69wm36GdrbjD?filename=DALL%C2%B7E%202023-08-13%2005.16.10%20-%20A%20stylish%20pair%20of%20jeans%20with%20back%20pockets%20designed%20in%20tribute%20to%20Bette%20Davis%2C%20combining%20fashion%20and%20classic%20Hollywood%20charm%2C%20vintage%20polaroid.png",
    orderBook: orders,
  },
  {
    id: 3,
    itemName: "Romeo's Melancholic Eau de Parfum",
    description: "A fragrance that captures the emotional depth of Romeo's character, blending notes of longing and passion in a unique scent.",
    itemPrice: 49.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmPydVVPQrjgTVsuWDNBcpipWCc94jGWdGiCMTVJghc4b8?filename=DALL%C2%B7E%202023-08-13%2005.29.34%20-%20an%20expensive%20and%20complexly%20designed%20perfume%20bottle%20with%20a%20print%20of%20romeo%20and%20juliet%20.png",
    orderBook: orders,
  },
  {
    id: 4,
    itemName: "Fortune-Teller's Hidden Secrets Tarot Deck",
    description: "A beautifully illustrated tarot deck that unravels the mysteries of fortune-telling, offering insights into the hidden truths of life.",
    itemPrice: 34.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmUvZvQcudpqvAYE2teTcNc52tYFDoFWyCQLd4c2XyWiXS?filename=DALL%C2%B7E%202023-08-13%2005.30.02%20-%20A%20beautifully%20illustrated%20tarot%20deck%20that%20unravels%20the%20mysteries%20of%20fortune-telling%2C%20offering%20insights%20into%20the%20hidden%20truths%20of%20life.png",
    orderBook: orders,
  },
  {
    id: 5,
    itemName: "Cain and Abel Keepsake Figurines",
    description: "Intricately crafted figurines depicting the contrasting characters of Cain and Abel, symbolic of the eternal struggle between good and evil.",
    itemPrice: 29.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmfFxQqTgYeRjHyVS8toZrgs5YtjBjHSfPF1J4GNcKJ4NQ?filename=DALL%C2%B7E%202023-08-13%2005.16.14%20-%20Intricately%20crafted%20figurines%20depicting%20the%20contrasting%20characters%20of%20Cain%20and%20Abel%2C%20symbolic%20of%20the%20eternal%20struggle%20between%20good%20and%20evil.png",
    orderBook: orders,
  },
  {
    id: 6,
    itemName: "Immaculately Frightful Electric Violin",
    description: "A replica electric violin inspired by Einstein's disguise as Robin Hood, designed to produce haunting melodies that resonate with mystery.",
    itemPrice: 249.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmQ8nUSvMosqpFrQw2cbsBLUVg8r8AEaRTt1P2ZoABppYo?filename=DALL%C2%B7E%202023-08-13%2005.15.58%20-%20Mad%20scientist%20wearing%20a%20Robin%20Hood%20Costume%2C%20playing%20an%20electric%20violin%2C%20expressionist%20painting.png",
    orderBook: orders,
  },
  {
    id: 7,
    itemName: "Phantom's Perfect Priest Costume",
    description:
      "A detailed costume inspired by the Phantom of the Opera's priestly image, perfect for a masquerade ball or Halloween event.",
    itemPrice: 79.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmXsNVc8rUgzejysTPBfGn5A826g6zC5nyBDmuEmAMLZZ9?filename=DALL%C2%B7E%202023-08-13%2005.27.33%20-%20A%20detailed%20costume%20inspired%20by%20the%20Phantom%20of%20the%20Opera's%20priestly%20image%2C%20perfect%20for%20a%20masquerade%20ball%20or%20Halloween%20event.png",
    orderBook: orders,
  },
  {
    id: 8,
    itemName: "Heart Attack Machine Art Print",
    description: "A thought-provoking art print that symbolizes the mechanized pressures of modern life, as mentioned in the lyrics.",
    itemPrice: 24.99,
    isSold: false,
    imageUrl: "https://ipfs.io/ipfs/QmViNasQjqBFmsXx9ojQVoEX1VatLdm25ymVPenxU5D7VR?filename=DALL%C2%B7E%202023-08-13%2005.24.48%20-%20Heart%20Attack%20Machine%20Art%20Print%20A%20thought-provoking%20art%20print%20that%20symbolizes%20the%20mechanized%20pressures%20of%20modern%20life.png",
    orderBook: orders,
  },
  {
    id: 9,
    itemName: "Mermaid's Window Sea View Canvas",
    description:
      "A captivating canvas print featuring a beautiful underwater scene with mermaids, providing a window to the depths of the sea.",
    itemPrice: 39.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/Qmefh8mVF2gF29x8MmvVnthneydPauydiKJJ6L1o5vLF23?filename=DALL%C2%B7E%202023-08-13%2005.27.47%20-%20A%20captivating%20canvas%20print%20featuring%20a%20beautiful%20underwater%20scene%20with%20mermaids%2C%20providing%20a%20window%20to%20the%20depths%20of%20the%20sea.png",
    orderBook: orders,
  },
  {
    id: 10,
    itemName: "Reimagined Doorknob",
    description: "A decorative and unique doorknob design that pays homage to the line 'About the time the doorknob broke' from the lyrics.",
    itemPrice: 14.99,
    isSold: false,
    imageUrl:
      "https://ipfs.io/ipfs/QmQRXnRSUXzGfHLmyuXKDnxoXNBdFLQiSPtz1KFituBNs9?filename=DALL%C2%B7E%202023-08-13%2005.27.39%20-%20A%20decorative%20and%20unique%20broken%20doorknob%20design%2C%20art%20deco%20print.png",
    orderBook: orders,
  },
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
        description={item.description}
        imageUrl={item.imageUrl} // You can provide the actual imageUrl here
        itemPrice={item.itemPrice}
        isSold={item.isSold}
        onClick={() => handleProductClick(item.id)}
        isSelected={false}
      />
    ));
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-red-500 p-4 overflow-scroll">
        <h1 className="text-4xl font-bold text-white ">All Products</h1>
        {renderProducts()}
      </div>
      <div className="flex-1 bg-blue-500 p-4">
        <h1 className="text-4xl font-bold text-white ">Selected Product</h1>
        {selectedProduct && (<Product title={selectedProduct.itemName} description={selectedProduct.description} imageUrl={selectedProduct.imageUrl} isSelected={true} />)}
      </div>
      <div className="flex-1  p-4 overflow-scroll"><OrderBook /></div>
      <div className="flex-1 bg-yellow-500 p-4">{/* Content for the fourth group */}</div>
    </div>
  );
};

export default Market;
