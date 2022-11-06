const api = axios.create({
    baseURL: "https://api.thecatapi.com/v1/"
});
api.defaults.headers.common["X-API-KEY"] = "live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";

const API_Main = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_Fav = "https://api.thecatapi.com/v1/favourites";
const API_Delete = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_upload = "https://api.thecatapi.com/v1/images/upload"

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
    const response = await fetch(API_Fav, {
        method: "GET",
        headers: {
            "X-API-KEY" : "live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk"
        }
    });
    const dataFav = await response.json();
    console.log("fav")
    console.log(dataFav)
    if(response.status !== 200) {
        spanError.innerHTML = "Ha ocurrido un error: " + response.status + dataFav.message;
    }
    else {
        const section = document.getElementById("fav-cats")
        section.innerHTML = "";
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Favorite Cats");
        h2.appendChild(h2Text);
        section.appendChild(h2);
        dataFav.forEach(cat => {
            const article = document.createElement("article");
            const img = document.createElement("img");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("Sacar de favoritos");

            button.appendChild(buttonText);
            button.classList.add("fav-button");
            button.onclick = () => deleteFavCat(cat.id)
            img.src = cat.image.url;
            img.classList.add("fav-image")
            article.appendChild(img)
            article.appendChild(button);
            section.appendChild(article)
        })
    }
}

async function saveFavCat(id) {
    const { data, status } = await api.post("/favourites", {
        image_id: id
    });

    if(status !== 200) {
        spanError.textContent = "Ha ocurrido un error:" + status + data.message;
    }
    else {
        console.log("Cat added to favorites")
        loadFavoritesCats()
    }
}

async function deleteFavCat(id) {
    const response = await fetch(API_Delete(id), {
        method: "DELETE",
        headers: {
            "X-API-KEY" : "live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk"
        }
    });
    const saveData = await response.json();
    if(response.status !== 200) {
        spanError.textContent = "Ha ocurrido un error:" + response.status + saveData.message;
    }
    else {
        console.log("Cat removed from favorites")
        loadFavoritesCats()
    }
}
async function uploadCatPic() {
    const form = document.getElementById("uploading-form");
    const formData = new FormData(form);
    const response = await fetch(API_upload, {
        method: "POST",
        headers: {
            "X-API-KEY": "live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk"
        },
        body: formData,
    })
    const data = await response.json();
    console.log(formData.get("file"))
    if(response.status!== 201) {
        spanError.innerHTML = `There was an error when uploading cat: ${response.status} ${data.message}`
    }
    else {
        console.log("Cat pic uploaded");
        console.log({data});
        console.log(data.url)
        saveFavCat(data.id)
    }
}
loadRandomCats()
loadFavoritesCats()
//cambiar para cualquier numero de gatos