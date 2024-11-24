class PhotographerFactory {
  constructor(card, type) {
    if (type === "profile") {
      return new PhotographerTemplate(card).createProfile();
    } else {
      throw "Photographer factory error: unknown type format";
    }
  }
}
