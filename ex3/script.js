const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.querySelector("#password").value
    
    localStorage.setItem("password", JSON.stringify(btoa(password)))
    const p = document.querySelector("#pass")
    p.textContent = atob(JSON.parse(localStorage.getItem("password")))
})