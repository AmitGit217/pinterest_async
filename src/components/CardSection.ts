import unsplash from "../api";
import type { ImageResult } from "../interfaces";


const renderCards = (ul: HTMLUListElement, data: any) => {
  ul.innerHTML = data?.response?.results
    .map((r: ImageResult) => {
      const onlyDate = r.created_at.split("T")[0];
      return `
      <li>
        <div class="card">
          <a href="${r.links.html}" target="_blank">
            <img class="card__image" src="${r.urls.small}" alt="${r.description ?? "image"}"/>
          </a>
          <img class="card__profile-image " src="${r.user.profile_image.medium}" alt="${r.user.username}"/>
          <p class="card__username">${r.user.name}</p>
          <div class="card__createdAt">
            <a href="#" 
               class="download-btn" 
               data-url="${r.urls.raw}" 
               data-location="${r.links.html}">
              <img src="/download.svg" alt="Download"/>
            </a>
            <p>${onlyDate}</p>
          </div>
        </div>
      </li>`;
    })
    .join("");
};

const CardSection = async (): Promise<HTMLElement> => {
  const cardsSection = document.createElement("section");
  cardsSection.classList.add("cardSection");

  const ul = document.createElement("ul");
  cardsSection.appendChild(ul);

  const storedData = localStorage.getItem("data");
  if (storedData) renderCards(ul, JSON.parse(storedData));

  window.addEventListener("dataUpdated", () => {
    const newData = localStorage.getItem("data");
    if (newData) renderCards(ul, JSON.parse(newData));
  });

  ul.addEventListener("click", async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLAnchorElement>(".download-btn");
    if (!btn) return;

    e.preventDefault();
    const downloadLocation = btn.dataset.location;
    const imageUrl = btn.dataset.url;

    if (!downloadLocation || !imageUrl) return;

    try {
      await unsplash.photos.trackDownload({ downloadLocation });

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "image.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  });

  return cardsSection;
};

export default CardSection;
