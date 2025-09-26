function BtnDelete({id, handleDelete}) {
  return (
    <button onClick={()=>handleDelete(id)} className="bgDanger">Eliminar</button>
  )
}

export default BtnDelete