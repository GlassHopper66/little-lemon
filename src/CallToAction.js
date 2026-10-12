import { Link } from 'react-router-dom';
import heroImage from './assets/hero.jpg';

function CallToAction() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-text">
        <h1 id="hero-title">Little Lemon</h1>
        <h2>Chicago</h2>
        <p className="lead">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Link to="/booking" className="btn">Reserve a Table</Link>
      </div>
      <img className="hero-img rounded" src={heroImage} alt="Chef holding a tray of bruschetta" width="300" height="350" />
    </section>
  );
}

export default CallToAction;
