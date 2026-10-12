import chefsA from './assets/chefs-a.jpg';
import chefsB from './assets/chefs-b.jpg';

function Chicago() {
  return (
    <section className="about" id="about" aria-label="About Little Lemon">
      <div className="about-text">
        <h2>Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved
          to the United States to pursue their shared dream of owning a restaurant.
        </p>
      </div>
      <div className="about-images">
        <img className="rounded" src={chefsA} alt="Mario and Adrian in the kitchen" width="250" height="300" />
        <img className="rounded" src={chefsB} alt="Adrian preparing a dish" width="250" height="300" />
      </div>
    </section>
  );
}

export default Chicago;
