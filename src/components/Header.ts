import unsplash from "../api"



const Header = () => {
    const header = document.createElement("header")
    header.className = "header"

    const img = document.createElement("img")
    img.src = "/pintrest.svg"

    const searchDiv = document.createElement("div")
    searchDiv.classList.add("search")
    const input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Buscar"
    input.name = "search"
    searchDiv.appendChild(input)

    input.addEventListener("keydown", async (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            const data = await unsplash.search.getPhotos({
                query: (e.target as HTMLInputElement).value,
            })
            localStorage.setItem("data", JSON.stringify(data))
            window.dispatchEvent(new Event("dataUpdated")); 
        }
        
    });

    const avatar = document.createElement("p")
    avatar.classList.add("avatar")
    avatar.innerText = "A"

    header.append(img, searchDiv, avatar)

    return header
}

export default Header
