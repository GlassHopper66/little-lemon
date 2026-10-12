import { Link } from 'react-router-dom';

function ComingSoon({ title }) {
  return (
    <section aria-labelledby="coming-soon-title">
      <h1 id="coming-soon-title">{title}</h1>
      <p>This page is coming soon.</p>
      <p><Link to="/">Back to the homepage</Link></p>
    </section>
  );
}

export default ComingSoon;
