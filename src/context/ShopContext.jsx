import { createContext, useState, useMemo, useCallback } from "react";
import { products } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs. ";
  const delivery_fee = 250;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // Add an item to the cart
  const addToCart = useCallback((itemId, quantity = 1) => {
    if (!itemId || quantity < 1) return; // Validate input
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemId]) {
        updatedCartItems[itemId] += quantity; // Increase quantity if item exists
      } else {
        updatedCartItems[itemId] = quantity; // Add new item to cart
      }
      return updatedCartItems;
    });
  }, []);

  // Get the total count of items in the cart
  const getCartCount = useCallback(() => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  }, [cartItems]);

  // Update the quantity of an item in the cart
  const updateQuantity = useCallback((itemId, quantity) => {
    if (!itemId || quantity < 0) return; // Validate input
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (quantity === 0) {
        delete updatedCartItems[itemId]; // Remove item if quantity is 0
      } else {
        updatedCartItems[itemId] = quantity; // Update quantity
      }
      return updatedCartItems;
    });
  }, []);

  // Calculate the total amount of items in the cart (including discounts)
  const getCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const itemInfo = products.find((product) => product.id === itemId);
      if (itemInfo && quantity > 0) {
        // Calculate discounted price if applicable
        const discountedPrice = itemInfo.discount
          ? itemInfo.price * (1 - itemInfo.discount / 100)
          : itemInfo.price;
        return total + discountedPrice * quantity;
      }
      return total;
    }, 0);
  }, [cartItems]);

  // Get the total discount amount for the cart
  const getTotalDiscount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const itemInfo = products.find((product) => product.id === itemId);
      if (itemInfo && itemInfo.discount && quantity > 0) {
        return total + (itemInfo.price * (itemInfo.discount / 100)) * quantity;
      }
      return total;
    }, 0);
  }, [cartItems]);

  // Get the total amount including delivery fee
  const getTotalAmount = useCallback(() => {
    const cartAmount = getCartAmount();
    return cartAmount + delivery_fee;
  }, [getCartAmount]);

  // Memoized context value
  const value = useMemo(() => ({
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getTotalDiscount,
    getTotalAmount,
  }), [
    currency,
    delivery_fee,
    search,
    showSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getTotalDiscount,
    getTotalAmount,
  ]);

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;