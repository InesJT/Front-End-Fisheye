class LightBoxTemplate {
  create() {
    const lightbox = document.getElementById("lightbox");
    this.medias = document.querySelectorAll("article .media-container img, article .media-container video");
    console.log('this.medias', this.medias);

    this.medias.forEach((media, index) => {
      media.addEventListener("click", () => {
        this.currentIndex = index;
        this.setLightBoxMedia();
        lightbox.showModal();
      });
      media.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          this.currentIndex = index;
          this.setLightBoxMedia();
          lightbox.showModal();
        }
      });
    })

    document.querySelector(".close-btn").addEventListener("click", () => {
      lightbox.close();
    });

    const prevBtn = document.getElementById("prev");
    // Naviguer à gauche (image précédente)
    prevBtn.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex - 1 + this.medias.length) % this.medias.length;
      this.setLightBoxMedia();
    });

    const nextBtn = document.getElementById("next");
    // Naviguer à droite (image suivante)
    nextBtn.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % this.medias.length;
      this.setLightBoxMedia();
    });

    // Ajouter l'accessibilité par les flèches du clavier
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        prevBtn.click();
      } else if (event.key === "ArrowRight") {
        nextBtn.click();
      }
    });

    // fermer le lightbox quand on clique dehors
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });
  }

  setLightBoxMedia() {
    const lightboxMedia = document.querySelector(".lightbox-media");
    const media = this.medias[this.currentIndex];
    if (media.nodeName === "IMG") {
      lightboxMedia.innerHTML = `<img src="${media.src}" alt="Image dans le lightbox ${media.title}" tabindex="0"/>`;
    } else if (media.nodeName === "VIDEO") {
      lightboxMedia.innerHTML = `<video controls src="${media.src}">`;
    }
    // ajouter le titre sous chaque media ouvert dans la lightbox
    const lightboxTitle = document.getElementById("lightboxTitle");
    lightboxTitle.innerText = this.medias[this.currentIndex].title;
  }
}