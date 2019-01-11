class Utils {
  validatePlayerTag(tag: string) {
    // Convert to uppercase
    tag = tag.toUpperCase();

    if (tag.includes("#")) {
      // Convert ascii to html entities
      tag = tag.replace("#", "");
    }

    // Check length
    if (tag.length < 3) {
      throw Error("Player tag length must be more than 3 characters.");
    }

    return tag;
  }
}

export const PlayerUtils = new Utils();
