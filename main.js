const API_Main = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";
const API_Fav = "https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_armx4JrLwsJuAo9OitmUn4ieHibSokktW9YTlE6Du6q6InUtMOArwesfWhg3Sjfk";
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
async function loadRandomCats(){
    const response = await fetch(API_Main);
    const data = await response.json()
    console.log(data)
    img1.src = data[0].url;
    img2.src = data[1].url;
}

async function loadFavoritesCats() {

}
loadRandomCats()