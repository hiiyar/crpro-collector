import * as mongoose from "mongoose";

export const ClanSchema = new mongoose.Schema({
  _id: String,
  tag: String,
  name: String,
  badgeId: String,
  type: String,
  clanScore: Number,
  requiredTrophies: Number,
  donationsPerWeek: Number,
  clanChestLevel: Number,
  clanChestMaxLevel: Number,
  members: Number,
  location: {
    id: Number,
    name: String,
    isCountry: Boolean,
    countryCode: String
  },
  description: String,
  clanChestStatus: String,
  clanChestPoints: Number,
  memberList: [
    {
      tag: String,
      name: String,
      expLevel: Number,
      trophies: Number,
      arena: {
        id: Number,
        name: String
      },
      role: String,
      clanRank: Number,
      previousClanRank: Number,
      donations: Number,
      donationsReceived: Number,
      clanChestPoints: Number
    }
  ]
});
