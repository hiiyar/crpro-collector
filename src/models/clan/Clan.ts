import { ClanLocation } from "./ClanLocation";
import { ClanMember } from "./ClanMember";

export interface Clan {
  tag: string;
  name: string;
  badgeId: string;
  type: string;
  clanScore: number;
  requiredTrophies: number;
  donationsPerWeek: number;
  clanChestLevel: number;
  clanChestMaxLevel: number;
  members: number;
  location?: ClanLocation;
  description: string;
  clanChestStatus: string;
  clanChestPoints: number;
  memberList: ClanMember[];
}
