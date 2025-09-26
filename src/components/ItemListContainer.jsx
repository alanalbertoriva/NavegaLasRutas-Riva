import {useEffect, useState, useContext} from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import ProductContext from './productContext';

function ItemListContainer() {
  const {idCategoria} = useParams();
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const {filtrarProductosPorCategoria, productos} = useContext(ProductContext);

  useEffect(() => {
    if (idCategoria) {
      const productosFiltrados = filtrarProductosPorCategoria(idCategoria);
      setProductosFiltrados(productosFiltrados);
    } else {
        setProductosFiltrados(productos);
    }
  }, [idCategoria, productos]);

  return (
    <>
      {productosFiltrados.length === 0 ? (
        <p>Cargando productos...</p>) 
      : (
        <ItemList productos={productosFiltrados} />
      )}
    </>
  )
}

export default ItemListContainer