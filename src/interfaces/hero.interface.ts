export interface Hero {
  key: string
  name: string
  portrait: string
  role: string
}

export interface HeroWithTier extends Hero {
  tier: string
}
