import { validateTag } from "./validateTag.utils";
class Utils extends validateTag {

  validatePlayerTag(tag: string) {
    tag = this.validate(tag)
    // Check length
    if (tag.length < 3) {
      throw Error("Player tag length must be more than 3 characters.");
    }

    return tag;
  }
}

export const PlayerUtils = new Utils();
