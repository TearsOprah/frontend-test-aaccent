import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import './Cart.scss'
import closeImg from '../../assets/images/close.svg'

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
      navigate('/', {replace: true}); // переадресация на главную страницу при успешном
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
      alert('Не заполнены поля или корзина пустая')
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

  const popupRef = useRef();


  // закрытие на esc и клик по области
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        // закрытие попапа при нажатии на клавишу Esc
        handleClosePopup();
      }
    };

    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // закрытие попапа при клике вне области попапа
        handleClosePopup();
      }
    };

    if (showPopup) {
      document.addEventListener("keydown", handleEscKey);
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup, handleClosePopup]);


  return (
    <div className={'cart'}>
      <h3 className={'cart__title'}>Корзина</h3>
      <ul className={'cart__list'}>
        {cartItems.map((item) => (
          <li className={'cart__item'} key={item.id}>
            {item.title} - {item.regular_price.value} x {item.quantity}
            <button className={'cart__change-button'} onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            <button className={'cart__change-button'} onClick={() => handleDecreaseQuantity(item.id)}>-</button>
          </li>
        ))}
      </ul>
      <p className={'cart__total-price'}>Стоимость: {calculateTotalPrice().toFixed(2)}</p>
      <div>
        <label className={'cart__input-label'}>Ваше имя: </label>
        <input
          className={'cart__input'}
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={'cart__input-label'}>Телефон: </label>
        <input
          className={'cart__input'}
          type={'text'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button className={'cart__order-button'} onClick={handleOrder}>Оформить заказ</button>

      {showPopup && (
        <div className="popup">
          <div ref={popupRef} className="popup-content">
            <h2 className={'popup__message'}>{isOrderSuccessful ? 'Заказ успешно оформлен' : 'Ошибка при оформлении заказа'}</h2>
            <button className={'popup__closer'} onClick={handleClosePopup}><img src={closeImg} alt={'close icon'}/></button>
          </div>
        </div>
      )}

    </div>
  );
};