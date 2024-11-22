// modifier init pour loadData : chargement des données json depuis le fichier 
// fonction qui prend en )parametres le photographer pour l'afficher dans le header 

// fonction qui prend en parametre liste des medias et rajoute le nom du photographer 
// et puis utiliser la template media pour l'affichage des medias ( cartes )  

async function init() {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get("id")); // Récupérer la valeur de l'id à partir de l'URL
  console.log("the id", id);
  const response = await fetch("./data/photographers.json");
  const items = await response.json();
  console.log("items", items);
  const photographer = items.photographers.find((i) => i.id === id);
  console.log("photographer", photographer);
  const media = items.media.filter((i) => i.photographerId === id);
  console.log("media", media);

  showGeneralInformation(photographer);
  
  const mediaSection = document.querySelector(".media");
  mediaSection.innerHTML = "";
  let totalLikes =0; 
  media.forEach((m) => {
          // ajouter l'article à la section
          const template = mediaTemplate({m, "photographerName":photographer.name});
          const card = template.getMediaCardDOM();
          mediaSection.append(card)
          totalLikes = totalLikes + template.likes; 
          console.log(template.likes);
  });
  console.log(totalLikes);
}

function showGeneralInformation(photographer) {
  // insérer le nom
  const name = document.querySelector(".photographer-name");
  name.innerText = photographer.name;
  name.setAttribute("tabindex", "0");

  // insérer l'adresse
  const address = document.querySelector(".photographer-address div");
  address.setAttribute(
    "aria-label",
    `Adresse du photographe : ${photographer.city}, ${photographer.country}`
  );
  address.innerText = `${photographer.city}, ${photographer.country}`;

  // insérer tagline
  const tagline = document.querySelector(".photographer-tagline");
  tagline.setAttribute(
    "aria-label",
    `Tagline du photographe : ${photographer.tagline}`
  );
  tagline.innerText = photographer.tagline;

  // insérer image
  const img = document.createElement("img");
  img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
  img.setAttribute("alt", `Portrait de ${photographer.name}`);
  img.setAttribute("tabindex", "0");
  const portrait = document.querySelector(".photographer-img");
  portrait.appendChild(img);

  // insére le prix
  const priceElement = document.querySelector(".likes-widget_price");
  priceElement.innerText = `${photographer.price} € / jour`;
  priceElement.setAttribute('aria-label', `Tarif du photographe : ${photographer.price} euros par jour`);
};

init();
