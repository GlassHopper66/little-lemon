import logo from './assets/logo-footer.png';

function Footer() {
  return (
    <footer>
      <img src={logo} alt="Little Lemon" />
      <nav aria-label="Footer">
        <h2>Doormat Navigation</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/booking">Reservations</a></li>
          <li><a href="/order">Order online</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
      <address>
        <h2>Contact</h2>
        <p>Chicago, IL</p>
        <p><a href="tel:+13125550100">(312) 555-0100</a></p>
        <p><a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a></p>
      </address>
      <section aria-labelledby="social">
        <h2 id="social">Social Media Links</h2>
        <ul>
          <li><a href="https://facebook.com">Facebook</a></li>
          <li><a href="https://instagram.com">Instagram</a></li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
