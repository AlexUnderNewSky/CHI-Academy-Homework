"use strict";
const loadingText = document.querySelector(`.loading`);
const characterList = document.querySelector(`.characters-list`);
const characterShow = document.querySelector(`.character-show`);
const currentPageElement = document.querySelector(`.currentPage`);
const modal = document.getElementById("modal");
const modalCharacterInfo = document.getElementById("modalCharacterInfo");
const closeModal = document.getElementById("closeModal");

let currentPage = 1;
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

    parsedData.results.forEach((item) => {
      characterList.innerHTML += `
        <div class="character-card" data-id="${item.id}" data-name="${item.name}" data-status="${item.status}" data-image="${item.image}">
          <img src="${item.image}" alt="${item.name} image">
          <div class="character-info">
            <h3>${item.name}</h3>
            <p>Status: ${item.status}</p>
          </div>
        </div>`;
    });
    currentPageElement.textContent = `Current loaded page: ${currentPage}`;
  } catch (error) {
    console.log(`Error:`, error);
  } finally {
    isFetching = false;
    loadingText.style.display = `none`;
  }
}

displayCharacters(
  `https://rickandmortyapi.com/api/character/?page=${currentPage}`
);

function openModal() {
  window.addEventListener("keydown", handleEscapeKey);
  modal.style.display = "block";
}

function closeModalWindow() {
  modal.style.display = "none";
  window.removeEventListener("keydown", handleEscapeKey);
}

characterList.addEventListener("click", (event) => {
  const card = event.target.closest(".character-card");
  if (card) {
    const characterId = card.dataset.id;
    const characterName = card.dataset.name;
    const characterStatus = card.dataset.status;
    const characterImage = card.dataset.image;

    modalCharacterInfo.innerHTML = `
      <img src="${characterImage}" alt="${characterName} image">
      <br>
      <h3>${characterName}</h3>
      <p>Status: ${characterStatus}</p>
      <p>ID: ${characterId}</p>`;

    openModal();
  }
});

characterList.addEventListener("scroll", () => {
  if (
    characterList.scrollTop + characterList.clientHeight >=
      characterList.scrollHeight - 10 &&
    nextPageUrl &&
    !isFetching
  ) {
    currentPage++;
    displayCharacters(nextPageUrl);
  }
});

closeModal.addEventListener("click", closeModalWindow);

function handleEscapeKey(addKey) {
  if (addKey.key === "Escape") {
    closeModalWindow();
  }
}

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModalWindow();
  }
});
