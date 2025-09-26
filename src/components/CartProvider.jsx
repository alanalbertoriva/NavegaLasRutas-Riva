import { useEffect, useState } from 'react'
import { CartContext } from './cartContext';
import { useContext } from 'react';
import ProductContext from './productContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function CartProvider({children}) {
    const [carrito, setCarrito] = useState([]);
    const {hayStock, validarStock} = useContext(ProductContext);
    const MySwal = withReactContent(Swal);

    const cantidadPorProducto = (id) => {
        const producto = carrito.find(producto => producto.id_producto === id);
        return producto ? producto.cantidad : 0;
    }

    const agregarAlCarrito = (item) => {
        if(carrito.find(producto => producto.id_producto === item.id_producto) && hayStock(item.id_producto) && validarStock(item.id_producto, cantidadPorProducto(item.id_producto) + item.cantidad)) {
            sumarCantidad(item.id_producto);
            MySwal.fire({
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                return;
            }); 
            
        } else if (!carrito.find(producto => producto.id_producto === item.id_producto) && hayStock(item.id_producto) && validarStock(item.id_producto, item.cantidad)) {
            const nuevoCarrito = [...carrito, item];
            setCarrito(nuevoCarrito);
            MySwal.fire({
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                return;
            });
        } else {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "No hay stock suficiente para este producto.",
            }).then(() => {
                return;
            });
        }
    }

    const eliminarProducto = (id) => {
        setCarrito(carrito.filter(producto => producto.id_producto !== id));
    }

    const sumarCantidad = (id) => {
        if (!hayStock(id) || !validarStock(id, cantidadPorProducto(id) + 1)) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "No hay stock suficiente para este producto.",
            }).then(() => {
                return;
            });
        } else {
            setCarrito(carrito.map(producto => {
                if (producto.id_producto === id) {
                    return {...producto, cantidad: producto.cantidad + 1};
                } else {
                return producto;
                }
            }));
        }
    }

    const restarCantidad = (id) => {
        if (cantidadPorProducto(id) <= 1) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "La cantidad no puede ser menor a 1. Si desea eliminar el producto, utilice el botón de eliminar.",
            }).then(() => {
                return;
            });
        }
        setCarrito(carrito.map(producto => {
            if (producto.id_producto === id && producto.cantidad > 1) {
                return {...producto, cantidad: producto.cantidad - 1};
            } else {
              return producto;
            }
        }));
    }

    const calcularCantidadTotal = () => {
        return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    }

    const vaciarCarrito = () => {
        setCarrito([]);
    }

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarProducto, sumarCantidad, restarCantidad, setCarrito, calcularCantidadTotal, vaciarCarrito }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider