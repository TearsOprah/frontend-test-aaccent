import React, {useState} from "react";

export default function Cart({cartItems,setCartItems}) {

  const [name, setName] = useState(""); // cостояние для имени
  const [phone, setPhone] = useState(""); // cостояние для телефона

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

  // функция для подсчета итоговой цены
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const price = item.regular_price.value;
      const quantity = item.quantity;
      totalPrice += price * quantity;
    });
    return totalPrice;
  };

  // оформление заказа
  const handleOrder = () => {
    const orderData = {
      name: name,
      phone: phone,
      items: cartItems,
    };

    // опции запроса
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    };

    // отправляем POST-запрос на сервер
    fetch('https://app.aaccent.su/js/confirm.php', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log('Заказ успешно оформлен');
        } else {
          console.error('Ошибка при оформлении заказа:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
      });
  }

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
      <p>Стоимость: {calculateTotalPrice().toFixed(2)}</p>
      <div>
        <label>Имя:</label>
        <input
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Телефон:</label>
        <input
          type={'text'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button onClick={handleOrder}>Оформить заказ</button>
    </div>
  );
};