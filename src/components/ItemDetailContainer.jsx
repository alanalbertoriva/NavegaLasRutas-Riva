import {useEffect, useState, useContext} from 'react';
import {useLocation} from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { CartContext } from './cartContext';

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const location = useLocation();

  const {agregarAlCarrito} = useContext(CartContext);

  const handleClick = (item) => {
    const itemAgregado = {...item, cantidad: 1};
    agregarAlCarrito(itemAgregado);
  };

  useEffect(() => {
    if (location.state) {
      setProducto(location.state);
    }
  }, []);
  
  return (
    <ItemDetail producto={producto} handleClick={handleClick}/>
  )
}

export default ItemDetailContainer