import { PlayerArena } from "models/player/PlayerArena";

export interface ClanMember {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  arena: PlayerArena;
  role: string;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  clanChestPoints: number;
}
