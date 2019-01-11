import { PlayerClan } from "./PlayerClan";
import { PlayerSeason } from "./PlayerSeason";
import { PlayerAchievement } from "./PlayerAchievement";
import { PlayerCard } from "./PlayerCard";
import { PlayerArena } from "./PlayerArena";

export interface Player {
  tag: string;
  name: string;

  expLevel: number;
  trophies: number;

  arena?: PlayerArena;

  bestTrophies?: number;

  wins?: number;
  losses?: number;

  battleCount?: number;
  threeCrownWins?: number;

  challengeCardsWon?: number;
  challengeMaxWins?: number;

  tournamentCardsWon?: number;
  tournamentBattleCount?: number;

  role?: string;
  donations?: number;
  donationsReceived?: number;
  totalDonations?: number;

  warDayWins?: number;

  clanCardsCollected?: number;
  clan?: PlayerClan;

  leagueStatistics?: {
    currentSeason: PlayerSeason;
    previousSeason: PlayerSeason;
    bestSeason: PlayerSeason;
  };

  achievements?: PlayerAchievement[];

  cards?: PlayerCard[];

  currentFavouriteCard?: PlayerCard;
}
