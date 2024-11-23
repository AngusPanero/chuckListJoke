const boton = document.getElementById("fetchJoke");
const uList = document.getElementById("jokeList");
const url = "https://api.chucknorris.io/jokes/random"; 

//Traer Chiste
boton.addEventListener("click", () => {
    fetch(url)
        .then((response) => {
            if (!response.ok){
                throw new Error ("La Solicitud a Fallado")
            }
            return response.json()
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem("chisteAle", `${data.value}`)
            uList.innerHTML += `
            <div class="chiste">
            <li>
            ${localStorage.getItem("chisteAle")}
            </li>
            <button id="borrar">Borrar Chiste</button>
            </div>
            `
            console.log(localStorage)

        })
        .catch ((error) => {
            console.error("Error Inesperado", Error)
        })
})