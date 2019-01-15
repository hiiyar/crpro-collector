import { PlayerArena } from "../player/PlayerArena";
import { gameMode } from "./gameMode";
import { Team } from "./Team";

export interface battlelog 

{
  type: string,
  battleTime: string,
  arena?: PlayerArena,
  gameMode?:gameMode,
  deckSelection: string,
  team: Team[],
  opponent: Team[],
}