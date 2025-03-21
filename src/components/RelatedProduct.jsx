import { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);


  const filteredProducts = useMemo(() => {
    if (products && products.length > 0) {
      return products
        .filter((item) => category === item.category)
        .slice(0, 5); 
    }
    return [];
  }, [products, category]);

  useEffect(() => {
    setRelated(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className="my-24">
      <div className="py-2 text-center text-3xl">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {related.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            discount={item.discount} 
            rating={item.rating} 
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;