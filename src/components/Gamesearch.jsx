import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GameSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(6);
    const [maxPageButtons] = useState(5); // Número máximo de botones de página a mostrar

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
                    headers: {
                        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
                        'x-rapidapi-key': 'e45bafbc32msh1b0f3da8c7d9587p100dfejsncf436e6ea668',
                    }
                });
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchGames();
    }, []);

    useEffect(() => {
        setFilteredResults(
            searchResults.filter(game =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, searchResults]);

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = filteredResults.slice(indexOfFirstGame, indexOfLastGame);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
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

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        const totalPages = Math.ceil(filteredResults.length / gamesPerPage);
        setCurrentPage(totalPages);
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
                <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
                    <button className="page-link" onClick={() => paginate(i)}>{i}</button>
                </li>
            );
        }

        return buttons;
    };

    return (
        <div className="container">
            <h2>Buscar juegos gratuitos</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar juegos..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" disabled={loading}>
                        {loading ? 'Cargando...' : 'Buscar'}
                    </button>
                </div>
            </div>
            <div className="row">
                {currentGames.map((game) => (
                    <div className="col-md-4 mb-4" key={game.id}>
                        <div className="card h-100">
                            <img src={game.thumbnail} className="card-img-top" alt={game.title} />
                            <div className="card-body">
                                <h5 className="card-title">{game.title}</h5>
                                <p className="card-text">{game.short_description}</p>
                                <p className="card-text"><strong>Plataformas:</strong> {game.platform}</p>
                                <p className="card-text"><strong>Género:</strong> {game.genre}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={prevPage}>Anterior</button>
                    </li>
                    {renderPageButtons()}
                    <li className={`page-item ${currentPage === Math.ceil(filteredResults.length / gamesPerPage) ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={nextPage}>Siguiente</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default GameSearch;