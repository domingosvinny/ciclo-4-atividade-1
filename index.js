
const apiUrlPage1 = 'https://rickandmortyapi.com/api/character/?page=1';
const apiUrlPage2 = 'https://rickandmortyapi.com/api/character/?page=2';
const apiUrlPage3 = 'https://rickandmortyapi.com/api/character/?page=3';

let currentPage = 1;
let charactersLoaded = 0;
const charactersPerPage = 9;
let allCharacters = [];

document.getElementById('carregar-btn').addEventListener('click', loadMoreCharacters);

async function fetchCharacters(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao obter os personagens: ' + response.status);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error.message);
    return [];
  }
}

async function loadAllCharacters() {
  const characters1 = await fetchCharacters(apiUrlPage1);
  const characters2 = await fetchCharacters(apiUrlPage2);
  const characters3 = await fetchCharacters(apiUrlPage3);

  allCharacters = [...characters1, ...characters2, ...characters3];
  displayCharacters(allCharacters.slice(0, charactersPerPage));
}

function displayCharacters(characters) {
  const charactersList = document.getElementById('characters-list');
  charactersList.innerHTML = ''; // Limpa a lista de personagens antes de adicionar novos

  characters.forEach(character => {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character');

    const characterImage = document.createElement('img');
    characterImage.src = character.image;
    characterImage.alt = character.name;

    const characterDetails = document.createElement('div');
    characterDetails.classList.add('character-details');

    const characterName = document.createElement('h2');
    characterName.textContent = character.name;

    const characterStatus = document.createElement('p');
    characterStatus.textContent = `Status: ${character.status}`;

    const characterSpecies = document.createElement('p');
    characterSpecies.textContent = `Espécie: ${character.species}`;

    const characterGender = document.createElement('p');
    characterGender.textContent = `Gênero: ${character.gender}`;

    characterDetails.appendChild(characterName);
    characterDetails.appendChild(characterStatus);
    characterDetails.appendChild(characterSpecies);
    characterDetails.appendChild(characterGender);

    characterDiv.appendChild(characterImage);
    characterDiv.appendChild(characterDetails);

    charactersList.appendChild(characterDiv);
  });

  charactersLoaded += characters.length;

  if (charactersLoaded >= allCharacters.length) {
    // Se todos os personagens foram carregados, reinicia a contagem
    charactersLoaded = 0;
  }
}

async function loadMoreCharacters() {
  const startIndex = charactersLoaded;
  const endIndex = Math.min(charactersLoaded + charactersPerPage, allCharacters.length);
  const nextCharacters = allCharacters.slice(startIndex, endIndex);
  displayCharacters(nextCharacters);
}

// Inicia o carregamento de todos os personagens
loadAllCharacters();

