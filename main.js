console.log("Hello World");
const API = "https://api.thecatapi.com/v1/images/search?limit=3";
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
async function reload(){
    const response = await fetch(API);
    const data = await response.json()
    console.log(data)
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}
reload()