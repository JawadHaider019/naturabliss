import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5)); // Limit to 5 best-selling products
  }, [products]); // Add products as a dependency to re-run the effect when products change

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSeller.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            discount={item.discount} // Pass the discount prop
            rating={item.rating} // Pass the rating prop
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;