async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  const items = await response.json();
  return ({
    photographers: [...items.photographers]
  })
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerProfile = new PhotographerFactory(photographer, "profile");
    photographersSection.appendChild(photographerProfile);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
