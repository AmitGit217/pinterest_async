import unsplash from "../api";

import Card from "./Card";


const renderCards = (ul, data) => {
  ul.innerHTML = "";
  data?.response?.results.forEach((r) => {
    ul.appendChild(Card(r));
  });
};
const CardSection = async () => {
  const cardsSection = document.createElement("section");
  cardsSection.classList.add("cardSection");
  const searchText = document.createElement("p")
  searchText.innerText = "Busca Algo ! (Ejemplo: Cars)"
  searchText.classList.add("search-text")
  cardsSection.appendChild(searchText)

  const ul = document.createElement("ul");
  cardsSection.appendChild(ul);

  const storedData = localStorage.getItem("data");
  if (storedData) {
    searchText.remove()
    renderCards(ul, JSON.parse(storedData))
  }
 

  window.addEventListener("dataUpdated", () => {
    const newData = localStorage.getItem("data");
    if (newData) {
      searchText.remove()
      renderCards(ul, JSON.parse(newData));
    }
  });

  ul.addEventListener("click", async (e) => {
    const target = e.target ;
    const btn = target.closest(".download-btn");
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
