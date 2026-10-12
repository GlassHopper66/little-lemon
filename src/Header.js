import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Little Lemon – home" width="200" height="54" />
      </Link>
    </header>
  );
}

export default Header;
