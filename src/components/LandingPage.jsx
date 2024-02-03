import { FaFacebookF, FaTwitter, FaInstagram, FaDiscord, FaEnvelope } from "react-icons/fa";
import GameSearch from "./Gamesearch";

const LandingPage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#" onClick={scrollToTop}>
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
                  <a className="nav-link" href="#" onClick={scrollToTop}>
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => scrollToSection("about")}>
                    Acerca de
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => scrollToSection("contact")}>
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <h1 className="mt-5 mb-4">Bienvenido a FreeToGames</h1>
        <p>Encuentra juegos gratuitos para PC y Navegador</p>
        {/* Agrega el componente GameSearch */}
        <GameSearch />
      </div>

      <section id="about" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Acerca de FreeToGames</h2>
          <p className="text-justify">
            En FreeToGames, creemos en proporcionar acceso a juegos gratuitos
            de alta calidad para todas las plataformas. Nuestra plataforma es
            un destino para los entusiastas del juego que buscan descubrir y
            jugar los últimos juegos sin costo alguno. Ya sea que te gusten los
            MMORPG, los shooters, los juegos de estrategia o cualquier otro
            género, estamos aquí para ayudarte a encontrar los mejores juegos
            gratuitos disponibles.
          </p>
          <p className="text-justify">
            Con una amplia selección de juegos de todas las categorías y
            géneros, puedes explorar nuevas experiencias de juego y sumergirte
            en mundos emocionantes sin tener que gastar un centavo. Únete a
            nuestra comunidad de jugadores y descubre qué tiene el mundo de los
            juegos gratuitos para ofrecerte.
          </p>
          <h3 className="text-center mb-3">Únete a nuestra comunidad</h3>
          <div className="text-center">
            <a href="#" className="me-4">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="me-4">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="me-4">
              <FaInstagram size={24} />
            </a>
            <a href="#">
              <FaDiscord size={24} />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer mt-auto py-3 bg-light">
        <div id="contact" className="text-center">
          <p><FaEnvelope size={24} /> <strong>Contáctanos:</strong> info@freetogames.com</p>
        </div>
        <div className="container text-center">
          <span className="text-muted">
            © 2024 FreeToGames. Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
