export const REQUIRED_ROLES = [
    "bluePresident",
    "redBoomer",
]

export const script = [
    {
        "key": "normal",
        "name": "normal",
        "label": "一般",
        "route": "normal",
        "required": [...REQUIRED_ROLES, "blueDoctor", "redEngineer"],
        "options": [
            "blueTuesdayKnight",
            "redDr.Boom",
            "blueEnforcer",
            "redEnforcer",
            "blueSpy",
            "redSpy",
            "blueCoyboy",
            "redCoyboy",
            "bluePapanoid",
            "redPapanoid",
            "blueMayor",
            "redMayor",
            "blueUsurper",
            "redUsurper",
            "blueSecurity",
            "redSecurity",
            "greyGambler"
        ]
    },
    {
        "key": "loveAndHate",
        "name": "Love And Hate",
        "route": "love-and-hate",
        "label": "愛恨",
        "required": [...REQUIRED_ROLES,
            "blueEris",
            "redCupid"
        ],
        "options": [
            "greyRival",
            "greyIntern",
            "greySurvivor",
            "greyVictim",
            "greyRomeo",
            "greyJuliet",
            "greyButler",
            "greyMaid",
            "greyAhab",
            "greyMoby",
            "greyWife",
            "greyMistress",
            "greyBomb-Bot",
            "greyQueen",
            "greyDecoy",
            "greyTarget",
            "greySniper"
        ]
    }
]