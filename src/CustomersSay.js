import maria from './assets/customer-maria.jpg';
import sam from './assets/customer-sam.jpg';
import priya from './assets/customer-priya.jpg';
import tom from './assets/customer-tom.jpg';

const reviews = [
  { id: 1, name: 'Maria', rating: 5, photo: maria, text: 'Best Greek salad in Chicago.' },
  { id: 2, name: 'Sam', rating: 4, photo: sam, text: 'Friendly staff and a lovely terrace.' },
  { id: 3, name: 'Priya', rating: 5, photo: priya, text: 'Booking a table took one minute.' },
  { id: 4, name: 'Tom', rating: 4, photo: tom, text: 'The lemon dessert is a must.' },
];

function CustomersSay() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">Testimonials</h2>
      <ul className="testimonial-list">
        {reviews.map(r => (
          <li key={r.id} className="testimonial">
            <p className="rating" aria-label={`Rating: ${r.rating} out of 5`}>
              {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
            </p>
            <img src={r.photo} alt="" width="64" height="64" />
            <p className="customer-name">{r.name}</p>
            <blockquote><p>{r.text}</p></blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CustomersSay;
