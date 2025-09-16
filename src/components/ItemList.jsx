import { Link } from "react-router-dom";
function ItemList({productos}) {
  return (
    <div>
      <h2 className="title">Lista de productos</h2>
      <div className="cardContainer">
        {productos.map((producto) => (
          <div key={producto.id_producto} className="card">
            <h3>{producto.nombre}</h3>
            <img src={producto.imagen_url} alt={producto.nombre} />
            <p><span>Bodega:</span> {producto.bodega}</p>
            <p><span>Categoría:</span> {producto.categoria}</p>
            <p><span>Precio:</span> ${producto.precio_unitario}</p>
            <button><Link to={`/detalle/${producto.id_producto}`} state={producto}>Ver detalle</Link></button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList