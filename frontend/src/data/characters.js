import { RolePair } from "@/enum/Pair";
export const characters = [
    {
        "key": "bluePresident",
        "role": "President",
        "color": "blue",
        "label": "總統",
        "desc": "最後不與炸彈客在同一個房間",
        "pair": RolePair.PresidentBoomer,
        "src": "pic/role/blue-president.png"
    },
    {
        "key": "redBoomer",
        "role": "Boomer",
        "color": "red",
        "label": "炸彈客",
        "desc": "最後與總統在同一個房間",
        "pair": RolePair.PresidentBoomer,
        "src": "pic/role/red-boomer.png"
    },
    {
        "key": "blueDoctor",
        "role": "Doctor",
        "color": "blue",
        "label": "醫生",
        "desc": "遊戲結束前與總統分享卡片",
        "pair": RolePair.DoctorEngineer,
        "src": "pic/role/blue-doctor.png"
    },
    {
        "key": "redEngineer",
        "role": "Engineer",
        "color": "red",
        "label": "工程師",
        "desc": "遊戲結束前與炸彈客分享卡片",
        "pair": RolePair.DoctorEngineer,
        "src": "pic/role/red-engineer.png"
    },
    {
        "key": "blueTuesdayKnight",
        "role": "TuesdayKnight",
        "color": "blue",
        "label": "星期二騎士",
        "desc": "跟炸彈客分享卡片，藍隊直接獲勝",
        "pair": RolePair.TuesdayKnightDrBoom,
        "src": "pic/role/blue-tuesdayknight.png"
    },
    {
        "key": "redDr.Boom",
        "role": "Dr.Boom",
        "color": "red",
        "label": "砰砰博士",
        "desc": "跟總統分享卡片，紅隊直接獲勝",
        "pair": RolePair.TuesdayKnightDrBoom,
        "src": "pic/role/red-drboom.png"
    },
    {
        "key": "blueEnforcer",
        "role": "Enforcer",
        "color": "blue",
        "label": "執法者",
        "desc": "強制兩位玩家交換卡片",
        "pair": RolePair.Enforcer,
        "src": "pic/role/blue-enforcer.png"
    },
    {
        "key": "redEnforcer",
        "role": "Enforcer",
        "color": "red",
        "label": "執法者",
        "desc": "強制兩位玩家交換卡片",
        "pair": RolePair.Enforcer,
        "src": "pic/role/red-enforcer.png"
    },
    {
        "key": "blueMayor",
        "role": "Mayor",
        "color": "blue",
        "label": "市長",
        "desc": "公開後，一票值兩票",
        "pair": RolePair.Mayor,
        "src": "pic/role/blue-mayor.png"
    },
    {
        "key": "redMayor",
        "role": "Mayor",
        "color": "red",
        "label": "市長",
        "desc": "公開後，一票值兩票",
        "pair": RolePair.Mayor,
        "src": "pic/role/red-mayor.png"
    },
    {
        "key": "blueCoyboy",
        "role": "Coyboy",
        "color": "blue",
        "label": "靦腆少年",
        "desc": "你只能執行分享顏色",
        "pair": RolePair.Coyboy,
        "src": "pic/role/blue-coyboy.png"
    },
    {
        "key": "redCoyboy",
        "role": "Coyboy",
        "color": "red",
        "label": "靦腆少年",
        "desc": "你只能執行分享顏色",
        "pair": RolePair.Coyboy,
        "src": "pic/role/red-coyboy.png"
    },
    {
        "key": "bluePapanoid",
        "role": "Papanoid",
        "color": "blue",
        "label": "妄想者",
        "desc": "五個回合內只能執行一次卡片分享",
        "pair": RolePair.Papanoid,
        "src": "pic/role/blue-papanoid.png"
    },
    {
        "key": "redPapanoid",
        "role": "Papanoid",
        "color": "red",
        "label": "妄想者",
        "desc": "五個回合內只能執行一次卡片分享",
        "pair": RolePair.Papanoid,
        "src": "pic/role/red-papanoid.png"
    }, {
        "key": "blueSpy",
        "role": "Spy",
        "color": "blue",
        "label": "藍隊間諜",
        "desc": "卡片顏色與隊伍相反",
        "pair": RolePair.Spy,
        "src": "pic/role/blue-spy.png"
    },
    {
        "key": "redSpy",
        "role": "Spy",
        "color": "red",
        "label": "紅隊間諜",
        "desc": "卡片顏色與隊伍相反",
        "pair": RolePair.Spy,
        "src": "pic/role/red-spy.png"
    },
    {
        "key": "blueUsurper",
        "role": "Usurper",
        "color": "blue",
        "label": "篡位者",
        "desc": "在前四回合中，室長篡位一次",
        "pair": RolePair.Usurper,
        "src": "pic/role/blue-usurper.png"
    },
    {
        "key": "redUsurper",
        "role": "Usurper",
        "color": "red",
        "label": "篡位者",
        "desc": "在前四回合中，室長篡位一次",
        "pair": RolePair.Usurper,
        "src": "pic/role/red-usurper.png"
    },
    {
        "key": "blueSecurity",
        "role": "Security",
        "color": "blue",
        "label": "保安",
        "desc": "可以扣留一名房間成員不作為人質",
        "pair": RolePair.Security,
        "src": "pic/role/blue-security.png"
    },
    {
        "key": "redSecurity",
        "role": "Security",
        "color": "red",
        "label": "保安",
        "desc": "可以扣留一名房間成員不作為人質",
        "pair": RolePair.Security,
        "src": "pic/role/red-security.png"
    },
    {
        "key": "blueEris",
        "role": "Eris",
        "color": "blue",
        "label": "紛爭女神厄里斯",
        "desc": "你可以使任兩名玩家進入相愛狀態",
        "pair": RolePair.ErisCupid,
        "src": "pic/role/blue-eris.png"
    },
    {
        "key": "redCupid",
        "role": "Cupid",
        "color": "red",
        "label": "愛神丘比特",
        "desc": "你可以使任兩名玩家進入相恨狀態",
        "pair": RolePair.ErisCupid,
        "src": "pic/role/red-cupid.png"
    },
    {
        "key": "greyRival",
        "role": "Rival",
        "color": "grey",
        "label": "競爭者",
        "desc": "最後與總統在不同房間",
        "pair": RolePair.RivalIntern,
        "src": "pic/role/grey-rival.png"
    },
    {
        "key": "greyIntern",
        "role": "Intern",
        "color": "grey",
        "label": "實習生",
        "desc": "最後與總統在同個房間",
        "pair": RolePair.RivalIntern,
        "src": "pic/role/grey-intern.png"
    },
    {
        "key": "greyButler",
        "role": "Butler",
        "color": "grey",
        "label": "管家",
        "desc": "最後與女僕和總統在同一個房間",
        "pair": RolePair.ButlerMaid,
        "src": "pic/role/grey-butler.png"
    },
    {
        "key": "greyMaid",
        "role": "Maid",
        "color": "grey",
        "label": "女僕",
        "desc": "最後與管家和總統在同一個房間",
        "pair": RolePair.ButlerMaid,
        "src": "pic/role/grey-maid.png"
    },
    {
        "key": "greyWife",
        "role": "Wife",
        "color": "grey",
        "label": "妻子",
        "desc": "最後和總統待在一起，避開情婦",
        "pair": RolePair.WifeMistress,
        "src": "pic/role/grey-wife.png"
    },
    {
        "key": "greyMistress",
        "role": "Mistress",
        "color": "grey",
        "label": "情婦",
        "desc": "最後和總統待在一起，避開妻子",
        "pair": RolePair.WifeMistress,
        "src": "pic/role/grey-mistress.png"
    },
    {
        "key": "greySurvivor",
        "role": "Survivor",
        "color": "grey",
        "label": "倖存者",
        "desc": "最後與炸彈客在不同房間",
        "pair": RolePair.SurvivorVictim,
        "src": "pic/role/grey-survivor.png"
    },
    {
        "key": "greyVictim",
        "role": "Victim",
        "color": "grey",
        "label": "受害者",
        "desc": "最後與炸彈客在同個房間",
        "pair": RolePair.SurvivorVictim,
        "src": "pic/role/grey-victim.png"
    },
    {
        "key": "greyRomeo",
        "role": "Romeo",
        "color": "grey",
        "label": "羅密歐",
        "desc": "最後與茱麗葉和炸彈客在同一個房間",
        "pair": RolePair.RomeoJuliet,
        "src": "pic/role/grey-romeo.png"
    },
    {
        "key": "greyJuliet",
        "role": "Juliet",
        "color": "grey",
        "label": "茱麗葉",
        "desc": "最後與羅密歐和炸彈客在同一個房間",
        "pair": RolePair.RomeoJuliet,
        "src": "pic/role/grey-juliet.png"
    },
    {
        "key": "greyAhab",
        "role": "Ahab",
        "color": "grey",
        "label": "亞哈",
        "desc": "最後同時避開莫比與炸彈客",
        "pair": RolePair.AhabMoby,
        "src": "pic/role/grey-ahab.png"
    },
    {
        "key": "greyMoby",
        "role": "Moby",
        "color": "grey",
        "label": "莫比",
        "desc": "最後同時避開亞哈與炸彈客",
        "pair": RolePair.AhabMoby,
        "src": "pic/role/grey-moby.png"
    },

    {
        "key": "greyBomb-Bot",
        "role": "Bomb-Bot",
        "color": "grey",
        "label": "拆彈機器人",
        "desc": "最後和炸彈客待在一起，避開總統",
        "pair": RolePair.BombBotQueen,
        "src": "pic/role/grey-bomb-bot.png"
    },
    {
        "key": "greyQueen",
        "role": "Queen",
        "color": "grey",
        "label": "皇后",
        "desc": "最後同時避開總統與炸彈客",
        "pair": RolePair.BombBotQueen,
        "src": "pic/role/grey-queen.png"
    },
    {
        "key": "greyDecoy",
        "role": "Decoy",
        "color": "grey",
        "label": "誘餌",
        "desc": "被狙擊手打中",
        "pair": RolePair.DecoyTargetSniper,
        "src": "pic/role/grey-decoy.png"
    },
    {
        "key": "greyTarget",
        "role": "Target",
        "color": "grey",
        "label": "目標",
        "desc": "不要被狙擊手打中",
        "pair": RolePair.DecoyTargetSniper,
        "src": "pic/role/grey-target.png"
    },
    {
        "key": "greySniper",
        "role": "Sniper",
        "color": "grey",
        "label": "狙擊手",
        "desc": "打中目標",
        "pair": RolePair.DecoyTargetSniper,
        "src": "pic/role/grey-sniper.png"
    },
    {
        "key": "greyGambler",
        "role": "Gambler",
        "color": "grey",
        "label": "賭徒",
        "desc": "公開預判哪個顏色獲勝",
        "pair": RolePair.Gambler,
        "src": "pic/role/grey-gambler.png"
    },
    {
        "key": "blueAngel",
        "role": "Angel",
        "color": "blue",
        "label": "天使",
        "desc": "只能講真話",
        "pair": RolePair.Angel,
        "src": "pic/role/blue-angel.png"
    },
    {
        "key": "redAngel",
        "role": "Angel",
        "color": "red",
        "label": "天使",
        "desc": "只能講真話",
        "pair": RolePair.Angel,
        "src": "pic/role/red-angel.png"
    },
    {
        "key": "blueDemon",
        "role": "Demon",
        "color": "blue",
        "label": "惡魔",
        "desc": "撒謊",
        "pair": RolePair.Demon,
        "src": "pic/role/blue-demon.png"
    },
    {
        "key": "redDemon",
        "role": "Demon",
        "color": "red",
        "label": "惡魔",
        "desc": "撒謊",
        "pair": RolePair.Demon,
        "src": "pic/role/red-demon.png"
    },
    {
        "key": "blueClown",
        "role": "Clown",
        "color": "blue",
        "label": "啞劇小丑",
        "desc": "永遠不能說話",
        "pair": RolePair.Mime,
        "src": "pic/role/blue-mime.png"
    },
    {
        "key": "redMime",
        "role": "Mime",
        "color": "red",
        "label": "啞劇小丑",
        "desc": "永遠不能說話",
        "pair": RolePair.Mime,
        "src": "pic/role/red-mime.png"
    },
    {
        "key": "blueConman",
        "role": "Conman",
        "color": "blue",
        "label": "騙子",
        "desc": "顏色分享變成卡片分享",
        "pair": RolePair.Conman,
        "src": "pic/role/blue-conman.png"
    },
    {
        "key": "redConman",
        "role": "Conman",
        "color": "red",
        "label": "騙子",
        "desc": "顏色分享變成卡片分享",
        "pair": RolePair.Conman,
        "src": "pic/role/red-conman.png"
    },
    {
        "key": "blueMummy",
        "role": "Mummy",
        "color": "blue",
        "label": "木乃伊",
        "desc": "和你交換卡片的人都成為啞劇小丑",
        "pair": RolePair.Mummy,
        "src": "pic/role/blue-mummy.png"
    },
    {
        "key": "redMummy",
        "role": "Mummy",
        "color": "red",
        "label": "木乃伊",
        "desc": "和你交換卡片的人都成為啞劇小丑",
        "pair": RolePair.Mummy,
        "src": "pic/role/red-mummy.png"
    },
    {
        "key": "blueNegotiator",
        "role": "Negotiator",
        "color": "blue",
        "label": "談判專家",
        "desc": "只能進行卡片分享，不能進行顏色分享",
        "pair": RolePair.Negotiator,
        "src": "pic/role/blue-negotiator.png"
    },
    {
        "key": "redNegotiator",
        "role": "Negotiator",
        "color": "red",
        "label": "談判專家",
        "desc": "只能進行卡片分享，不能進行顏色分享",
        "pair": RolePair.Negotiator,
        "src": "pic/role/red-negotiator.png"
    },
    {
        "key": "drunk",
        "role": "Drunk",
        "color": "purple",
        "label": "醉鬼",
        "desc": "最後一回合清醒過來",
        "pair": RolePair.Drunk,
        "src": "pic/role/purple-drunk.png"
    },
    {
        "key": "zombie",
        "role": "Zombie",
        "color": "green",
        "label": "殭屍",
        "desc": "想辦法把所有人變成殭屍",
        "pair": RolePair.Zombie,
        "src": "pic/role/green-zombie.png"
    }
]
