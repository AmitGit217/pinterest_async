import unsplash from "../api";

import Card from "./Card";


const renderCards = async (ul, data) => {
  ul.innerHTML = "";
  const localData = JSON.parse(localStorage.getItem("data"));
  if (localData) {
    data = localData;
  }else {
    data =  await unsplash.search.getPhotos({
                query: "software",
        })
  }
  data?.response?.results.forEach((r) => {
    ul.appendChild(Card(r));
  });
};
const CardSection = async () => {
  const cardsSection = document.createElement("section");
  cardsSection.classList.add("cardSection");
  const searchText = document.createElement("p")
  searchText.classList.add("search-text")
  cardsSection.appendChild(searchText)

  const ul = document.createElement("ul");
  cardsSection.appendChild(ul);

  const storedData = localStorage.getItem("data")
  renderCards(ul, JSON.parse(storedData))
 

  window.addEventListener("dataUpdated", async () => {
     const newData = localStorage.getItem("data");
      searchText.remove()
      await renderCards(ul, JSON.parse(newData));
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
