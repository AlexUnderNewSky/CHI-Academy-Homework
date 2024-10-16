"use strict";
const loadingText = document.querySelector(`.loading`);
const characterList = document.querySelector(`.characters-list`);
const characterShow = document.querySelector(`.character-show`);
// const btnPrevious = document.querySelector(`.btnPrevious`);
// const btnNext = document.querySelector(".btnNext");
const currentPageElement = document.querySelector(`.currentPage`);
const modal = document.getElementById("modal");
const modalCharacterInfo = document.getElementById("modalCharacterInfo");
const closeModal = document.getElementById("closeModal");

let currentPage = 1;
// btnPrevious.disabled = true;
let nextPageUrl = null;
let isFetching = false;

async function displayCharacters(pageUrl) {
  try {
    loadingText.style.display = `block`;
    isFetching = true;

    const response = await fetch(pageUrl);

    if (response.status !== 200) {
      alert("Error fetching data");
      return;
    }

    const parsedData = await response.json();
    loadingText.style.display = `none`;

    nextPageUrl = parsedData.info.next;

    console.log(parsedData.info.next);
    console.log(parsedData.info.prev);
    console.log(parsedData.info.pages);

    parsedData.results.forEach((item) => {
      console.log(item.name, item.status, item.image, item.id);
      characterList.innerHTML += `
        <div class="character-card" data-id="${item.id}" data-name="${item.name}" data-status="${item.status}" data-image="${item.image}">
      <img src="${item.image}" alt="${item.name} image">
      <div class="character-info">
        <h3>${item.name}</h3>
        <p>Status: ${item.status}</p>
      </div>
    </div>`;
    });

    characterList.addEventListener(`click`, (event) => {
      const card = event.target.closest(`.character-card`);
      if (card) {
        const characterId = card.dataset.id;
        const characterName = card.dataset.name;
        const characterStatus = card.dataset.status;
        const characterImage = card.dataset.image;
        console.log(`Clicked character ID: ${characterId}`);
        modalCharacterInfo.innerHTML = `
        <img src="${characterImage}" alt="${characterName} image">
      <h3>${characterName}</h3>
      <p>Status: ${characterStatus}</p>
    `;
        modal.style.display = "block";
      }
    });

    characterList.addEventListener(`scroll`, () => {
      if (
        characterList.scrollTop + characterList.clientHeight >=
          characterList.scrollHeight - 10 &&
        nextPageUrl &&
        !isFetching
      ) {
        console.log("Скроллбар на дне морском))))))");
        currentPage++;
        displayCharacters(nextPageUrl);
      }
    });

    currentPageElement.textContent = `Current loaded page: ${currentPage}`;
    console.log(parsedData);

    btnPrevious.disabled = currentPage === 1;
    btnNext.disabled = parsedData.info.next === null;
  } catch (error) {
    console.log(`Error:`, error);
  } finally {
    isFetching = false;
    loadingText.style.display = `none`;
    console.log(`Finally`);
  }
}
displayCharacters(
  `https://rickandmortyapi.com/api/character/?page=${currentPage}`
);

// btnNext.addEventListener(`click`, () => {
//   if (nextPageUrl) {
//     currentPage++;
//     displayCharacters(nextPageUrl);
//   }
// });
// btnPrevious.addEventListener(`click`, () => {
//   if (currentPage > 1) {
//     currentPage--;
//     displayCharacters(
//       `https://rickandmortyapi.com/api/character/?page=${currentPage}`
//     );
//   }
// });

closeModal.addEventListener(`click`, () => {
  modal.style.display = `none`;
});

window.addEventListener(`click`, (event) => {
  if (event.target === modal) {
    modal.style.display = `none`;
  }
});

// Просто знаю как это сделать :)
window.addEventListener(`keydown`, (event) => {
  if (event.key === `Escape` && modal.style.display === `block`) {
    modal.style.display = `none`;
  }
});
