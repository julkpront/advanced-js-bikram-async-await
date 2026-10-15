//DESARROLLA AQUI TUS SOLUCIONES

//Utilizando la api de Pokemon https://pokeapi.co/ y usando sólo async/await:

//Ejercicio 1.- Declara una función **getRandomPokemon** que retorne un pokemon aleatorio.

async function getRandomPokemon() {
    try{
    const id = Math.floor(Math.random() * 1025) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
    } catch (error) {console.log("ha ocurrido un problema: " + (error))}
}

getRandomPokemon().then(pokemon => console.log(pokemon.name));


//Ejercicio 2.- Declara una funcion **getImageAndName**
// que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})

async function getImageAndName (pokemon){
    try{

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let data = await response.json();
    let name = data.name;
    let img = data.sprites.front_default;
    return {name, img}
    } catch (error) {console.log("ha ocurrido un problema: " + error)}
    
}
getImageAndName("pikachu").then(res => console.log(res));


//Ejercicio 3.- Declara una funcion **printImageAndName** que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:

//html
// <section>
//     <img src="url de imagen" alt="nombre del pokemon">
//     <h1>Nombre del pokemon</h1>
// </section>


async function printImageAndName() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/145`);
        const data = await response.json();
        const name = data.name;
        const img = data.sprites.front_default;
        return `<section><img src="${img}" alt="${name}" /><h1>${name}</h1></section>`;
    } catch (error) {
        console.log("ha ocurrido un problema: " + error);
    }
}
    

//Batalla entre Pokemons y Perritos
//**Recordatorio, la API de perritos era 'https://dog.ceo/dog-api/'**

//Ejercicio 4.- Declara una función **getRandomDogImage** que retorne la url de la imagen de un perro aleatorio

async function getRandomDogImage() {
    try{

  return fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then((data) => data.message)
    .catch((error) => console.error("Error fetching data: ", error));
    }  catch (error) {
        console.log("ha ocurrido un problema: " + error);
    }
}


//Ejercicio 5.- Declara una función **getRandomPokemonImage** que retorne la url de la imagen de un pokemon aleatorio.


async function getRandomPokemonImage (pokemon){
    try{
    const id = Math.floor(Math.random() * 1025) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    let img = data.sprites.front_default;
    return img
    } catch (error) {console.log("ha ocurrido un problema: " + error)}
    
}

//Ejercicio 6.- Declara una función **printPugVsPikachu** que pinte la batalla entre "Pug" y "Pikachu" (no se testea)

async function printPugVsPikachu() {
    try {
        const [pug, pikachu] = await Promise.all([
            fetch("https://dog.ceo/api/breed/pug/images/random").then(res => res.json()),
            fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(res => res.json())
        ]);

        return {
            pug: { name: "Pug", img: pug.message },
            pikachu: { name: pikachu.name, img: pikachu.sprites.front_default }
        };
    } catch (error) {
        console.log("ha ocurrido un problema: " + error);
    }
}

// ### Ejercicios con Rick and Morty ###

// Usando la api de Rick and Morty https://rickandmortyapi.com/ y sólo async/await:

// Ejercicio 7.- Declara una función **getRandomCharacter** que retorne un personaje aleatorio.

async function getRandomCharacter() {
    try {
        const id = Math.floor(Math.random() * 825) + 1;
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const character = await response.json();
        return character;
    } catch (error) {
        console.log("ha ocurrido un problema: " + error);
    }
}
getRandomCharacter().then(personaje => console.log(personaje.name));

//Ejercicio 8.- Declara una función **getRandomCharacterInfo** que retorne
// de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece
// + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos.
// Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})

async function getRandomCharacterInfo() {
    try {
        const character = await getRandomCharacter();

        const responseEpisode = await fetch(character.episode[0]);
        const episode = await responseEpisode.json();

        return {
            img: character.image,
            name: character.name,
            episodes: character.episode,
            firstEpisode: episode.name,
            dateEpisode: episode.air_date
        };
    } catch (error) {
        console.log("ha ocurrido un problema: " + error);
    }
}
getRandomCharacterInfo().then(info => console.log(info));

//Ejercicio 9.- Pinta los anteriores datos en el DOM (no se testea)


function pintarHTML(titulo, html) {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${titulo}</h3>${html}`;
    document.body.appendChild(div);
}

async function pintarTodo() {
    try {
        const p1 = await getRandomPokemon();
        pintarHTML("Ejercicio 1", `<img src="${p1.sprites.front_default}" alt="${p1.name}" width="150"><p>${p1.name}</p>`);

        const p2 = await getImageAndName("pikachu");
        pintarHTML("Ejercicio 2", `<img src="${p2.img}" alt="${p2.name}" width="150"><p>${p2.name}</p>`);

        pintarHTML("Ejercicio 3", await printImageAndName());

        const perro = await getRandomDogImage();
        pintarHTML("Ejercicio 4", `<img src="${perro}" alt="Perro aleatorio" width="200">`);

        const pokeImg = await getRandomPokemonImage();
        pintarHTML("Ejercicio 5", `<img src="${pokeImg}" alt="Pokemon aleatorio" width="150">`);

        const { pug, pikachu } = await printPugVsPikachu();
        pintarHTML("Ejercicio 6", `
            <img src="${pug.img}" alt="${pug.name}" width="200">
            <b>VS</b>
            <img src="${pikachu.img}" alt="${pikachu.name}" width="200">`);

        const personaje = await getRandomCharacter();
        pintarHTML("Ejercicio 7", `<img src="${personaje.image}" alt="${personaje.name}" width="150"><p>${personaje.name}</p>`);

        const info = await getRandomCharacterInfo();
        pintarHTML("Ejercicios 8 y 9", `
            <img src="${info.img}" alt="${info.name}" width="200">
            <h2>${info.name}</h2>
            <p>Episodios en los que aparece: ${info.episodes.map(url => url.split("/").pop()).join(", ")}</p>
            <p>Primer episodio: ${info.firstEpisode}</p>
            <p>Fecha de estreno: ${info.dateEpisode}</p>`);
    } catch (error) {
        console.log("ha ocurrido un problema: " + error);
    }
}

document.addEventListener("DOMContentLoaded", pintarTodo);