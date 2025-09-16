import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setProducto(location.state);
    }
  }, []);
  
  return (
    <ItemDetail producto={producto} />
  )
}

export default ItemDetailContainer