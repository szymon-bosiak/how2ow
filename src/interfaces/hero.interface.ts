export interface Hero {
  key: string
  name: string
  portrait: string
  role: string
}

export interface HeroWithTier extends Hero {
  tier: string
}

export interface HeroWithCounter extends Hero {
  counteredBy: string[]
}
