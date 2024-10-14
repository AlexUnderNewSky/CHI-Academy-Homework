"use strict";
const loadingText = document.querySelector(`.loading`);
const characterList = document.querySelector(`.characters-list`);
const btnPrevious = document.querySelector(`.btnPrevious`);
const btnNext = document.querySelector(".btnNext");
const currentPageElement = document.querySelector(`.currentPage`);

let currentPage = 1;
btnPrevious.disabled = true;

async function displayCharacters(currentPage) {
  try {
    loadingText.style.display = `block`;
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${currentPage}`
    );

    if (response.status !== 200) {
      alert("Error fetching data");
      return;
    }

    const parsedData = await response.json();
    loadingText.style.display = `none`;
    console.log(parsedData.info.next); // Ссылка на следующую страницу
    console.log(parsedData.info.prev); // Ссылка на предыдущую страницу (может быть null)
    console.log(parsedData.info.pages); // Общее количество страниц

    characterList.innerHTML = ``;

    parsedData.results.forEach((item) => {
      console.log(item.name, item.status, item.image); // Имя, статус и изображение персонажа
      characterList.innerHTML += `
    <div class="character-card">
      <img src="${item.image}" alt="${item.name} image">
      <div class="character-info">
        <h3>${item.name}</h3>
        <p>Status: ${item.status}</p>
      </div>
    </div>`;
    });

    currentPageElement.textContent = `Page ${currentPage}`;
    console.log(parsedData);

    btnPrevious.disabled = currentPage === 1;
    btnNext.disabled = parsedData.info.next === null;
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Finally");
  }
}
displayCharacters(currentPage);

btnNext.addEventListener(`click`, () => {
  currentPage++;
  displayCharacters(currentPage);
});
btnPrevious.addEventListener(`click`, () => {
  if (currentPage > 1) {
    currentPage--;
    displayCharacters(currentPage);
  }
});
