import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <img src="/img/logo.jpg" alt="Logo de página" />
      <ul>
        <li><Link to={'/'}>Inicio</Link></li>
        <li><Link to={'/categoria/malbec'}>Malbec</Link></li>
        <li><Link to={'/categoria/cabernetsuavignon'}>Cabernet Suavignon</Link></li>
        <li><Link to={'/categoria/pinotnoir'}>Pinot Noir</Link></li>
        <li><Link to={'/categoria/syrah'}>Syrah</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar