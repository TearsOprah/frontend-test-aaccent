import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import React, { useState, useEffect } from "react";
import cartImg from './assets/images/shopping_cart.svg'
import homeImg from './assets/images/home.svg'


function App() {

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);
  const [totalCartItemQuantity, setTotalCartItemQuantity] = useState(0)

  // обновление локального хранилища при изменении состояния cartItems
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // функция для подсчета общего количества товаров в корзине
    const getTotalCartItemQuantity = () => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // обновляем счетчик при изменении состояния корзины
    setTotalCartItemQuantity(getTotalCartItemQuantity());
  }, [cartItems]); // зависимость от состояния cartItems



  return (
    <div className='wrapper'>

      <header>
        <Link to={'/'}><img src={homeImg} alt={'home icon'} /></Link>
        <Link to={'/cart'}><img src={cartImg} alt={'cart icon'}/>{totalCartItemQuantity}</Link>
      </header>

      <Routes>
        <Route path={'/'} element={<ProductList cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path={'/cart'} element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
