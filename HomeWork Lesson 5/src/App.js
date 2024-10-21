import React, { useEffect, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const displayCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}`
        );

        if (response.status !== 200) {
          alert("Error fetching data");
          return;
        }

        const parsedData = await response.json();
        setCharacters(parsedData.results);
        setTotalPages(parsedData.info.pages);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    displayCharacters();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="loading" style={{ display: loading ? "block" : "none" }}>
        Loading...
      </div>
      <h1 class="title">Character List</h1>
      <div className="characters-list">
        {characters.map((item) => (
          <div className="character-card" key={item.id}>
            <img src={item.image} alt={`${item.name} image`} />
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
