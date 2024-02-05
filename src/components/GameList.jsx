import { useState, useEffect } from "react";
import GameCards from "./GameCards";
import MyApi from "./MyApi";

const GameList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(6);
  const [maxPageButtons] = useState(5);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterByGenre, setFilterByGenre] = useState("");

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
    setCurrentPage(1);
  }, [searchTerm, searchResults, sortBy, filterByGenre]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredResults.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filteredResults.length / gamesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
            <option value="Card Game">Card Game</option>
            <option value="Racing">Racing</option>
            <option value="Fighting">Fighting</option>
            <option value="Social">Social</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
      </div>
      <MyApi setSearchResults={setSearchResults} setError={setError} />
      {error && <div className="alert alert-danger">{error}</div>}
      <GameCards games={currentGames} />
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={prevPage}>
              Anterior
            </button>
          </li>
          {renderPageButtons()}
          <li
            className={`page-item ${currentPage === Math.ceil(filteredResults.length / gamesPerPage)
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

export default GameList;
