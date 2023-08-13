interface Order {
  id: number;
  buyer: string;
  bid: number;
  isAccepted: boolean;
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

export default function OrderBook() {
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
