import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discount, rating }) => {
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const discountPrice = discount ? price * (1 - discount / 100) : null;

  // Function to render rating stars
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div  onClick={handleClick}  className="cursor-pointer text-gray-700">
      <div className="relative overflow-hidden ">
        {/* Discount Badge */}
        {discount && (
          <div className="absolute right-2 top-2 rounded-full bg-black px-2 py-1 text-xs font-medium text-white">
            {discount}% OFF
          </div>
        )}
        <img
          className="transition ease-in-out hover:scale-110"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pb-1 pt-3 text-sm">{name}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">
          {currency} {discountPrice ? discountPrice.toFixed(2) : price.toFixed(2)}
        </p>
        {discount && (
          <p className="text-sm text-gray-500 line-through">
            {currency} {price.toFixed(2)}
          </p>
        )}
      </div>
      {rating && <div className="mt-1 flex">{renderRating(rating)}</div>}
    </div>
  );
};

export default ProductItem;