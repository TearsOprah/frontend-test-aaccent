import './ProductCard.scss'
import {useState, useEffect} from "react";

export default function ProductCard({ product }) {

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    // проверяем, есть ли товар уже в корзине при загрузке компонента
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const isProductAlreadyAdded = cartItems.some(item => item.id === product.id);
    setIsAddedToCart(isProductAlreadyAdded);
  }, [product.id]);

  const handleAddToCart = () => {
    // проверяем, есть ли уже товар в корзине
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const isProductAlreadyAdded = cartItems.some(item => item.id === product.id);

    if (!isProductAlreadyAdded) {
      // если товара нет в корзине, добавляем его в локальное хранилище с количеством 1
      const updatedProduct = { ...product, quantity: 1 }; // Добавляем поле "quantity" со значением 1
      cartItems.push(updatedProduct);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      setIsAddedToCart(true);
    }
  };

  return (
    <li className={'card'}>
      <img className={'card__image'} src={require(`../../assets${product.image}`)} alt={product.title} />
      <h3 className={'card__title'}>{product.title}</h3>
      <p className={'card__price'}>{product.regular_price.value}{product.regular_price.currency}</p>
      <p className={'card__brand'}>{product.brand}</p>
      <button onClick={handleAddToCart} disabled={isAddedToCart}>
        {isAddedToCart ? 'Добавлено' : 'Добавить в корзину'}
      </button>
    </li>
  )
}