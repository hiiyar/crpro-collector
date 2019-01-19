export const battlesData = {
  title: "Battle schema",
  type: "object",
  required: ["battles"],
  properties: {
    battles: [
      {
        arena: {
          id: "number",
          name: "string",
        },
        gameMode: {
          id: "number",
          name: "string",
        },
        tags: {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        _id: "string",
        type: "string",
        battleTime: "number",
        deckSelection: "string",
        team: [
          {
            clan: {
              tag: "string",
              name: "string",
              badgeId: "number"
            },
            cards: [
              {
                iconUrls: [
                  {
                    _id: "string",
                    medium: "string",
                  }
                ],
                _id: "string",
                name: "string",
                level: "string",
                maxLevel: "string",
              }],
            _id: "string",
            tag: "string",
            name: "string",
            startingTrophies: "number",
            trophyChange: "number",
            crowns: "number",
          },
        ],
        opponent: [
          {
            clan: {
              tag: "string",
              name: "string",
              badgeId: "number"
            },
            cards: [
              {
                iconUrls: [
                  {
                    _id: "string",
                    medium: "string",
                  }
                ],
                _id: "string",
                name: "string",
                level: "string",
                maxLevel: "string",
              }],
            _id: "string",
            tag: "string",
            name: "string",
            startingTrophies: "number",
            trophyChange: "number",
            crowns: "number",
          },
        ],
      }
    ]
  }
}