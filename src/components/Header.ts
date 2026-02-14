import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_KEY
});


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

    const avatar = document.createElement("p")
    avatar.classList.add("avatar")
    avatar.innerText = "A"

    header.append(img, searchDiv, avatar)

    return header
}

export default Header
