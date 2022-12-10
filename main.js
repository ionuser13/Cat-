const api = axios.create({
    baseURL: "https://api.thecatapi.com/v1/"
});
api.defaults.headers.common["X-API-KEY"] = "live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";

const API_Main = "https://api.thecatapi.com/v1/images/search?limit=4";
const API_Fav = "https://api.thecatapi.com/v1/favourites";
const API_Delete = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_upload = "https://api.thecatapi.com/v1/images/upload";
const randCat = document.querySelector("#random-cats");
const favCat = document.querySelector("#fav-cats");
const reloadButton = document.querySelector("#cat-button");
const changeBtn = document.querySelector(".change");
const uploadBtn = document.querySelector(".upload");
const uploadSection = document.querySelector("#uploading-cat");


async function loadRandomCats(){
    const response = await fetch(API_Main);
    const randomData = await response.json();
    if(response.status !== 200) {
        spanError.innerHTML = "Ha ocurrido un error" + response.status;
    }
    else {
        const randomSection = document.querySelector("#random-cats");
        const fragment = new DocumentFragment();
        randomData.forEach(cat =>{
            const article = document.createElement("article");
            article.classList.add("random-cats-article")
            const img = document.createElement("img");
            const button = document.createElement("button");
            const buttonText = document.createTextNode("♡");
            img.src = cat.url;
            button.addEventListener("click", saveFavCat.bind("idCat", cat.id))
            button.classList.add("btn-primary", "mx-auto", "add-to-fav")
            button.appendChild(buttonText);
            article.append(img, button)
            fragment.appendChild(article);
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

function home() {
    randCat.classList.remove("none");
    favCat.classList.add("none");
    uploadSection.classList.add("none");
}


function showUploadSection() {
    randCat.classList.add("none");
    favCat.classList.add("none");
    uploadSection.classList.remove("none");
}
uploadBtn.addEventListener("click", showUploadSection)

function change() {
    randCat.classList.add("none");
    uploadSection.classList.remove("none");
    favCat.classList.remove("none");
}


reloadButton.addEventListener("click", () =>{
    const randomSection = document.querySelector("#random-cats");;
    randomSection.innerHTML = "";
    loadRandomCats()
})
loadRandomCats()
loadFavoritesCats()
//cambiar para cualquier numero de gatos