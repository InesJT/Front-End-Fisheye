class MediaFactory {
  constructor(data, type) {
    if (type === "image") {
      return new PhotographerTemplate(data).createImagePost();
    } else if (type === "video") {
      return new PhotographerTemplate(data).createVideoPost();
    } else {
      throw "Media factory error: unknown type format";
    }
  }
}
