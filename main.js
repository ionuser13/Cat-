const API_Main = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";
const API_Fav = "https://api.thecatapi.com/v1/favourites?limit=10&api_key=live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";
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
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        img1.src = randomData[0].url;
        img2.src = randomData[1].url;
    }
    return data
}

async function loadFavoritesCats() {
    const response = await fetch(API_Fav);
    const dataFav = await response.json()
    console.log("fav")
    console.log(dataFav)
    if(response.status !== 200) {
        spanError.innerHTML = "Ha ocurrido un error: " + response.status + dataFav.message;
    }
}

async function saveFavCat() {
    const response = await fetch(API_Fav, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_id: "Dqtad3dGZ"
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