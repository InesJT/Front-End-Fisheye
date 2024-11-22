
function mediaTemplate(data) {
    const { id, photographerId, photographerName, title, image, video, likes, date, price  } = data;

    // recuperer juste le le prénom du photographer et remplacer - par espace
    const name = photographerName.split(' ')[0].replace('-', ' ');
    const imagePath = `assets/images/${name}/${image}`;
    const videoPath = `assets/images/${name}/${video}`;
  
    function getMediaCardDOM() {
      const article = document.createElement("article");
      article.classList.add("media-card");
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media-container");
  
      // création du media
      let mediaElement;
      if (image) {
        mediaElement = document.createElement("img");
        mediaElement.setAttribute(
          "src",
          imagePath
        );
        mediaElement.setAttribute("alt", title);
        mediaElement.setAttribute("title", title);
        mediaElement.setAttribute("tabindex", "0");

      } else {
        mediaElement = document.createElement("video");
        mediaElement.setAttribute(
          "src",
          videoPath
        );
        mediaElement.setAttribute("controls", "");
        mediaElement.setAttribute("title", title);
        mediaElement.setAttribute("aria-label", "Video : " + title);
        mediaElement.setAttribute("tabindex", "0");
 
      }
  
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
  
      // creation nombre de like
      const likesElem = document.createElement("span");
      likesElem.classList = "media-likes";
      likesElem.innerText = likes;
      likesElem.setAttribute("aria-label", `${likes} j'aime`);
  
      likesElem.setAttribute("tabindex", "0");
      likeContainer.appendChild(likesElem);
  
      // creation DE l'icone
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

    };
    return { getMediaCardDOM , likes};
  };
  