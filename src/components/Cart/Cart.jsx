import React, { useState } from "react";

export default function Cart() {

  // получаем данные корзины из локального хранилища
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

  // функция для увеличения количества товаров
  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 }; // увеличиваем количество товаров на 1
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // сохраняем обновленные данные в локальное хранилище
  };

// функция для уменьшения количества товаров
  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }; // уменьшаем количество товаров на 1, но не меньше 1
        } else {
          return null; // удаляем товар из корзины, если количество становится меньше 1
        }
      }
      return item;
    }).filter(Boolean); // фильтруем null значения, чтобы удалить товар из корзины
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // сохраняем обновленные данные в локальное хранилище
  };


  return (
    <div>
      <h3>Корзина</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - {item.regular_price.value} x {item.quantity}
            <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};