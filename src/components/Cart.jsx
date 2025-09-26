import { useContext } from 'react'
import { CartContext } from './cartContext';
import Counter from './Counter';
import BtnDelete from './BtnDelete';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Cart() {
  const { carrito, sumarCantidad, restarCantidad, eliminarProducto } = useContext(CartContext);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleAdd = (id) => {
    sumarCantidad(id);
  }
  const handleSubtract = (id) => {
    restarCantidad(id);
  }
  const handleDelete = (id) => {
    eliminarProducto(id);
  }
  const handleEnd = () => {
    if(carrito.length === 0) {
      MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "El carrito está vacío. No se puede proceder al pago.",
      }).then(() => {
          return;
      });
    } else {
      navigate('/payment');
    }
  }

  return (
    <>
      {carrito ? (
        <div className='detalleCarrito'>
          <h2 className='title'>Carrito de Compras</h2>
          <div className='cardContainer'>
            {carrito.map((item, index) => (
              <div className="card" key={index}>
                <h3>{item.nombre}</h3>
                <img src={item.imagen_url} alt={item.nombre} />
                <p><span>Bodega:</span> {item.bodega}</p>
                <p><span>Categoría:</span> {item.categoria}</p>
                <p><span>Precio:</span> ${item.precio_unitario}</p>
                <p><span>Descripción:</span> {item.descripcion}</p>
                <Counter item={item} handleAdd={handleAdd} handleSubtract={handleSubtract} />
                <p><span>Subtotal:</span> ${item.precio_unitario * item.cantidad}</p>
                <BtnDelete id={item.id_producto} handleDelete={handleDelete} />
              </div>
            ))}
          </div>
          <h3>Total: ${carrito.reduce((total, item) => total + item.precio_unitario * item.cantidad, 0)}</h3>
          <button className="bgSuccess" onClick={()=>handleEnd()}>Finalizar compra</button>
        </div>
      ) : (
        <div>
          <h2>Carrito de Compras</h2>
          <p>El carrito está vacío.</p>
        </div>
      )}
  </>
  )
}

export default Cart