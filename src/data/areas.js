import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get("window")
export default [

    // Area 1
    {
        backgroundArea: require("../Imagens/adventure/area1background1.png"),
        backgroundBattle: require("../Imagens/adventure/area1background2.png"),
        icon: require("../Imagens/adventure/faseIcon1.png"),
        iconPositions: [
            { top: height*0.35, right: -200 },
            { top: height*-0.2, right: 60 },
            { top: height* -0.63, right: -30 },
        ],
        enemyPositions: [
            { top: height * -0.01, right: 45 },
            { top: height * 0.2, right: -50 },
            { top: 200, right: 150 },
        ],
        tempoDecrescido: 0,
        fases: [
            {
                enemies: [
                    {
                        vida: 1,
                        dano: 1,
                        imagem: require('../Imagens/adventure/minion1.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 1,
                        dano: 1,
                        imagem: require('../Imagens/adventure/minion1.png')
                    },
                    {
                        vida: 1,
                        dano: 1,
                        imagem: require('../Imagens/adventure/minion1.png')
                    },
                    {
                        vida: 1,
                        dano: 1,
                        imagem: require('../Imagens/adventure/minion1.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 10,
                        dano: 5,
                        imagem: require('../Imagens/adventure/boss1.png')
                    }
                ]
            },
        ]
    },

    // Area 2
    {
        backgroundArea: require("../Imagens/adventure/area2background1.png"),
        backgroundBattle: require("../Imagens/adventure/area2background2.png"),
        icon: require("../Imagens/adventure/faseIcon2.png"),
        iconPositions: [
            { top: height*0.35, right: -200 },
            { top: -70, right: 0 },
            { top: height*-0.5, right: -190 },
        ],
        enemyPositions: [
            { top: height*0.05, right: 45 },
            { top: height *0.2, right: -50 },
            { top: 200, right: 150 },
        ],
        tempoDecrescido: 5,
        fases: [
            {
                enemies: [
                    {
                        vida: 3,
                        dano: 3,
                        imagem: require('../Imagens/adventure/minion2.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 3,
                        dano: 3,
                        imagem: require('../Imagens/adventure/minion2.png')
                    },
                    {
                        vida: 3,
                        dano: 3,
                        imagem: require('../Imagens/adventure/minion2.png')
                    },
                    {
                        vida: 3,
                        dano: 3,
                        imagem: require('../Imagens/adventure/minion2.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 20,
                        dano: 8,
                        imagem: require('../Imagens/adventure/boss2.png')
                    }
                ]
            }
        ]
    },

    // Area 3
    {
        backgroundArea: require("../Imagens/adventure/area3background1.png"),
        backgroundBattle: require("../Imagens/adventure/area3background2.png"),
        icon: require("../Imagens/adventure/faseIcon3.png"),
        iconPositions: [
            { top: height*0.4, right: -190 },
            { top: -70, right: -190 },
            { top: height*-0.55, right: 10 },
        ],
        enemyPositions: [
            { top: height*0.2, right: 45 },
            { top: height*0.3, right: -50 },
            { top: height*0.3, right: 150 },
        ],
        tempoDecrescido: 10,
        fases: [
            {
                enemies: [
                    {
                        vida: 5,
                        dano: 5,
                        imagem: require('../Imagens/adventure/minion3.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 5,
                        dano: 5,
                        imagem: require('../Imagens/adventure/minion3.png')
                    },
                    {
                        vida: 5,
                        dano: 5,
                        imagem: require('../Imagens/adventure/minion3.png')
                    },
                    {
                        vida: 5,
                        dano: 5,
                        imagem: require('../Imagens/adventure/minion3.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 24,
                        dano: 10,
                        imagem: require('../Imagens/adventure/boss3.png')
                    }
                ]
            }
        ]
    },

    // Area 4
    {
        backgroundArea: require("../Imagens/adventure/area4background1.png"),
        backgroundBattle: require("../Imagens/adventure/area4background2.png"),
        icon: require("../Imagens/adventure/faseIcon4.png"),
        iconPositions: [
            { top: height*0.4, right: -220 },
            { top: -50, right: 25 },
            { top: height*-0.5, right: -40 },
        ],
        enemyPositions: [
            { top: height >= 700? height*0.3: height*0.1, right: 45 },
            { top: height >= 700?height*0.4: height*0.2, right: -50 },
            { top: height >= 700?height*0.4: height*0.2, right: 150 },
        ],
        tempoDecrescido: 15,
        fases: [
            {
                enemies: [
                    {
                        vida: 8,
                        dano: 6,
                        imagem: require('../Imagens/adventure/minion4.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 8,
                        dano: 6,
                        imagem: require('../Imagens/adventure/minion4.png')
                    },
                    {
                        vida: 8,
                        dano: 6,
                        imagem: require('../Imagens/adventure/minion4.png')
                    },
                    {
                        vida: 8,
                        dano: 6,
                        imagem: require('../Imagens/adventure/minion4.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 35,
                        dano: 12,
                        imagem: require('../Imagens/adventure/boss4.png')
                    }
                ]
            }
        ]
    },

    // Area 5
    {
        backgroundArea: require("../Imagens/adventure/area5background1.png"),
        backgroundBattle: require("../Imagens/adventure/area5background2.png"),
        icon: require("../Imagens/adventure/faseIcon5.png"),
        iconPositions: [
            { top: height*0.35, right: 10 },
            { top: 0, right: -180 },
            { top: height*-0.4, right: 0 },
        ],
        enemyPositions: [
            { top: height*0.1, right: 45 },
            { top: height*0.2, right: -50 },
            { top: height*0.25, right: 150 },
        ],
        tempoDecrescido: 20,
        fases: [
            {
                enemies: [
                    {
                        vida: 10,
                        dano: 8,
                        imagem: require('../Imagens/adventure/minion5.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 10,
                        dano: 8,
                        imagem: require('../Imagens/adventure/minion5.png')
                    },
                    {
                        vida: 10,
                        dano: 8,
                        imagem: require('../Imagens/adventure/minion5.png')
                    },
                    {
                        vida: 10,
                        dano: 8,
                        imagem: require('../Imagens/adventure/minion5.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 50,
                        dano: 16,
                        imagem: require('../Imagens/adventure/boss5.png')
                    }
                ]
            }
        ]
    },

    // Area 6
    {
        backgroundArea: require("../Imagens/adventure/area6background2.png"),
        backgroundBattle: require("../Imagens/adventure/area6background1.png"),
        icon: require("../Imagens/adventure/faseIcon6.png"),
        iconPositions: [
            { top: height*0.45, right: -200 },
            { top: 100, right: 0 },
            { top: height*-0.25, right: -140 },
        ],
        enemyPositions: [
            { top: height*0.1, right: 45 },
            { top: height*0.2, right: -70 },
            { top: height*0.25, right: 170 },
        ],
        tempoDecrescido: 25,
        fases: [
            {
                enemies: [
                    {
                        vida: 15,
                        dano: 10,
                        imagem: require('../Imagens/adventure/minion6.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 15,
                        dano: 10,
                        imagem: require('../Imagens/adventure/minion6.png')
                    },
                    {
                        vida: 15,
                        dano: 10,
                        imagem: require('../Imagens/adventure/minion6.png')
                    },
                    {
                        vida: 15,
                        dano: 10,
                        imagem: require('../Imagens/adventure/minion6.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 70,
                        dano: 20,
                        imagem: require('../Imagens/adventure/boss6.png')
                    }
                ]
            }
        ]
    },

    // Area 7
    {
        backgroundArea: require("../Imagens/adventure/area7background1.png"),
        backgroundBattle: require("../Imagens/adventure/area7background2.png"),
        icon: require("../Imagens/adventure/faseIcon7.png"),
        iconPositions: [
            { top: height*0.45, right: 20 },
            { top: 10, right: -240 },
            { top: height*-0.35, right: -80 }
        ],
        enemyPositions: [
            { top: height>= 700?height*0.2:height*0.1, right: 45 },
            { top: height>= 700?height*0.3:height*0.2, right: -70 },
            { top: height>= 700?height*0.35:height*0.25, right: 170 },
        ],
        tempoDecrescido: 30,
        fases: [
            {
                enemies: [
                    {
                        vida: 20,
                        dano: 15,
                        imagem: require('../Imagens/adventure/minion7.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 20,
                        dano: 15,
                        imagem: require('../Imagens/adventure/minion7.png')
                    },
                    {
                        vida: 20,
                        dano: 15,
                        imagem: require('../Imagens/adventure/minion7.png')
                    },
                    {
                        vida: 20,
                        dano: 15,
                        imagem: require('../Imagens/adventure/minion7.png')
                    }
                ]
            },
            {
                enemies: [
                    {
                        vida: 100,
                        dano: 28,
                        imagem: require('../Imagens/adventure/boss7.png')
                    }
                ]
            }
        ]
    }

]
