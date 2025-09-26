function Counter({item, handleAdd, handleSubtract}) {
  return (
    <div>
        <button onClick={()=> handleAdd(item.id_producto)}>+</button>
        <span className="mxcounter">{item.cantidad}</span>
        <button onClick={()=>handleSubtract(item.id_producto)}>-</button>
    </div>
  )
}

export default Counter