function Nav() {
  return (
    <nav aria-label="Main">
      <ul className="nav-list">
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/booking">Reservations</a></li>
        <li><a href="/order">Order online</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
