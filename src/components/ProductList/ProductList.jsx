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

  // пагинация
  const [currentPage, setCurrentPage] = useState(1)

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  // кол-во элементов на странице
  const ITEMS_PER_PAGE = 6;
  // общее кол-во элементов
  const TOTAL_ITEMS = isFilterApplied ? filteredProducts.length : products.length;
  // кол-во страниц
  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;

  return (
    <>
      <div className={'products-page'}>
        <Filter brands={brands}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                setIsFilterApplied={setIsFilterApplied}

        />

        <ul className={'products'}>
          {
            isFilterApplied ?

              filteredProducts.slice(startIndex, endIndex).map(product => (<ProductCard key={product.id}
                                                            product={product}
                                                            cartItems={cartItems}
                                                            setCartItems={setCartItems}
                                                            onAddToCart={onAddToCart}
              />))

              : products.slice(startIndex, endIndex).map(product => (<ProductCard key={product.id}
                                                      product={product}
                                                      cartItems={cartItems}
                                                      setCartItems={setCartItems}
                                                      onAddToCart={onAddToCart}
              />))
          }
        </ul>
      </div>

      <div className={'pagination'}>
        <p className={'pagination-title'}>Страница:</p>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-button ${pageNumber === currentPage ? 'active-page-button' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>

  )
}