import unsplash from "../api"



const Header = () => {
    const header = document.createElement("header")
    header.className = "header"

    const img = document.createElement("img")
    img.src = "/pintrest.svg"
    img.addEventListener("click", () => {
        window.location.reload()
        localStorage.clear()
    })

    const searchDiv = document.createElement("div")
    searchDiv.classList.add("search")
    const input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Buscar"
    input.name = "search"
    input.ariaLabel = "search"
    
    searchDiv.appendChild(input)

    input.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            let eventValue = (e.target).value
            const data = await unsplash.search.getPhotos({
                query: eventValue,
            })
            localStorage.setItem("data", JSON.stringify(data))
            localStorage.setItem("searchValue", JSON.stringify(eventValue))
            window.dispatchEvent(new Event("dataUpdated")); 
            input.value = ""
        }
        
    });



    header.append(img, searchDiv)

    return header
}

export default Header
