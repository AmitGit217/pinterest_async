import data from "../example.json"


const CardSection = () => {
    const cardsSection = document.createElement("section")
    cardsSection.classList.add("cardSection")
    const ul = document.createElement("ul")

    ul.innerHTML = `
    ${data.results.map(r => {
        const dateStr = r.created_at
        const onlyDate = dateStr.split("T")[0];
        return `
        <li>
            <div class="card">
                <img class="card__image" src=${r.urls.raw} alt=${r.description}/>
                <img src=${r.user.profile_image.medium} alt=${r.user.username}>
                <p>${r.user.name}</p>
                <div class="card__createdAt">
                    <a herf=${r.links.download}/>
                    <img src="public/download.svg" alt=download/>
                    </a>        
                    <p>${onlyDate}</p>
                </div>
                
            </div>
        </li>`
    })}
    `



    


    cardsSection.appendChild(ul)
    return cardsSection

}

export default CardSection