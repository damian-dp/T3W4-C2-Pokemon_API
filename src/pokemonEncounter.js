let pokemonRenderArea = document.getElementById("pokemonEncounterArea");

function renderPokemonData(pokemonData) {
	if (!pokemonData.name) {
        return;
    }

    let pokemonContainerDiv = document.createElement("div");
    pokemonContainerDiv.classList += "pokemonCardEntry";

    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.image;
    pokemonContainerDiv.appendChild(pokemonImage);

    let pokemonHeading = document.createElement("h1");
    pokemonHeading.innerText = pokemonData.name;
    pokemonContainerDiv.appendChild(pokemonHeading);


    let pokemonTypesHeading = document.createElement("h3");
	pokemonTypesHeading.innerText = "Types:";
	pokemonContainerDiv.appendChild(pokemonTypesHeading);

    let pokemonTypeList = document.createElement("ul");
    pokemonData.types.forEach((type) => {
        let typeListItem = document.createElement("li");
        typeListItem.innerText = type.type.name;
        pokemonTypeList.appendChild(typeListItem);
    });
    pokemonContainerDiv.appendChild(pokemonTypeList);

    let pokemonAudioButton = document.createElement("button");
    pokemonAudioButton.innerText = "Play Cry";
    pokemonAudioButton.addEventListener("click", () => {
        let audio = new Audio(pokemonData.sound);
        audio.play();
    });
    pokemonContainerDiv.appendChild(pokemonAudioButton);

    pokemonRenderArea.appendChild(pokemonContainerDiv);
}

async function getPokemon() {
	console.log("Fetching Pokemon");

	// Generate a random number between 1 and 1024 (1025 being the total number of Pokemon in the API)
	let suitableNumber = Math.floor(Math.random() * 1025) + 1;

	// Fetch the Pokemon data from the API using the generated number to get a random Pokemon
	let apiResponse = await fetch(
		"https://pokeapi.co/api/v2/pokemon/" + suitableNumber
	);

	let apiData = await apiResponse.json();

	// console.log(apiData);
	// Name, Types, Image, Sound
	// let pokemonName = apiData.name;
	// return pokemonName;

	return {
		name: apiData.name,
		types: apiData.types,
		image: apiData.sprites.other.home.front_default,
		sound: apiData.cries.latest,
	};
}

let encounterButton = document.getElementById("pokemonEncounterButton");

encounterButton.addEventListener("click", async (event) => {
	console.log("Encounter button clicked!");

	let pokemonResult = await getPokemon();

	console.log(pokemonResult);

	renderPokemonData(pokemonResult);
});
