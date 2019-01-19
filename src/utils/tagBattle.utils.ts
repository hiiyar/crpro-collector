import { ValidateTag } from "./validateTag.utils";
import { Team } from "models/battlelog/Team";

class Utils extends ValidateTag {
  getTags = (team: Team[]) => {
    return team.map(team => this.validate(team.tag));
  };

  generateBattleId(team: Team[], opponent: Team[], battleTime: string) {
    let teamMates = this.getTags(team);
    let opponents = this.getTags(opponent);

    return [...teamMates, ...opponents].sort().join("") + battleTime;
  }

  getPlayersTags = (team: Team[], opponent: Team[]) => {
    return [...this.getTags(team), ...this.getTags(opponent)].sort();
  };
}

export const battleUtils = new Utils();
