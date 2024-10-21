import React, { useEffect, useState, useCallback } from "react";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const displayCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const parsedData = await response.json();
        setCharacters(parsedData.results);
        setTotalPages(parsedData.info.pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    displayCharacters();
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>} {}
      <h1 class="title">Character List</h1>
      <div className="characters-list">
        {characters.map((item) => (
          <div className="character-card" key={item.id}>
            <img
              src={item.image}
              alt={`${item.name} image`}
              onError={(e) => {
                e.target.src =
                  "https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png";
              }}
            />
            <div className="character-info">
              <h3>{item.name}</h3>
              <p>Status: {item.status}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="btnPrevious"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="currentPage">Page {currentPage}</span>
        <button
          className="btnNext"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
