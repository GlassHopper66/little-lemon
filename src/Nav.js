import { NavLink } from 'react-router-dom';
import navLinks from './navLinks';

function Nav() {
  return (
    <nav aria-label="Main">
      <ul className="nav-list">
        {navLinks.map(link => (
          <li key={link.to}>
            <NavLink to={link.to} end={link.to === '/'}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
