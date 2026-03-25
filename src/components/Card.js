const Card = (cardData) => {
    const onlyDate = cardData.created_at.split("T")[0];

    const li = document.createElement("li");
    const card = document.createElement("div");
    card.className = "card";

    const imageLink = document.createElement("a");
    imageLink.href = cardData.links.html;
    imageLink.target = "_blank";

    const cardImage = document.createElement("img");
    cardImage.className = "card__image";
    cardImage.src = cardData.urls.small;
    cardImage.alt = cardData.description ?? "image";

    const profileImage = document.createElement("img");
    profileImage.className = "card__profile-image";
    profileImage.src = cardData.user.profile_image.medium;
    profileImage.alt = cardData.user.username;

    const username = document.createElement("p");
    username.className = "card__username";
    username.textContent = cardData.user.name;

    const createdAt = document.createElement("div");
    createdAt.className = "card__createdAt";

    const downloadLink = document.createElement("a");
    downloadLink.href = "#";
    downloadLink.className = "download-btn";
    downloadLink.dataset.url = cardData.urls.raw;
    downloadLink.dataset.location = cardData.links.html;

    const downloadIcon = document.createElement("img");
    downloadIcon.src = "/download.svg";
    downloadIcon.alt = "Download";

    const date = document.createElement("p");
    date.textContent = onlyDate;

    imageLink.appendChild(cardImage);
    downloadLink.appendChild(downloadIcon);
    createdAt.appendChild(downloadLink);
    createdAt.appendChild(date);
    card.appendChild(imageLink);
    card.appendChild(profileImage);
    card.appendChild(username);
    card.appendChild(createdAt);
    li.appendChild(card);

    return li;
};

export default Card;