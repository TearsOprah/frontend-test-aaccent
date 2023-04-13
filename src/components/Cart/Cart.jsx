import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Cart({cartItems,setCartItems}) {

  const [name, setName] = useState(""); // cостояние для имени
  const [phone, setPhone] = useState(""); // cостояние для телефона

  const [showPopup, setShowPopup] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(null);

  const navigate = useNavigate();

  // закрытие попапа
  const handleClosePopup = () => {
    setShowPopup(false); // закрытие попапа
    if (isOrderSuccessful) {
      setCartItems([]); // очистка корзины только при успешном оформлении заказа
      navigate('/', {replace: true}); // переадресация на главную страницу
    }
  };

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
  const handleOrder = async () => {

    if (name === '' || phone === '' || cartItems.length === 0) {
      return;
    }

    const orderData = {
      name: name,
      phone: phone,
      items: cartItems,
    };

    try {
      const response = await fetch(
        "https://app.aaccent.su/js/confirm.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      if (response.ok) {
        setIsOrderSuccessful(true);
      } else {
        setIsOrderSuccessful(false);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      setShowPopup(true);
    }
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
      <p>Стоимость: {calculateTotalPrice().toFixed(2)}</p>
      <div>
        <label>Имя:</label>
        <input
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Телефон:</label>
        <input
          type={'text'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button onClick={handleOrder}>Оформить заказ</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{isOrderSuccessful ? 'Заказ успешно оформлен' : 'Ошибка при оформлении заказа'}</h2>
            <button onClick={handleClosePopup}>Закрыть</button>
          </div>
        </div>
      )}

    </div>
  );
};