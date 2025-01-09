const url = "https://pokeapi.co/api/v2/pokemon";

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
    const pokemonImg = pokemon.sprites.front_default;

    //Construção do Card
    const div = document.createElement('div');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    const box = document.getElementById('container'); 

    li.textContent = `${pokemonTipo}`
    

    div.className = 'cardpokemon';
    
    img.src = pokemonImg;
    span.textContent = `${pokemonName}`

    ul.appendChild(li);
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(ul);

    box.appendChild(div);

    //tests
    console.log(`Nome do pokemon:${pokemon.name} | tipo do pokemon: ${pokemon.types[0].type.name}`);
};

SearchPokemon();
