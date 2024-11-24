class PhotographerTemplate {
  constructor(card) {
    this.card = card;
  }

  createProfile() {
    const { id, name, city, country, price, tagline, portrait } = this.card;

    const picture = `assets/photographers/${portrait}`;

    const link = document.createElement('a');
    link.setAttribute('href', `./photographer.html?id=${id}`);
    link.setAttribute('class', 'linkCard');
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute("src", picture)
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
}
