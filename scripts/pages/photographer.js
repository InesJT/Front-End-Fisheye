function handleLikeButtons(medias) {
  // gestion de click sur le like
  const likeButtons = document.querySelectorAll(".btn-like");
  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", () => {
      const likedMedia = medias[index];
      if (likedMedia.liked) {
        likedMedia.likes--;
        likedMedia.liked = false;
        likeButton.setAttribute("aria-label", "Cliquer pour aimer");
      } else {
        likedMedia.likes++;
        likedMedia.liked = true;
        likeButton.setAttribute("aria-label", "Cliquer pour retirer le j'aime");
      }
      const likesTexts = document.querySelectorAll(".media-likes");
      likesTexts[index].innerText = likedMedia.likes;
      this.updateTotalLikes(medias);
    });
  });
}

// afficher la somme des likes
function updateTotalLikes(medias) {
  const likesSum = medias.reduce((acc, media) => acc + media.likes, 0);
  const likesSumWidget = document.querySelector(".likes-widget__count");
  likesSumWidget.setAttribute("aria-label", `Nombre total des likes ${likesSum}`);
  likesSumWidget.innerText = likesSum;
}

async function init() {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get("id")); // Récupérer la valeur de l'id à partir de l'URL
  console.log("the id", id);
  const response = await fetch("./data/photographers.json");
  const items = await response.json();
  console.log("items", items);
  const photographer = items.photographers.find((i) => i.id === id);
  console.log("photographer", photographer);
  const medias = items.media.filter((i) => i.photographerId === id);
  console.log("media", medias);

  new PhotographerFactory(photographer, "detail");

  const mediaSection = document.querySelector(".media");
  mediaSection.innerHTML = "";
  let totalLikes = 0;
  medias.forEach((media) => {
    let card;
    if (media.image) {
      card = new MediaFactory({ ...media, photographerName: photographer.name }, "image");
    } else {
      card = new MediaFactory({ ...media, photographerName: photographer.name }, "video");
    }
    mediaSection.append(card)
    totalLikes = totalLikes + media.likes;
    console.log(media.likes);
  });
  console.log(totalLikes);

  new LightBoxTemplate().create();

  handleLikeButtons(medias);
  updateTotalLikes(medias);

}

init();
