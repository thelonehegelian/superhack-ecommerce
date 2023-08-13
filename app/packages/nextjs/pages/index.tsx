import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-opacity-50 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481437156560-3205f6a55735')" }}>
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-semibold text-gray-800">BuyerBazaar</h1>
          <p className="mt-2 text-gray-600">Explore our marketplace and find amazing products!</p>
          <Link href="/market" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 ease-in-out">
            Go to Market
          </Link>
        </div>
      </div>

    </>
  );
};

export default Home;
