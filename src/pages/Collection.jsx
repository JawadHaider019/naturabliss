import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from '../components/Title';
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
  
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let productsCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(productsCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(productsCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col gap-1 border-t pt-10 sm:flex-row sm:gap-10">
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 flex cursor-pointer items-center gap-2 text-xl">
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Soap'} onChange={toggleCategory} />
              Soap
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'FaceWash'} onChange={toggleCategory} />
              FaceWash
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Shampo'} onChange={toggleCategory} />
              Shampo
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-4 flex justify-between text-base sm:text-2xl">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 px-2 text-sm">
            <option value="realvent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
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
    </div>
  );
};

export default Collection;