import {useEffect, useState} from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';

function ItemListContainer() {
  const {idCategoria} = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        if (idCategoria) {
          const productosFiltrados = data.filter(
            (producto) => producto.categoria.toLowerCase().replace(' ', '') === idCategoria.toLowerCase()
          );
          setProductos(productosFiltrados);
        } else {
          setProductos(data);
        }
      })
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, [idCategoria]);

  return (
    <>
      {productos.length === 0 ? (
        <p>Cargando productos...</p>) 
      : (
        <ItemList productos={productos} />
      )}
    </>
  )
}

export default ItemListContainer