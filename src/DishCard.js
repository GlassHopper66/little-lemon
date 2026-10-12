import { Link } from 'react-router-dom';

function DishCard({ name, price, description, image }) {
  return (
    <article className="card">
      <img src={image} alt={name} width="300" height="200" />
      <div className="card-body">
        <div className="card-title">
          <h3>{name}</h3>
          <p className="price">{price}</p>
        </div>
        <p>{description}</p>
        <Link to="/order" className="card-link">Order a delivery</Link>
      </div>
    </article>
  );
}

export default DishCard;
