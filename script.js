const listPokemon = [];
const limit = 1300;
const offset = 0;

// Função principal para buscar Pokémon
async function SearchPokemon() {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        const pokemons = data.results;

        // Busca detalhes de cada Pokémon
        const pokemonDetails = await Promise.all(
            pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()))
        );

        pokemonDetails.forEach(p => {
            const pokemon = new Pokemon();
            pokemon.name = p.name;
            pokemon.number = p.id;
            pokemon.img = p.sprites.other['official-artwork'].front_default;
            pokemon.type = p.types.map(t => t.type.name);
            listPokemon.push(pokemon);
        });

        // Exibe os primeiros Pokémon
        LoadPokemon();
    } catch (error) {
        console.error("Erro ao buscar os Pokémon:", error);
    }
}

let off = 0
// Função para exibir os Pokémon na tela
function LoadPokemon() {
    let limit = 8;
    const box = document.getElementById('container');
    // Limpa o container antes de carregar
    const toDisplay = listPokemon.slice(off, off + limit); // Carrega apenas um número limitado
    toDisplay.forEach(pokemon => CreateCard(pokemon));
    off += limit;
}

// Função para buscar Pokémon pelo nome
function SearchPokemonByName() {
    const input = document.getElementById('textbox').value.trim().toLowerCase();
    if (!input) return;

    const pokemon = listPokemon.find(p => p.name.toLowerCase() === input);
    const box = document.getElementById('container');
    box.innerHTML = ""; // Limpa o container

    if (pokemon) {
        CreateCard(pokemon);
    } else {
       alert(`<p>Pokémon "${input}" não encontrado.</p>`);
    }
}

// Função para criar um card de Pokémon
function CreateCard(pokemon) {
    const box = document.getElementById('container');
    box.innerHTML += `
        <div class="cardpokemon">
            <div class="card-upper">
                <span class="numberCard">${pokemon.number}</span>
                <div id="bola" class="${pokemon.type[0]}"></div>
                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
            <span class="titleCard">${pokemon.name}</span>
            <ul>
                <li class="${pokemon.type[0]}">${pokemon.type[0]}</li>
                ${pokemon.type[1] ? `<li class="${pokemon.type[1]}">${pokemon.type[1]}</li>` : ''}
            </ul>
        </div>
    `;
}

// Event Listener para o botão de busca
document.getElementById('btn').addEventListener('click', SearchPokemonByName);
// Event listener para o botao de carregar
document.getElementById('loadBtn').addEventListener('click', LoadPokemon);

// Inicializa a busca ao carregar a página
SearchPokemon();
