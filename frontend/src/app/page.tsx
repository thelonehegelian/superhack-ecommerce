import ProductCard from "../components/ProductCard";

export default function Home(): JSX.Element {
  return (
    <div className="">
      <ProductCard
        title="test"
        description="test"
        image="https://images.unsplash.com/photo-1524805444758-089113d48a6d"
      />
    </div>
  );
}
