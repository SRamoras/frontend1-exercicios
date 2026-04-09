const form = document.querySelector("form")
form.addEventListener("submit", () => {
    const user = document.querySelector("#name").value
    localStorage.setItem("name", user)
})




const toogleButton = document.querySelector("#toogle_button")
let theme = localStorage.getItem("theme")

if(!theme) {
    toogleButton.textContent = "light"
} else {
    toogleButton.textContent = theme
}

toogleButton.addEventListener("click", () => {
    let theme = localStorage.getItem("theme")
    if(theme === "light"){
        toogleButton.textContent = "dark"
        localStorage.setItem("theme", "dark")
    } else {
        toogleButton.textContent = "light"
        localStorage.setItem("theme", "light")
    }
})