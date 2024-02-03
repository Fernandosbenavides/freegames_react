import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaGamepad,
  FaShieldAlt,
  FaChess,
  FaSpaceShuttle,
  FaUserPlus,
} from "react-icons/fa";
import {
  GiAura,
  GiCrossedSwords,
  GiPistolGun,
  GiFairyWand,
  GiCardRandom,
  GiBoxingGlove,
  GiSoccerBall,
} from "react-icons/gi";
import { AiOutlineAim } from "react-icons/ai";
import { IoCarSport } from "react-icons/io5";

const GameSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(6);
  const [maxPageButtons] = useState(5);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterByGenre, setFilterByGenre] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://free-to-play-games-database.p.rapidapi.com/api/games`,
          {
            headers: {
              "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
              "x-rapidapi-key":
                "e45bafbc32msh1b0f3da8c7d9587p100dfejsncf436e6ea668",
            },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Hubo un error al cargar los juegos. Por favor, inténtalo de nuevo más tarde."
        );
      }
      setLoading(false);
    };

    fetchGames();
  }, []);

  useEffect(() => {
    let sortedResults = [...searchResults];

    if (sortBy === "titleAsc") {
      sortedResults.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "titleDesc") {
      sortedResults.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (filterByGenre) {
      sortedResults = sortedResults.filter(
        (game) => game.genre.toLowerCase() === filterByGenre.toLowerCase()
      );
    }

    const filtered = sortedResults.filter(
      (game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.short_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredResults(filtered);
    setCurrentPage(1); // Resetear la página actual a 1 al realizar una búsqueda
  }, [searchTerm, searchResults, sortBy, filterByGenre]);
  const genreIcons = {
    MMORPG: <GiCrossedSwords />,
    ARPG: <GiCrossedSwords />,
    MMOARPG: <GiCrossedSwords />,
    Shooter: <AiOutlineAim />,
    MOBA: <FaShieldAlt />,
    Anime: <GiAura />,
    "Battle Royale": <GiPistolGun />,
    Strategy: <FaChess />,
    Fantasy: <GiFairyWand />,
    "Sci-Fi": <FaSpaceShuttle />,
    "Card Games": <GiCardRandom />,
    Racing: <IoCarSport />,
    Fighting: <GiBoxingGlove />,
    Social: <FaUserPlus />,
    Sports: <GiSoccerBall />,
  };
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredResults.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filteredResults.length / gamesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderPageButtons = () => {
    const totalPages = Math.ceil(filteredResults.length / gamesPerPage);
    const buttons = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPageButtons) {
      startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
      endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li
          className={`page-item ${i === currentPage ? "active" : ""}`}
          key={i}
        >
          <button className="page-link" onClick={() => paginate(i)}>
            {i}
          </button>
        </li>
      );
    }

    return buttons;
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-4">
          <strong>Buscar:</strong>
          <input
            type="text"
            className="form-control color"
            placeholder="Escribe Nombre, Categoría o Plataforma...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <strong>Ordenar por título:</strong>
          <select
            className="form-control custom-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Selecciona</option>
            <option value="titleAsc">A-Z</option>
            <option value="titleDesc">Z-A</option>
          </select>
        </div>
        <div className="col-md-4">
          <strong>Ordenar por género:</strong>
          <select
            className="form-control custom-select"
            value={filterByGenre}
            onChange={(e) => setFilterByGenre(e.target.value)}
          >
            <option value="">Selecciona</option>
            <option value="MMORPG">MMORPG</option>
            <option value="MMOARPG">MMOARPG</option>
            <option value="Shooter">Shooter</option>
            <option value="MOBA">MOBA</option>
            <option value="Anime">Anime</option>
            <option value="Battle Royale">Battle Royale</option>
            <option value="Strategy">Strategy</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Card Games">Card Games</option>
            <option value="Racing">Racing</option>
            <option value="Fighting">Fighting</option>
            <option value="Social">Social</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      )}
      {filteredResults.length === 0 && !loading && searchTerm !== "" && (
        <p>No se encontraron resultados</p>
      )}
      <div className="row">
        {currentGames.map((game) => (
          <div className="col-md-4 mb-4" key={game.id}>
            <div className="card h-100">
              <img
                src={game.thumbnail}
                className="card-img-top"
                alt={game.title}
              />
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">{game.short_description}</p>
                <p className="card-text">
                  <strong>
                    <FaGamepad /> <span></span>Plataformas:
                  </strong>{" "}
                  {game.platform}
                </p>
                <p className="card-text">
                  <strong>
                    {" "}
                    {genreIcons[game.genre]} <span></span> Género:
                  </strong>{" "}
                  {game.genre}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={prevPage}>
              Anterior
            </button>
          </li>
          {renderPageButtons()}
          <li
            className={`page-item ${
              currentPage === Math.ceil(filteredResults.length / gamesPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button className="page-link" onClick={nextPage}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GameSearch;
