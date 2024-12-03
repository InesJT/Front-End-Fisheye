/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class PhotographerFactory {
  constructor(data, type) {
    if (type === "profile") {
      return new PhotographerTemplate(data).createProfile();
    } else if (type === "detail") {
      return new PhotographerTemplate(data).createDetail();
    } else {
      throw "Photographer factory error: unknown type format";
    }
  }
}
