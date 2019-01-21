export const clanData = {
  title: "Clan schema",
  type: "object",
  required: ["_id", "tag", "name", "badgeId", "clanScore", "requiredTrophies", 'members'],
  properties: {
    tag: "string",
    name: "string",
    badgeId: "number",
    type: "string",
    clanScore: "number",
    requiredTrophies: "number",
    donationsPerWeek: "number",
    clanChestLevel: "number",
    clanChestMaxLevel: "number",
    members: "number",
    location: {
      id: "number",
      name: "string",
      isCountry: "boolean",
      countryCode: "string"
    },
    description: "string",
    clanChestStatus: "string",
    clanChestPoints: "number",
    memberList: [
      {
        tag: "string",
        name: "string",
        expLevel: "number",
        trophies: "number",
        arena: {
          id: "number",
          name: "string"
        },
        role: "string",
        clanRank: "number",
        previousClanRank: "number",
        donations: "number",
        donationsReceived: "number",
        clanChestPoints: "number"
      }
    ]
  }

}