export interface HeroDesc {
  name: string
  description: string
  portrait: string
  role: string
  location: string
  age: number
  birthday: string
  hitpoints: {
    health: number
    armor: number
    shields: number
    total: number
  }
  abilities: OverwatchAbility[]
  story: {
    summary: string
    media: {
      type: string
      link: string
    }
    chapters: OverwatchStoryChapter[]
  }
}

interface OverwatchAbility {
  name: string
  description: string
  icon: string
  video: {
    thumbnail: string
    link: {
      mp4: string
      webm: string
    }
  }
}

interface OverwatchStoryChapter {
  title: string
  content: string
  picture: string
}
