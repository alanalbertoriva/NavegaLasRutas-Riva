import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Cart from './components/Cart';
import PaymentForm from './components/PaymentForm';
import CartProvider from './components/CartProvider';
import ProductProvider from './components/ProductProvider';

function App() {

  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <CartProvider>
            <NavBar/>
            <Routes>
              <Route path='/' element={<ItemListContainer/>}/>
              <Route path='/categoria/:idCategoria' element={<ItemListContainer/>}/>
              <Route path='/detalle/:idProducto' element={<ItemDetailContainer/>}/>
              <Route path='/carrito' element={<Cart/>}/>
              <Route path='*' element={<NotFound/>}/>
              <Route path='/payment' element={<PaymentForm/>}/>
            </Routes>
            <Footer/>
          </CartProvider>
        </ProductProvider>
      </BrowserRouter>
    </>
  )
}

export default App
