import { PlayerCard } from "models/player/PlayerCard";
import { PlayerClan } from "models/player/PlayerClan";

export interface Opponent 
  {
    tag: string,
    name: string,
    startingTrophies: number,
    trophyChange: number,
    crowns: number,
    clan:PlayerClan,
    cards: PlayerCard[];
  }
