import Header from './Header';
import Nav from './Nav';
import Main from './Main';
import Footer from './Footer';
import './App.css';
import './elements.css';
import './components.css';

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <Nav />
      <Main />
      <Footer />
    </>
  );
}

export default App;
