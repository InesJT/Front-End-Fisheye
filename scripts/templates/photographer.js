/* eslint-disable no-unused-vars */
class PhotographerTemplate {
  constructor(data) {
    this.data = data;
  }

  createProfile() {
    const { id, name, city, country, price, tagline, portrait } = this.data;

    const picture = `assets/photographers/${portrait}`;

    const link = document.createElement('a');
    link.setAttribute('href', `./photographer.html?id=${id}`);
    link.setAttribute('class', 'linkCard');
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", "image du photographer" +name);
    const h2 = document.createElement('h2');
    h2.innerText = name;
    const h3 = document.createElement('h3');
    h3.textContent = city + ", " + country;
    const h4 = document.createElement('h4');
    h4.textContent = tagline;
    const p = document.createElement('p');
    p.textContent = price + " €/jour";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(p);
    link.append(article);
    return link;
  }

  createDetail() {
    const { name, city, country, portrait, price, tagline } = this.data;
    // insérer le nom
    const nameElem = document.querySelector(".photographer-name");
    nameElem.innerText = name;
    nameElem.setAttribute("tabindex", "0");

    // insérer l'adresse
    const address = document.querySelector(".photographer-address div");
    address.setAttribute(
      "aria-label",
      `Adresse du photographe : ${city}, ${country}`
    );
    address.innerText = `${city}, ${country}`;

    // insérer tagline
    const taglineElem = document.querySelector(".photographer-tagline");
    taglineElem.setAttribute(
      "aria-label",
      `Tagline du photographe : ${tagline}`
    );
    taglineElem.innerText = tagline;

    // insérer image
    const img = document.createElement("img");
    img.setAttribute("src", `assets/photographers/${portrait}`);
    img.setAttribute("alt", `Portrait de ${name}`);
    img.setAttribute("tabindex", "0");
    const portraitElem = document.querySelector(".photographer-img");
    portraitElem.appendChild(img);

    // insérer le prix
    const priceElement = document.querySelector(".likes-widget_price");
    priceElement.innerText = `${price} € / jour`;
    priceElement.setAttribute('aria-label', `Tarif du photographe : ${price} euros par jour`);

    // Contact Modal
    document.querySelector(".open_button").addEventListener("click", this.openModal);
    document.querySelector(".close-modal").addEventListener("click", this.closeModal);
    document.querySelector(".send_button").addEventListener("click", this.submitForm);
  }

  openModal() {
    const dialog = document.getElementById("contact_modal");
    dialog.showModal();
    dialog.setAttribute("aria-modal", "true");
    const firstNameField = document.getElementById("first-name");
    firstNameField.focus();
  }

  closeModal() {
    const dialog = document.getElementById("contact_modal");
    dialog.close();
    dialog.setAttribute("aria-modal", "false");
    document.querySelector(".open_button").focus();    
  }

  submitForm() {
    console.log("first-name", document.getElementById("first-name").value);
    console.log("last-name", document.getElementById("last-name").value);
    console.log("email", document.getElementById("email").value);
    console.log("message", document.getElementById("message").value);

  }

  createMediaPost(type) {
    const { photographerName, title, image, video, likes } = this.data;

    // récuperer juste le prénom du photographer et remplacer - par espace
    const name = photographerName.split(' ')[0].replace('-', ' ');

    const article = document.createElement("article");
    article.classList.add("media-card");
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container");

    // création du media
    let mediaElement;
    if (type === "image") {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute(
        "src",
        `assets/images/${name}/${image}`
      );
    } else {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute(
        "src",
        `assets/images/${name}/${video}`
      );
      mediaElement.setAttribute("controls", true);
      mediaElement.setAttribute("aria-label", "Video : " + title);
    }

    mediaElement.setAttribute("alt", title);
    mediaElement.setAttribute("title", title);
    mediaElement.setAttribute("tabindex", "0");

    mediaContainer.appendChild(mediaElement);
    article.appendChild(mediaContainer);

    // création du bloc media-info
    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    // création du titre du media
    const mediaTitle = document.createElement("h2");
    mediaTitle.innerText = title;
    mediaTitle.setAttribute("tabindex", "0");
    mediaInfo.appendChild(mediaTitle);

    // création du bloc like
    const likeContainer = document.createElement("div");
    likeContainer.classList.add("like-container");
    likeContainer.setAttribute("aria-label", "Nombre de likes");

    // création nombre de like
    const likesElem = document.createElement("span");
    likesElem.classList = "media-likes";
    likesElem.innerText = likes;
    likesElem.setAttribute("aria-label", `${likes} j'aime`);

    likesElem.setAttribute("tabindex", "0");
    likeContainer.appendChild(likesElem);

    // création DE l'icone
    const likeIcon = document.createElement("em");
    likeIcon.classList = "fa-solid fa-heart";
    const likeButton = document.createElement("button");
    likeButton.classList = "btn-like";
    likeButton.setAttribute("aria-label", "Cliquer pour aimer");

    likeButton.appendChild(likeIcon);
    likeContainer.appendChild(likeButton);
    mediaInfo.appendChild(likeContainer);
    article.appendChild(mediaInfo);
    return article;
  }

  createImagePost() {
    return this.createMediaPost("image");
  }

  createVideoPost() {
    return this.createMediaPost("video");
  }
}
