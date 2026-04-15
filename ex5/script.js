async function getData(breed){
    try{
        loadder(true)
        const api = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        const data = await api.json()
        showImg(data.message)
        console.log(data.message)
    } catch (error) {
        console.error("Error fetching data:", error)
    } finally {
        loadder(false)
    }
    
}

const form = document.querySelector("#dog-name")
const img = document.createElement("img")
const gif = document.createElement("img")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const breed = document.querySelector("#name").value
    console.log(breed)
    getData(breed)
})


function showImg(src) {
    img.id = "img-dog"
    document.body.appendChild(img)
    img.src = src
    img.alt = "Dog Image"
}

function loadder(isLoading) {
    gif.src = "https://loading.io/assets/mod/spinner/spinner/sample.gif" 
    gif.alt = "Loading..."
    document.body.appendChild(gif);
    if (isLoading) {
        gif.style.display = "block"
    } else {
        gif.style.display = "none"
    }
}