const REQUIRED_ROLES = [
    "bluePresident",
    "redBoomer",
]

const script = [
    {
        "key": "normal",
        "name": "normal",
        "label": "一般",
        "route": "normal",
        "required": ["bluePresident", "redBoomer", "blueDoctor", "redEngineer"],
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
        "required": ["bluePresident", "redBoomer", "blueEris", "redCupid"],
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

export default {
    REQUIRED_ROLES,
    script
}