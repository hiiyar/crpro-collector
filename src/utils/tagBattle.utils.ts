import { validateTag } from "./validateTag.utils";
class Utils extends validateTag {
  generateTag(tag1: string, tag2: string, battleTime: string) {
    const tag = [this.validate(tag1), this.validate(tag2)];
    tag.sort()
    tag.push(battleTime)
    return tag.join("")
  }
}

export const tagBattleUtils = new Utils();