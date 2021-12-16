//CREO EL EVENTO PARA QUE CUANDO CARGUE LA PAGINA POR COMPLETO, COMIENZE A BUSCAR
//LOS DATO DE LA API
document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})


// BUSCA LOS DATOS DE LA API,LOS RENDERIZA Y LLAMA A LA FUNCION "pintarCard()"
// PARA QUE CON LOS DATOS OBTENIDOS DE LA API, EMPIEZE EL DIBUJADO DE LAS CARTAS
const fetchData = async (url = "https://rickandmortyapi.com/api/character") => {
    try {
        loadingData(true)

        const res = await fetch(url);
        const data = await res.json();
        pintarCard(data)
     
    } catch (error) {
        
        console.log(error)
    } finally{
        loadingData(false)
        
    }
} 


// ESTA FUNCION CAPTURA EL DOM Y CREA LOS DIFERENTES PERSONAJES CON SUS DATOS
const pintarCard = (data) => {

    const cards = document.getElementById("card-dinamicas");
    cards.textContent = "";
    const templateCard = document.getElementById("template-card").content;
    const fragment = document.createDocumentFragment();


    data.results.forEach( item => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h5").textContent = item.name;
        clone.querySelector("img").setAttribute("src",`${item.image}`)
        clone.querySelector("p").textContent = item.species

        //GUARDAMOS EN EL FRAGMENT PARA EVITAR REFLOW
        fragment.appendChild(clone)
        
    });
    cards.appendChild(fragment)
    
}


// CREA Y DESAPARECE EL LOGO DE "LOADING"
const loadingData = (estado) => {
    const loading = document.getElementById("loading")
    if(estado){
        loading.classList.remove("d-none")
    }else{
        loading.classList.add("d-none")
    }

}

