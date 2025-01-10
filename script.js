const url = "https://pokeapi.co/api/v2/pokemon?limit=20";

async function SearchPokemon() {
    const response = await fetch(url);
    const data = await response.json();
    const pokemons = data.results;

   const pokemonD = await Promise.all(pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json())))

    pokemonD.forEach(p => 
        CreateCard(p)
    );;
}

function CreateCard(pokemon){

    //Declaração
    const pokemonName = pokemon.name;
    const pokemonTipo = pokemon.types[0].type.name;
    const pokemonImg = pokemon.sprites.other['official-artwork'].front_default;

    //Construção do Card
    const box = document.getElementById('container'); 

    box.innerHTML += `
        <div class="cardpokemon">
            <div>
                <div id="bola" class="${pokemonTipo}"></div>
                <img src="${pokemonImg}"></img>
            </div>
            <span class="titleCard">${pokemonName}</span>
                <ul>
                    <li class="${pokemonTipo}">${pokemonTipo}</li>
                </ul>    
        </div>
    `;

    //tests
    console.log(`Nome do pokemon:${pokemon.name} | tipo do pokemon: ${pokemon.types[0].type.name}`);
};

function DefineCor(t){
    
    
}

SearchPokemon();
