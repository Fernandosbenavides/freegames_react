import { FaFacebookF, FaTwitter, FaInstagram, FaDiscord, FaEnvelope } from "react-icons/fa";
import GameList from "./GameList";;

const LandingPage = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#top">
              FreeToGames
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#top">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    Acerca de
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="title-container mt-4 mb-4 p-2">
        <img src="src\assets\img\tittleimg.png" alt="imagen de titulo 1" />
        <h1 className="mt-5 mb-4">Bienvenido a FreeToGames</h1>
        <img src="src\assets\img\tittleimg2.png" alt="imagen de titulo 2" />
      </div>
      <strong>Encuentra juegos gratuitos para PC y Navegador</strong>
      <div className="mt-4 mb-5"><GameList /></div>
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Acerca de FreeToGames</h2>
          <p className="text-justify">
            FreeToGames ofrece acceso gratuito a una amplia gama de juegos de alta calidad para todas las plataformas. Explora nuevos mundos y géneros sin costo alguno, uniéndote a una comunidad de jugadores apasionados por descubrir las últimas experiencias de juego sin tener que gastar.
          </p>
          <h3 className="text-center mb-3">Únete a nuestra comunidad</h3>
          <div className="text-center">
            <a href="www.facebook.com" className="me-4">
              <FaFacebookF size={24} />
            </a>
            <a href="www.twitter.com" className="me-4">
              <FaTwitter size={24} />
            </a>
            <a href="www.instagram.com" className="me-4">
              <FaInstagram size={24} />
            </a>
            <a href="www.discord.com">
              <FaDiscord size={24} />
            </a>
          </div>
        </div>
      </section>
      <footer className="footer mt-auto py-3">
        <div id="contact" className="text-center">
          <p><FaEnvelope size={24} /> <strong>Contáctanos:</strong> info@freetogames.com</p>
        </div>
        <div className="container text-center">
          <span>
            © 2024 Fernando Sepúlveda. Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
