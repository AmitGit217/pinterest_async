import type { ImageResult } from "../interfaces";


const Card = (cardData: ImageResult) => {
    const onlyDate = cardData.created_at.split("T")[0];
    return  `
      <li>
        <div class="card">
          <a href="${cardData.links.html}" target="_blank">
            <img class="card__image" src="${cardData.urls.small}" alt="${cardData.description ?? "image"}"/>
          </a>
          <img class="card__profile-image " src="${cardData.user.profile_image.medium}" alt="${cardData.user.username}"/>
          <p class="card__username">${cardData.user.name}</p>
          <div class="card__createdAt">
            <a href="#" 
               class="download-btn" 
               data-url="${cardData.urls.raw}" 
               data-location="${cardData.links.html}">
              <img src="/download.svg" alt="Download"/>
            </a>
            <p>${onlyDate}</p>
          </div>
        </div>
      </li>`;
}

export default Card