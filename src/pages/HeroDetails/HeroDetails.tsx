import { useParams } from "react-router-dom"
import { SetStateAction, useEffect, useState } from "react"
import axios from "axios"
import "./heroDetails.css"
import { HeroDesc } from "../../interfaces/heroDesc.interface"
import support from "../../assets/support.svg"
import damage from "../../assets/damage.svg"
import tank from "../../assets/tank.svg"
import location from "../../assets/location.svg"
import birthday from "../../assets/birthday.svg"

const data: Record<
  string,
  { thumbnail: { sm: string; md: string; lg: string } }
> = {
  ana: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2…4cd5568be8e4/631a8bab1566e20e82f3028c/960_Ana.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt97ec60cf959e81f3/631a8babe337fa0dc7263beb/1600_Ana.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt76ab9c7b4d291756/631a8bab636d390da7825df5/2600_Ana.jpg",
    },
  },
  ashe: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt173466454e650e25/631a8ba085af980dae7a2ef6/960_Ashe.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt83273c22d0b94966/631a8ba0636d390da7825df1/1600_Ashe.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt3fc10a3baca12db5/631a8ba0a633280e74dc25cd/2600_Ashe.jpg",
    },
  },
  baptiste: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blta1f7e2dac43adcd6/631a8b99636d390da7825ded/960_Baptiste.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt7409943072f0d44c/631a8b99f581050de0035dfa/1600_Baptiste.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt5ef4dacade9780da/631a8b99e337fa0dc7263be7/2600_Baptiste.jpg",
    },
  },
  bastion: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte23b91958a7479bf/631a8b92251b540e0aea78ac/960_Bastion.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltcd0d5eb4b44d35f1/631a8b92e7bdcf0dd996c8e5/1600_Bastion.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltac77c0e793cedb9d/631a8b923ab6f40dd2a906b1/2600_Bastion.jpg",
    },
  },
  brigitte: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltdfffd38a34aa21c6/631a8b7f3ab6f40dd2a906ad/960_Brigitte.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf362dee5d41929be/631a8b7feef3ae0e03c743b6/1600_Brigitte.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt985b7156ca9b6e62/631a8b7f5f39a30d9cedbacc/2600_Brigitte.jpg",
    },
  },
  cassidy: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltadb0bb2e726bee08/631a8b79be2fcf0db5eea4c8/960_Cassidy.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt242e79efb1e27251/631a8b791566e20e82f30288/1600_Cassidy.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt4bb4c31f6849c25b/631a8b781613910e6926bfd4/2600_Cassidy.jpg",
    },
  },
  dva: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt263fecc338db9cc3/631a8b650e1b4f0e7b89a534/960_Dva.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf8e9415141b0ec36/631a8b65e7bdcf0dd996c8e1/1600_Dva.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltcd4bcf30a5794639/631a8b65f581050de0035df6/2600_Dva.jpg",
    },
  },
  doomfist: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte260937b4372f79d/631a8b6beef3ae0e03c743b2/960_Doomfist.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt3f24de1ac73c318b/631a8b6ba633280e74dc25c9/1600_Doomfist.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blteaa58e824d1fc399/631a8b6b0e1b4f0e7b89a538/2600_Doomfist.jpg",
    },
  },
  echo: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt49673b3031ff12a8/631a98f5636d390da7825df9/960_Echo.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt5f4efcfb6dd8d23a/631a98f5f581050de0035e00/1600_Echo.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt6a6dc9da49d17b95/631a8b5feef3ae0e03c743ae/2600_Echo.jpg",
    },
  },
  genji: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt662cec43713c06e7/631a8b57a0ff920e11e791c0/960_Genji.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt22836a6cfd1c3335/631a8b576d5f7a0df8d92798/1600_Genji.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltb6d5cb702c3e2476/631a8b57e7bdcf0dd996c8dd/2600_Genji.jpg",
    },
  },
  hanzo: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltc0d234821924210d/631a8b503ab6f40dd2a906a9/960_Hanzo.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt94cbaa8364b60dc7/631a8b50eef3ae0e03c743aa/1600_Hanzo.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt6ea101bee04bc99e/631a8b505f39a30d9cedbac8/2600_Hanzo.jpg",
    },
  },
  illari: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt025e154d24282801/64c03bd5b73a2ac1729ef62a/960_Illari.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt37638ea14bd0c85f/64c03bd64d4d9e27e4296283/1600_Illari.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt9562c18014520536/64c03bd68365f5881905c8b4/2600_Illari.jpg",
    },
  },
  "junker-queen": {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt9f8bc17eedec0bcd/631a8b49636d390da7825de9/960_Junker_Queen.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt7621ddcf8e25d478/631a8b49be2fcf0db5eea4c4/1600_Junker_Queen.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt3a1be33596e910c4/631a8b49a0ff920e11e791bc/2600_Junker_Queen.jpg",
    },
  },
  junkrat: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt63b2615b5000de03/631a8b43eef3ae0e03c743a6/960_Junkrat.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf1d3568684bc383f/631a8b430e1b4f0e7b89a530/1600_Junkrat.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt413418f41eeb64fd/631a8b4385af980dae7a2ef2/2600_Junkrat.jpg",
    },
  },
  juno: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt7e4477830e3fd772/668db075c02e3c1d615743f7/960_Juno_v2.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte81ec81f23dbb109/668daea468915426bc7774a7/1600_Juno.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltbc59ec946d1bfeaa/668dae9d839db28999d3657d/2600_Juno.jpg",
    },
  },
  kiriko: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltdc3f2925ed4c0f75/631a8b34e7bdcf0dd996c8d9/960_Kiriko.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt74033e83230dc856/631a8b34f581050de0035df2/1600_Kiriko.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt09d0b0474ed8053b/631a8b345f39a30d9cedbac4/2600_Kiriko.jpg",
    },
  },
  lifeweaver: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte81e6a0bdf89e1b5/641243e43df55e65c02aa4ff/960_Lifeweaver.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt94961e7349cf1d7c/641243e4b624bd69a0f705ae/1600_Lifeweaver.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltec463c7444135f68/641243e41839f965bff26773/2600_Lifeweaver.jpg",
    },
  },
  lucio: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf8492e5a8bdf6506/631a8b2b636d390da7825de3/960_Lucio.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt77c5cddf632a67d7/631a8b2bf581050de0035dee/1600_Lucio.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt1193d24377ff3b38/631a8b2b1613910e6926bfd0/2600_Lucio.jpg",
    },
  },
  mauga: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltea0399f52dd896e8/654d7cf1a4897a72b5fe9e5f/960_Mauga.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt52d14924e3880c39/654d7d2d02f5a2701444f840/1600_Mauga.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt5449cd196343e5cc/654d7d436864f761cb9116fc/2600_Mauga.jpg",
    },
  },
  mei: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt1c1f2c3b841d26d9/633773a6e3c2a2741688cb8d/960_Mei_02.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltd0eb5529be69efbc/633773a6f87c00687e8ef21a/1600_Mei_02.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt1040e5bd61b0ba3a/633773a61ccd046877c0e4db/2600_Mei_02.jpg",
    },
  },
  mercy: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf9b8b0fcedec1140/631a8b1ee337fa0dc7263be3/960_Mercy.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blta556d4020266a6db/631a8b1eeef3ae0e03c743a2/1600_Mercy.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltc7021b63955d7b54/631a8b1e3ab6f40dd2a906a5/2600_Mercy.jpg",
    },
  },
  moira: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt23efc7fdd3e6d665/631a8b17636d390da7825ddf/960_Moira.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt8188c6691a334d73/631a8b17be2fcf0db5eea4bc/1600_Moira.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt0556ab9582933672/631a8b176d5f7a0df8d92794/2600_Moira.jpg",
    },
  },
  orisa: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf59086751daa9e60/631a8b0bbe2fcf0db5eea4b8/960_Orisa.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt24fd76394a4111f7/631a8b0ba633280e74dc25c5/1600_Orisa.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt2a3558a604095f57/631a8b0b0e1b4f0e7b89a52c/2600_Orisa.jpg",
    },
  },
  pharah: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte946dafed9d03733/631a8af2a633280e74dc25bd/960_Pharah.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte7cef1a9a6df49eb/631a8af2a0ff920e11e791b8/1600_Pharah.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltae2251cef8936b19/631a8af2636d390da7825dd7/2600_Pharah.jpg",
    },
  },
  ramattra: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf07c6a3a672c8580/637da2d0bbfd340e8ad2e310/960_Ramattra.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt7cedd97f624c058d/637da2d146a48b0e063e4aad/1600_Ramattra.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt3ea4802af2023c58/637da2d1d44c1b0e1f0e8bc0/2600_Ramattra.jpg",
    },
  },
  reaper: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltb40d1a0523b8c7be/631a8af9f581050de0035dea/960_Reaper.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt2c301b09e7e28f15/631a8af9e7bdcf0dd996c8d1/1600_Reaper.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt205f5d2e64729af4/631a8af90e1b4f0e7b89a528/2600_Reaper.jpg",
    },
  },
  reinhardt: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltd56f6208dd1b6903/631a8b031613910e6926bfcc/960_Reinhardt.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt8215ad99f856a606/631a8b03636d390da7825ddb/1600_Reinhardt.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltbbe906442602f70b/631a8b03a633280e74dc25c1/2600_Reinhardt.jpg",
    },
  },
  roadhog: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt7db55f62dcd18e20/631a8ae55f39a30d9cedbaba/960_Roadhog.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt39930f17f179a7bd/631a8ae5eef3ae0e03c7439e/1600_Roadhog.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt53bec63947a5bd1f/631a8ae585af980dae7a2eee/2600_Roadhog.jpg",
    },
  },
  sigma: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt3c29d0c0b1288686/631a8adb1566e20e82f30284/960_Sigma.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt429c1784d8b446a4/631a8adbf581050de0035de6/1600_Sigma.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltcd6803238893c4ee/631a8adb6d5f7a0df8d92790/2600_Sigma.jpg",
    },
  },
  sojourn: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt9ea7d16534d358bb/631a8ad33ab6f40dd2a906a1/960_Sojourn.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt4e7eea062ae71ec8/631a8ad36d5f7a0df8d9278c/1600_Sojourn.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt074d60a0c1b22e57/631a8ad3a633280e74dc25b9/2600_Sojourn.jpg",
    },
  },
  "soldier-76": {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blta1a1abfb07e6e62a/631a8ac9e337fa0dc7263bdf/960_Soldier_76.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltaa73ebe257f75710/631a8ac985af980dae7a2eea/1600_Soldier_76.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt1fdfbf1c51e0c05d/631a8ac9a0ff920e11e791b4/2600_Soldier_76.jpg",
    },
  },
  sombra: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt06507cbf45c4f3e6/631a8ac16d5f7a0df8d92788/960_Sombra.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt73c08ba684761b8a/631a8ac1f581050de0035de2/1600_Sombra.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt668912e757ec1b56/631a8ac11566e20e82f30280/2600_Sombra.jpg",
    },
  },
  symmetra: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltb5b0588bd3ff325a/631a8ab93ab6f40dd2a9069d/960_Symmetra.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt8bcd4a477c648ec3/631a8ab9a0ff920e11e791b0/1600_Symmetra.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt98ba3e34b8d7c3c7/631a8ab9636d390da7825dd3/2600_Symmetra.jpg",
    },
  },
  torbjorn: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt17918bfe68f54687/631a8ab1636d390da7825dcf/960_Torbjorn.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt8af1bdb781ba7048/631a8ab1eef3ae0e03c7439a/1600_Torbjorn.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt6704d0e1812cb068/631a8ab1a0ff920e11e791ac/2600_Torbjorn.jpg",
    },
  },
  tracer: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt83c088dfb1a3ef00/631a8aab0e1b4f0e7b89a524/960_Tracer.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltb9e273d8483050b8/631a8aab3ab6f40dd2a90699/1600_Tracer.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt9a87fc6f2249d9c8/631a8aaba633280e74dc25b5/2600_Tracer.jpg",
    },
  },
  venture: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltc4f331704d90ef3c/65e7a1207a7fb4e370804d18/960_Venture.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltdf3ffc4ee1a1d6b1/65e7a113e38ce3428689fade/1600_Venture.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blte622280f74e18bd7/65e7a10b31e2488e2e63ae8e/2600_Venture.jpg",
    },
  },
  widowmaker: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt9cff21d35d3ad3ec/631a8a98e7bdcf0dd996c8cd/960_Widowmaker.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf1291f31fd38e28b/631a8a981613910e6926bfc8/1600_Widowmaker.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt86d1bcba4c0d4730/631a8a98eef3ae0e03c74392/2600_Widowmaker.jpg",
    },
  },
  winston: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt6482549151a3575a/631a8aa4a0ff920e11e791a8/960_Winston.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf9557fb8c51d1c43/631a8aa4eef3ae0e03c74396/1600_Winston.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltf6c81bc8f3db2ce9/631a8aa4636d390da7825dcb/2600_Winston.jpg",
    },
  },
  "wrecking-ball": {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltdfd1b674f6751714/631a8a69e7bdcf0dd996c8c5/960_Wrecking_Ball.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt55cca804cba3d52e/631a8a691566e20e82f30278/1600_Wrecking_Ball.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt3ca77f61db745988/631a8a691613910e6926bfc4/2600_Wrecking_Ball.jpg",
    },
  },
  zarya: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt260ef18603418d84/631a8a603ab6f40dd2a90695/960_Zarya.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltde66354cc09d1bb6/631a8a60be2fcf0db5eea4b4/1600_Zarya.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltb73df6ce7e29a4f4/631a8a606d5f7a0df8d92784/2600_Zarya.jpg",
    },
  },
  zenyatta: {
    thumbnail: {
      sm: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltcf559d3f2feb6c6e/631a8a5785af980dae7a2ee6/960_Zenyatta.jpg",
      md: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt31b9997e4476de74/631a8a57eef3ae0e03c7438a/1600_Zenyatta.jpg",
      lg: "https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltaed6928bd9793d05/631a8a573ab6f40dd2a90691/2600_Zenyatta.jpg",
    },
  },
}

