import { Map } from "./map.interface"

export interface GameMode {
  key: string
  name: string
  icon: string
  description: string
  screenshot: string
}

export interface GameModeWithMaps {
  key: string
  name: string
  icon: string
  description: string
  screenshot: string
  map: Map[]
}
