const API_Main = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";
const API_Fav = "https://api.thecatapi.com/v1/favourites?api_key=live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";

const spanError = document.getElementById("error");

async function loadRandomCats(){
    const response = await fetch(API_Main);
    const randomData = await response.json();
    console.log("Random")
    console.log(randomData)
    if(response.status !== 200) {
        spanError.innerHTML = "Ha ocurrido un error" + response.status;
    }
    else {
        const randomSection = document.querySelector("#random-cats");
        const fragment = new DocumentFragment();
        randomData.forEach(cat =>{
            const article = document.createElement("article");
            const img = document.createElement("img");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("Guardar en favoritos");
            img.src = cat.url;
            button.addEventListener("click", saveFavCat.bind("idCat", cat.id))
            button.appendChild(buttonText);
            article.appendChild(img);
            article.appendChild(button);

            fragment.appendChild(article)
        })
        randomSection.appendChild(fragment)
    }
    return randomData
}

async function loadFavoritesCats() {
    const response = await fetch(API_Fav);
    const dataFav = await response.json();
    console.log("fav")
    console.log(dataFav)
    if(response.status !== 200) {
        spanError.innerHTML = "Ha ocurrido un error: " + response.status + dataFav.message;
    }
    else {
        dataFav.forEach(cat => {
            const section = document.getElementById("fav-cats")
            const article = document.createElement("article");
            const img = document.createElement("img");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("Sacar de favoritos");

            button.appendChild(buttonText);
            button.classList.add("fav-button")
            img.src = cat.image.url;
            img.classList.add("fav-image")
            article.appendChild(img)
            article.appendChild(button);
            section.appendChild(article)
        })
    }
}

async function saveFavCat(id) {
    const response = await fetch(API_Fav, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const saveData = await response.json();
    console.log("Save");
    console.log(saveData); 
    if(response.status !== 200) {
        spanError.textContent = "Ha ocurrido un error:" + response.status + saveData.message;
    }
}

loadRandomCats()
loadFavoritesCats()
//cambiar para cualquier numero de gatos