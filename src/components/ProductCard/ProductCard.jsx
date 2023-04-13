import React, { useState, useEffect } from "react";
import './ProductCard.scss';

export default function ProductCard({ product, cartItems, setCartItems }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    // проверяем, есть ли товар уже в корзине при загрузке компонента
    const isProductAlreadyAdded = cartItems.some(item => item.id === product.id);
    setIsAddedToCart(isProductAlreadyAdded);
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    // проверяем, есть ли уже товар в корзине
    const isProductAlreadyAdded = cartItems.some(item => item.id === product.id);

    if (!isProductAlreadyAdded) {
      // если товара нет в корзине, добавляем его в локальное хранилище с количеством 1
      const updatedProduct = { ...product, quantity: 1 }; // Добавляем поле "quantity" со значением 1
      setCartItems([...cartItems, updatedProduct]);
      setIsAddedToCart(true);
    } else {
      // если товар уже есть в корзине, удаляем его из локального хранилища
      const updatedCartItems = cartItems.filter(item => item.id !== product.id);
      setCartItems(updatedCartItems);
      setIsAddedToCart(false);
    }
  };

  return (
    <li className={'card'}>
      <img className={'card__image'} src={require(`../../assets${product.image}`)} alt={product.title} />
      <h3 className={'card__title'}>{product.title}</h3>
      <p className={'card__price'}>{`Цена: ${product.regular_price.value} ${product.regular_price.currency}`}</p>
      <button className={`card__button ${isAddedToCart ? 'added-btn' : ''}`} onClick={handleAddToCart}>
        {isAddedToCart ? 'Удалить' : 'Добавить'}
      </button>
    </li>
  )
}
