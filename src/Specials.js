import { Link } from 'react-router-dom';
import DishCard from './DishCard';
import specials from './specialsData';

function Specials() {
  return (
    <section className="specials" aria-labelledby="specials-title">
      <div className="section-head">
        <h2 id="specials-title">This week's specials!</h2>
        <Link to="/menu" className="btn">Online Menu</Link>
      </div>
      <div className="cards">
        {specials.map(dish => (
          <DishCard key={dish.id} {...dish} />
        ))}
      </div>
    </section>
  );
}

export default Specials;
