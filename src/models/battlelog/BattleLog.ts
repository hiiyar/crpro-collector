import { PlayerArena } from "../player/PlayerArena";
import { gameMode } from "./gameMode";
import { Team } from "./Team";

export interface BattleLog 

{
  type?: string;
  battleTime: string;
  arena?: PlayerArena;
  gameMode?:gameMode;
  deckSelection?: string;
  team: Team[];
  opponent: Team[];
  
}
