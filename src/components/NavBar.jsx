import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext } from './cartContext';

function NavBar() {
  const {calcularCantidadTotal} = useContext(CartContext);

  return (
    <nav>
      <img src="/img/logo.jpg" alt="Logo de página" />
      <ul>
        <li><Link to={'/'}>INICIO</Link></li>
        <li><Link to={'/categoria/malbec'}>MALBEC</Link></li>
        <li><Link to={'/categoria/cabernetsuavignon'}>CABERNET SUAVIGNON</Link></li>
        <li><Link to={'/categoria/pinotnoir'}>PINOT NOIR</Link></li>
        <li><Link to={'/categoria/syrah'}>SYRAH</Link></li>
        <li><Link to={'/carrito'}><FontAwesomeIcon icon={faCartShopping} />({calcularCantidadTotal()})</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar