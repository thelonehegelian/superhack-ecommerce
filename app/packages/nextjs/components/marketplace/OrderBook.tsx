interface Order {
  id: number;
  buyer: string;
  bid: number;
  isAccepted: boolean;
}


interface OrderBookProps {
  orders: Order[];
}

export default function OrderBook({ orders }: OrderBookProps) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {orders.map(order => (
        <li key={order.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{order.buyer}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">Bid: ${order.bid}</p>
              {/*<button className="text-sm leading-6 text-gray-900">{order.isAccepted ? 'Accepted' : 'Not Accepted'}</button>*/}
              <button className="text-sm leading-6 text-gray-900 bg-blue-200 p-2 rounded-xl">Accept</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
