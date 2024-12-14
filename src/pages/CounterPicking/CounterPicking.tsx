import "./counterPicking.css"

const localData: Record<string, { counteredBy: string[] }> = {
  ana: {
    counteredBy: ["winston", "ramattra", "echo", "pharah", "tracer", "kiriko"],
  },
  ashe: {
    counteredBy: [
      "zarya",
      "reinhardt",
      "genji",
      "tracer",
      "widowmaker",
      "ana",
      "kiriko",
    ],
  },
  baptiste: {
    counteredBy: ["winston", "dva", "cassidy", "ashe", "mei", "lucio"],
  },
  bastion: {
    counteredBy: [
      "zarya",
      "orisa",
      "junkrat",
      "pharah",
      "genji",
      "tracer",
      "ana",
    ],
  },
  brigitte: {
    counteredBy: ["reinhardt", "roadhog", "pharah", "echo", "junkrat"],
  },
  cassidy: {
    counteredBy: ["Reinhardt", "Winston", "Genji", "Cassidy", "Ana"],
  },
  dva: {
    counteredBy: [
      "zarya",
      "winston",
      "symmetra",
      "sojourn",
      "bastion",
      "moira",
      "brigitte",
    ],
  },
  doomfist: {
    counteredBy: [
      "orisa",
      "zarya",
      "sombra",
      "bastion",
      "cassidy",
      "tracer",
      "genji",
      "ana",
      "brigitte",
    ],
  },
  echo: {
    counteredBy: [
      "winston",
      "zarya",
      "ashe",
      "cassidy",
      "soldier-76",
      "widowmaker",
    ],
  },
  genji: {
    counteredBy: ["winston", "zarya", "symmetra", "mei", "moira", "ana"],
  },
  hanzo: {
    counteredBy: ["dva", "wrecking-ball", "widowmaker", "genji", "lucio"],
  },
  hazard: {
    counteredBy: [
      "reinhardt",
      "zarya",
      "sombra",
      "widowmaker",
      "hanzo",
      "soldier-76",
      "ana",
      "zenyatta",
    ],
  },
  illari: {
    counteredBy: [
      "orisa",
      "zarya",
      "dva",
      "cassidy",
      "ashe",
      "widowmaker",
      "baptiste",
      "lifeweaver",
      "lucio",
    ],
  },
  "junker-queen": {
    counteredBy: [
      "zarya",
      "wrecking-ball",
      "orisa",
      "widowmaker",
      "hanzo",
      "mei",
      "ashe",
      "soldier-76",
      "kiriko",
      "ana",
      "lucio",
    ],
  },
  junkrat: {
    counteredBy: [
      "zarya",
      "wrecking-ball",
      "cassidy",
      "soldier-76",
      "lucio",
      "brigitte",
      "lifeweaver",
    ],
  },
  juno: {
    counteredBy: [
      "dva",
      "winston",
      "reinhardt",
      "sombra",
      "soldier-76",
      "widowmaker",
      "lucio",
      "ana",
    ],
  },
  kiriko: {
    counteredBy: ["roadhog", "winston", "tracer", "sombra", "genji", "mei"],
  },
  lifeweaver: {
    counteredBy: ["roadhog", "dva", "sombra", "soldier-76", "lucio"],
  },
  lucio: {
    counteredBy: [
      "winston",
      "roadhog",
      "soldier-76",
      "cassidy",
      "symmetra",
      "torbjorn",
      "mei",
      "moira",
    ],
  },
  mauga: {
    counteredBy: [
      "wrecking-ball",
      "mauga",
      "doomfist",
      "orisa",
      "reaper",
      "mei",
      "sombra",
      "sojourn",
      "zenyatta",
      "kiriko",
    ],
  },
  mei: {
    counteredBy: ["dva", "sombra", "pharah", "echo", "kiriko"],
  },
  mercy: {
    counteredBy: [
      "winston",
      "roadhog",
      "echo",
      "cassidy",
      "widowmaker",
      "genji",
      "tracer",
    ],
  },
  moira: {
    counteredBy: [
      "roadhog",
      "zarya",
      "echo",
      "pharah",
      "widowmaker",
      "junkrat",
      "mei",
      "ashe",
      "ana",
    ],
  },
  orisa: {
    counteredBy: ["zarya", "dva", "mei", "bastion", "echo", "sojourn", "moira"],
  },
  pharah: {
    counteredBy: [
      "dva",
      "roadhog",
      "mauga",
      "soldier-76",
      "cassidy",
      "ashe",
      "widowmaker",
      "baptiste",
    ],
  },
  ramattra: {
    counteredBy: [
      "roadhog",
      "bastion",
      "mei",
      "reaper",
      "tracer",
      "genji",
      "cassidy",
      "sojourn",
      "pharah",
      "kiriko",
    ],
  },
  reaper: {
    counteredBy: ["zarya", "pharah", "echo", "junkrat", "widowmaker", "ana"],
  },
  reinhardt: {
    counteredBy: [
      "orisa",
      "ramattra",
      "wrecking-ball",
      "bastion",
      "pharah",
      "junkrat",
      "sobmra",
      "mei",
      "symmetra",
      "sojourn",
      "cassidy",
      "zenyatta",
    ],
  },
  roadhog: {
    counteredBy: [
      "orisa",
      "zarya",
      "wrecking-ball",
      "reaper",
      "sojourn",
      "cassidy",
      "ashe",
      "widowmaker",
      "echo",
      "ana",
    ],
  },
  sigma: {
    counteredBy: [
      "zarya",
      "ramattra",
      "roadhog",
      "mei",
      "symmetra",
      "tracer",
      "cassidy",
      "genji",
      "sombra",
      "lucio",
    ],
  },
  sojourn: {
    counteredBy: ["winston", "mauga", "genji", "tracer", "lucio"],
  },
  "soldier-76": {
    counteredBy: [
      "roadhog",
      "ashe",
      "cassidy",
      "genji",
      "junkrat",
      "ana",
      "lucio",
    ],
  },
  sombra: {
    counteredBy: [
      "widowmaker",
      "pharah",
      "junkrat",
      "hanzo",
      "mei",
      "kiriko",
      "ana",
    ],
  },
  symmetra: {
    counteredBy: ["winston", "mauga", "pharah", "junkrat", "echo"],
  },
  torbjorn: {
    counteredBy: ["dva", "junkrat", "ashe"],
  },
  tracer: {
    counteredBy: [
      "winston",
      "mauga",
      "symmetra",
      "torbjorn",
      "mei",
      "brigitte",
      "moira",
    ],
  },
  venture: {
    counteredBy: [
      "reinhardt",
      "sigma",
      "zarya",
      "dva",
      "pharah",
      "soldier-76",
      "mei",
      "ana",
    ],
  },
  widowmaker: {
    counteredBy: ["dva", "winston", "genji", "tracer", "sombra", "zenyatta"],
  },
  winston: {
    counteredBy: [
      "roadhog",
      "wrecking-ball",
      "dva",
      "junker-queen",
      "zarya",
      "junkrat",
      "bastion",
      "reaper",
      "torbjorn",
      "pharah",
      "ana",
      "brigitte",
    ],
  },
  "wrecking-ball": {
    counteredBy: [
      "roadhog",
      "doomfist",
      "mei",
      "bastion",
      "sombra",
      "tracer",
      "pharah",
      "cassidy",
      "ana",
      "brigitte",
    ],
  },
  zarya: {
    counteredBy: [
      "winston",
      "reinhardt",
      "zarya",
      "mei",
      "ashe",
      "cassidy",
      "hanzo",
      "tracer",
      "widowmaker",
      "soldier-76",
      "zenyatta",
    ],
  },
  zenyatta: {
    counteredBy: [
      "dva",
      "zarya",
      "junkrat",
      "pharah",
      "cassidy",
      "widowmaker",
      "ashe",
      "hanzo",
      "tracer",
      "kiriko",
      "zenyatta",
    ],
  },
}

function CounterPicking() {
  return <div></div>
}

export default CounterPicking
