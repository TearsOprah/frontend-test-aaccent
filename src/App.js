import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";



function App() {

  return (
    <div className='wrapper'>

      <Link to={'/'}>Home</Link>
      <Link to={'/cart'}>Cart</Link>

      <Routes>
        <Route path={'/'} element={<ProductList />} />
        <Route path={'/cart'} element={<Cart />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
