export class validateTag {
  validate(tag: string) {
    // Convert to uppercase
    tag = tag.toUpperCase();

    if (tag.includes("#")) {
      // Convert ascii to html entities
      tag = tag.replace("#", "");
    }
    return tag;
  }
}
export const validateTagUtils = new validateTag();