import productsData from '../../assets/products.json'
import brandsData from '../../assets/brands.json';
import ProductCard from "../ProductCard/ProductCard";
import './ProductList.scss'
import Filter from "../Filter/Filter";
import {useEffect, useState} from "react";


export default function ProductList() {

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [isFilterApplied, setIsFilterApplied] = useState(false); // Добавляем состояние для флага применения фильтра

  useEffect(() => {
    // загрузка данных продуктов из productsData
    setProducts(productsData);
    // загрузка данных брендов из brandsData
    setBrands(brandsData);
  }, []);


  // // Обработчик события при изменении состояния чекбокса выбора бренда
  // const handleBrandChange = (event) => {
  //   const brandId = event.target.value;
  //   const isChecked = event.target.checked;
  //
  //   // Если чекбокс отмечен, добавляем бренд в список выбранных брендов
  //   // Если чекбокс снят, удаляем бренд из списка выбранных брендов
  //   setSelectedBrands(prevSelectedBrands => {
  //     if (isChecked) {
  //       return [...prevSelectedBrands, brandId];
  //     } else {
  //       return prevSelectedBrands.filter(id => id !== brandId);
  //     }
  //   });
  // };

  // Обработчик события для кнопки "Применить"
  // const handleApplyFilters = () => {
  //   // Фильтруем продукты на основе выбранных брендов
  //   const filteredProducts = products.filter(product => selectedBrands.length === 0 || selectedBrands.includes(product.brand));
  //   setFilteredProducts(filteredProducts);
  //   setIsFilterApplied(true)
  // };

  // Обработчик события для кнопки "Сбросить"
  const handleResetFilters = () => {
    setSelectedBrands([]);
    setFilteredProducts([]);
    setIsFilterApplied(false)
  };


  return (
    <>
      <h2>ProductList</h2>

      <Filter brands={brands}

      />

      <ul className={'products'}>
        {
          isFilterApplied ?
            filteredProducts.map(product => (<ProductCard key={product.id}
                       title={product.title}
                       regular_price={product.regular_price}
                       image={require(`../../assets${product.image}`)}
                       brand={product.brand}/>))
            : products.map(product => (<ProductCard key={product.id}
                       title={product.title}
                       regular_price={product.regular_price}
                       image={require(`../../assets${product.image}`)}
                       brand={product.brand}/>))
        }
      </ul>
    </>
  )
}