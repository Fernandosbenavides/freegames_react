import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const MyApi = ({ setSearchResults, setError }) => {
  const [loading, setLoading] = useState(false);

  const fetchGames = useCallback(async () => {
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
  }, [setSearchResults, setError]);

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      )}
    </div>
  );
};

export default MyApi;