function HeroDetails() {
  const { heroName } = useParams<{ heroName: string }>()
  const [hero, setHero] = useState<HeroDesc | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [thumbnail, setThumbnail] = useState<string>("")
  const [currentVideo, setCurrentVideo] = useState("")

  // Fetching hero data
  useEffect(() => {
    if (!heroName) {
      setError("Hero not found")
      setIsLoading(false)
      return
    }

    const fetchHero = async () => {
      try {
        const response = await axios.get<HeroDesc>(
          `https://overfast-api.tekrop.fr/heroes/${heroName}`
        )
        setHero(response.data)
        setCurrentVideo(response.data.abilities[0].video.link.webm)
        setCurrentAbilityDescription(response.data.abilities[0].description)
        setCurrentAbilityName(response.data.abilities[0].name)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHero()
  }, [heroName])

  // Reactive images
  const heroData = data[heroName!]
  const [activeAbilityIndex, setActiveAbilityIndex] = useState(0)
  const [currentAbilityDescription, setCurrentAbilityDescription] = useState("")
  const [currentAbilityName, setCurrentAbilityName] = useState("")

  useEffect(() => {
    const updateThumbnail = () => {
      const width = window.innerWidth
      if (width <= 960) {
        setThumbnail(heroData.thumbnail.sm)
      } else if (width <= 1600) {
        setThumbnail(heroData.thumbnail.md)
      } else {
        setThumbnail(heroData.thumbnail.lg)
      }
    }

    updateThumbnail()

    window.addEventListener("resize", updateThumbnail)

    return () => {
      window.removeEventListener("resize", updateThumbnail)
    }
  }, [heroData.thumbnail])

  const handleAbilityClick = (
    link: SetStateAction<string>,
    index: number,
    abilityName: string,
    abilityDescription: string,
  ) => {
    setActiveAbilityIndex(index)
    setCurrentVideo(link)
    setCurrentAbilityDescription(abilityDescription)
    setCurrentAbilityName(abilityName)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!hero) return <p>No hero found.</p>

  // Conditional icon
  type Role = "support" | "tank" | "damage"

  const role = hero.role
  const roleIcons: Record<Role, string> = {
    support,
    tank,
    damage,
  }

  // Abilities

  return (
    <div className="hero-details">
      {/* about */}
      <div
        className="hero-details_info"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <div className="hero-details_info-wraper">
          <div className="spacer"></div>
          <h2 className="hero-details_info-name">{hero.name}</h2>
          <p className="hero-details_info-desc">{hero.description}</p>

          <div className="hero-details_info-general">
            <div className="hero-details_info-general-point">
              <div className="hero-details_info-general-point-icon">
                <img src={roleIcons[role as Role]} alt="role icon" />
              </div>
              <p className="hero-details_info-general-point-role">{role}</p>
            </div>

            <div className="hero-details_info-general-point">
              <div className="hero-details_info-general-point-icon">
                <img src={location} alt="location icon" />
              </div>
              <p>{hero.location}</p>
            </div>

            <div className="hero-details_info-general-point">
              <div className="hero-details_info-general-point-icon">
                <img src={birthday} alt="birthday icon" />
              </div>

              <p>
                {hero.birthday} (Age: {hero.age})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* abilities */}
      <div className="hero-details_abilities">
        {/* Background video container */}

        <div className="hero-details_abilities-wrapper">
          <div className="hero-details_abilities-bg">
            <video
              key={currentVideo}
              autoPlay
              loop
              muted
              playsInline
              className="hero-details_abilities-bg-video"
            >
              {currentVideo && <source src={currentVideo} type="video/webm" />}
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="hero-details_abilities-content">
            <div className="hero-details_abilities-content-heading">
              <h2>Abilities</h2>
            </div>

            <div className="hero_details_abilities-content-outer">
              <div className="hero_details_abilities-content-ability-row">
                <div className="hero_details_abilities-content-ability">
                  {hero.abilities.map((ability, index) => (
                    <div
                      key={index}
                      className={`hero_details_abilities-content-ability-content ${
                        activeAbilityIndex === index
                          ? "hero_details_abilities-content-ability-content--active"
                          : ""
                      }`}
                      onClick={() =>
                        handleAbilityClick(
                          ability.video.link.webm,
                          index,
                          ability.name,
                          ability.description
                        )
                      }
                    >
                      <div
                        className={`hero_details_abilities-content-ability-icon ${
                          activeAbilityIndex === index
                            ? "hero_details_abilities-content-ability-icon--active"
                            : ""
                        }`}
                      >
                        <img src={ability.icon} alt={ability.name} />
                      </div>
                      <div className="hero_details_abilities-content-ability-name">
                        {ability.name}
                      </div>
                      {/* <div className="spacer"></div> */}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero_details_abilities-content-ability-spacer"></div>
              <p className="hero_details_abilities-content-ability-name--mobile">
                {currentAbilityName}
              </p>
              <p className="hero_details_abilities-content-ability-description">
                {currentAbilityDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroDetails
