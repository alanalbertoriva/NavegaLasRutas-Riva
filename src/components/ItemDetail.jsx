function ItemDetail({producto}) {
  return (
    <div>
      <h2 className="title">Detalle del producto</h2>
      <div className="cardContainer">
        {producto ? (
          <div className="card">
            <h3>{producto.nombre}</h3>
            <img src={producto.imagen_url} alt={producto.nombre} />
            <p><span>Bodega:</span> {producto.bodega}</p>
            <p><span>Categoría:</span> {producto.categoria}</p>
            <p><span>Precio:</span> ${producto.precio_unitario}</p>
            <p><span>Cantidad:</span> {producto.cantidad}</p>
            <p><span>Descripción:</span> {producto.descripcion}</p>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  )
}

export default ItemDetail