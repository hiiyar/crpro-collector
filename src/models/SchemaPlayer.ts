import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PlayersSchema = new Schema({
  tag: String,
  name: String,
  expLevel: Number,
  trophies: Number,
  arena: {
    id: Number,
    name: String
  },
  bestTrophies: Number,
  wins: Number,
  losses: Number,
  battleCount: Number,
  threeCrownWins: Number,
  challengeCardsWon: Number,
  challengeMaxWins: Number,
  tournamentCardsWon: Number,
  tournamentBattleCount: Number,
  role: String,
  donations: Number,
  donationsReceived: Number,
  totalDonations: Number,
  warDayWins: Number,
  clanCardsCollected: Number,
  clan: {
    tag: String,
    name: String,
    badgeId: Number
  },
  leagueStatistics: {
    currentSeason: {
      id: String,
      trophies: Number,
      bestTrophies: Number
    },
    previousSeason: {
      id: String,
      trophies: Number,
      bestTrophies: Number
    },
    bestSeason: {
      id: String,
      trophies: Number,
      bestTrophies: Number
    }
  },
  achievements: [
    {
      name: String,
      stars: Number,
      value: Number,
      target: Number,
      info: String
    }
  ],
  cards: [
    {
      name: String,
      level: Number,
      maxLevel: Number,
      count: Number,
      iconUrls: {
        medium: String
      }
    }
  ],
  currentFavouriteCard: {
    name: String,
    id: Number,
    maxLevel: Number,
    iconUrls: {
      medium: String
    }
  }
});
