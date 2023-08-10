import Item from "../../components/ProductCard";
import OrderBook from "../../components/OrderBook";
export default function ProductDetails(): JSX.Element {
  return (
    <div className="flex flex-col p-4 items-center">
      <Item title="" description="" image="" />
      <h2>Order Book</h2>
      <OrderBook />
    </div>
  );
}
