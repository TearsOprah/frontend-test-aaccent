import productsData from '../../assets/products.json'
import brandsData from '../../assets/brands.json';
import ProductCard from "../ProductCard/ProductCard";
import './ProductList.scss'
import Filter from "../Filter/Filter";
import {useEffect, useState} from "react";


export default function ProductList({ onAddToCart, cartItems, setCartItems }) {

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [isFilterApplied, setIsFilterApplied] = useState(false); // добавляем состояние для флага применения фильтра

  useEffect(() => {
    // загрузка данных продуктов из productsData
    setProducts(productsData);
    // загрузка данных брендов из brandsData
    setBrands(brandsData);
  }, []);

  const filterProduct = () => {
    // если есть выбранные бренды
    if (selectedBrands.length > 0) {
      // преобразуем значения в selectedBrands из строк в числа
      const selectedBrandIds = selectedBrands.map(brand => parseInt(brand));
      const filtered = products.filter(product => selectedBrandIds.includes(product.brand));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }

  useEffect(() => {
    filterProduct()
  }, [selectedBrands])

  return (
    <>
      <h2>ProductList</h2>

      <Filter brands={brands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              setIsFilterApplied={setIsFilterApplied}

      />

      <ul className={'products'}>
        {
          isFilterApplied ?

            filteredProducts.map(product => (<ProductCard key={product.id}
                                                          product={product}
                                                          cartItems={cartItems}
                                                          setCartItems={setCartItems}
                                                          onAddToCart={onAddToCart}
                                                          />))

            : products.map(product => (<ProductCard key={product.id}
                                                    product={product}
                                                    cartItems={cartItems}
                                                    setCartItems={setCartItems}
                                                    onAddToCart={onAddToCart}
            />))
        }
      </ul>
    </>
  )
}