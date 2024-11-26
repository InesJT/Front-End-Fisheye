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

  new PhotographerFactory(photographer, "detail");

  const mediaSection = document.querySelector(".media");
  mediaSection.innerHTML = "";
  let totalLikes = 0;
  media.forEach((m) => {
    // ajouter l'article à la section
    // const template = mediaTemplate({ ...m, photographerName: photographer.name });
    // const card = template.getMediaCardDOM();
    let card;
    if (m.image) {
      card = new MediaFactory({ ...m, photographerName: photographer.name }, "image");
    } else {
      card = new MediaFactory({ ...m, photographerName: photographer.name }, "video");
    }
    mediaSection.append(card)
    totalLikes = totalLikes + m.likes;
    console.log(m.likes);
  });
  console.log(totalLikes);

  new LightBoxTemplate().create();

}

init();
