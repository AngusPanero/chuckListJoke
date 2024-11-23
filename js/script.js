const boton = document.getElementById("fetchJoke");
const uList = document.getElementById("jokeList");
const url = "https://api.chucknorris.io/jokes/random"; 

// Cargar lo creado en DOM y LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    const arrayChistes = JSON.parse(localStorage.getItem("chisteAle")) || [];
    arrayChistes.forEach((chiste) =>{
        uList.innerHTML += `
        <div class="chiste">
            <li>${chiste}</li>
            <button class="borrar">Borrar Chiste</button>
        </div>
        `;
    })
})

// Traer Chiste
boton.addEventListener("click", () => {
    fetch(url)
        .then((response) => {
            if (!response.ok){
                throw new Error ("La Solicitud a Fallado")
            }
            return response.json()
        })
        .then((data) => {
            
            // Mi local Storage con chistes 
            let arrayChistes = JSON.parse(localStorage.getItem("chisteAle")) || [];// Con Parse Recupero de mi Array
            arrayChistes.push(data.value); // Los Agrego a mi Array 
            localStorage.setItem("chisteAle", JSON.stringify(arrayChistes)); // Los Grabo en el Local

            uList.innerHTML += `
            <div class="chiste">
            <li>${data.value}</li>
            <button id="borrar">Borrar Chiste</button>
            </div>
            `
            console.log(localStorage)

        })
        .catch ((error) => {
            console.error("Error Inesperado", Error)
        })
})

console.log(localStorage);

// Cargar lo creado en DOM y LocalStorage
uList.addEventListener("click", (event) => { // le doy parametro event para abajo capturarlo con el target
    if (event.target.classList.contains("borrar")) {// target especifica que afectara unicamente al elemento que yo seleccione con clase "borrar" no a todos
        const divPadre = event.target.parentElement // Obtengo el contenedor
        const borrarChiste = divPadre.querySelector("li").textContent; // Obtengo el li del contenedor 
        
        let arrayChistes = JSON.parse(localStorage.getItem("chisteAle")) || [];
        arrayChistes = arrayChistes.filter((chiste) => chiste !== borrarChiste);
        localStorage.setItem("chisteAle", JSON.stringify(arrayChistes));
    divPadre.remove();
    }
    })