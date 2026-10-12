import { Link } from 'react-router-dom';
import navLinks from './navLinks';
import logo from './assets/logo-footer.png';

function Footer() {
  return (
    <footer>
      <div className="grid">
        <img className="md-half lg-quarter" src={logo} alt="Little Lemon" width="120" height="174" />
        <nav className="md-half lg-quarter" aria-label="Footer">
          <h2>Doormat Navigation</h2>
          <ul>
            {navLinks.map(link => (
              <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
            ))}
          </ul>
        </nav>
        <address className="md-half lg-quarter">
          <h2>Contact</h2>
          <p>Chicago, IL</p>
          <p><a href="tel:+13125550100">(312) 555-0100</a></p>
          <p><a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a></p>
        </address>
        <section className="md-half lg-quarter" aria-labelledby="social">
          <h2 id="social">Social Media Links</h2>
          <ul>
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://instagram.com">Instagram</a></li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
