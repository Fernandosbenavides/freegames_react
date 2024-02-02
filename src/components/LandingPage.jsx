import React from 'react';
import GameSearch from './Gamesearch'; // Importa el componente GameSearch

const LandingPage = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">FreeToGames</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Inicio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Acerca de</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <h1 className="mt-5 mb-4">Bienvenido a FreeToGames</h1>
        <p>Encuentra juegos gratuitos para todas las plataformas</p>
        {/* Agrega el componente GameSearch */}
        <GameSearch />
      </div>

      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">© 2024 FreeToGames. Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
