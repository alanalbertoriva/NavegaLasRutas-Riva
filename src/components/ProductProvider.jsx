import {useState, useEffect} from 'react';
import ProductContext from './productContext';
import { fetchProductos, updateProducto, fetchProductoPorId } from '../firebase';

function ProductProvider({children}) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProductos().then(data => setProductos(data))
    // fetch('/data.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //       setProductos(data);
    //   })
      .catch((error) => console.error('Error al cargar los productos:', error));
    }, []);

    const filtrarProductosPorCategoria = (categoria) => {
        return productos.filter(producto => producto.categoria.toLowerCase().replace(' ', '') === categoria.toLowerCase());
    }

    const reducirCantidadProducto = (id, cantidad) => {
        updateProducto(id, { cantidad: productos.find(prod => prod.id_producto === id).cantidad - cantidad })
        .then(() => {
            setProductos(productos.map(producto =>
                    producto.id_producto === id
                    ? {...producto, cantidad: producto.cantidad - cantidad}
                    : producto
            ));
        })
        .catch((error) => console.error('Error al actualizar el producto:', error));
    }

    const hayStock = async (id) => {
        const producto = await fetchProductoPorId(id);
        return producto && producto.cantidad > 0;
    }

    const validarStock = async (id, cantidadSolicitada) => {
        const producto = await fetchProductoPorId(id);
        return producto && producto.cantidad >= cantidadSolicitada;
    }

    // const formatoFireStore = (item) => {
    //     return (({ nombre, bodega, categoria, precio_unitario, cantidad, descripcion, imagen_url }) => ({ nombre, bodega, categoria, precio_unitario, cantidad, descripcion, imagen_url }))(item);
    // }

  return (
    <ProductContext.Provider value={{productos, filtrarProductosPorCategoria, reducirCantidadProducto, hayStock, validarStock}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider