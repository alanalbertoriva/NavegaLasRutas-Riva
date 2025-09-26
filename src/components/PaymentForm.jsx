import {useContext} from 'react'
import { CartContext } from './cartContext';
import ProductContext from './productContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function PaymentForm() {
    const {carrito, vaciarCarrito} = useContext(CartContext);
    const {reducirCantidadProducto, productos, validarStock} = useContext(ProductContext);
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let stockInsuficiente = false;

        carrito.forEach(item => {
            if (!validarStock(item.id_producto, item.cantidad)) {
                stockInsuficiente = true;
            }   
        });
        if (stockInsuficiente) {
            MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "No hay stock suficiente para uno o más productos en el carrito.",
            }).then(() => {
                return;
            });
        } else {
            carrito.forEach(item => {
            reducirCantidadProducto(item.id_producto, item.cantidad);
            });

            MySwal.fire({
                icon: "success",
                title: "Compra realizada con éxito",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                vaciarCarrito();
                navigate('/');
            });                     
        }
    }

    return (
        <>
            {carrito.length === 0 ? (
                <div className='detalleCompra'>
                    <h2 className='title'>Detalle de la compra</h2>
                    <p>El carrito está vacío. No se puede proceder al pago.</p>
                </div>
            ) : (
                <div>
                    <div className='detalleCompra'>
                        <h2 className='title'>Detalle de la compra</h2>
                        {carrito.map((item, index) => (
                            <div key={index}>
                                <p>{item.nombre} - Cantidad: {item.cantidad} - Precio unitario: ${item.precio_unitario} - Subtotal: ${item.precio_unitario * item.cantidad}</p>
                            </div>
                        ))}
                        <h3>Total a pagar: ${carrito.reduce((total, item) => total + item.precio_unitario * item.cantidad, 0)}</h3>
                    </div>
                    <div>
                        <h2 className='title'>Formulario de Pago</h2>
                        <form>
                            <label htmlFor="nombre">Nombre Completo:</label>
                            <input type="text" id="nombre" name="nombre" required />
                            <label htmlFor="mail">Email:</label>
                            <input type="email" id="mail" name="mail" required />
                            <label htmlFor="tarjeta">Tarjeta:</label>
                            <input type="number" id="tarjeta" name="tarjeta" required />
                            <label htmlFor="codVerificacion">Cod. Verif:</label>
                            <input type="number" id="codVerificacion" name="codVerificacion" required />
                            <button onClick={(evt)=>handleSubmit(evt)} className='bgSuccess'>Confirmar compra</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default PaymentForm