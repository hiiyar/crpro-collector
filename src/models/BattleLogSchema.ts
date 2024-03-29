import * as mongoose from "mongoose"
export const BattleLogSchema = new mongoose.Schema({
  _id: String,
  type: String,
  battleTime: String,
  arena: {
    id: Number,
    name: String,
  },
  gameMode: {
    id: Number,
    name: String,
  },
  deckSelection: String,
  team: [
    {
      tag: String,
      name: String,
      startingTrophies: Number,
      trophyChange: Number,
      crowns: Number,
      clan: {
        tag: String,
        name: String,
        badgeId: Number,
      },
      cards: [
        {
          name: String,
          level: Number,
          maxLevel: Number,
          iconUrls: [
            {
              medium: String,
            }
          ]
        }
      ]
    }
  ],
  opponent: [
    {
      tag: String,
      name: String,
      startingTrophies: Number,
      trophyChange: Number,
      crowns: Number,
      clan: {
        tag: String,
        name: String,
        badgeId: Number
      },
      cards: [
        {
          name: String,
          level: Number,
          maxLevel: Number,
          iconUrls: [
            {
              medium: String
            }
          ]
        }
      ]
    }
  ],
  tags: [String]
})
