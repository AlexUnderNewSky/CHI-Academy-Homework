import axios from "axios";

export const fetchAllCharacters = async () => {
  const allCharacters = [];
  let page = 1;
  let totalPages = 0;

  do {
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    allCharacters.push(...response.data.results);
    totalPages = response.data.info.pages;
    page++;
  } while (page <= totalPages);

  return allCharacters;
};