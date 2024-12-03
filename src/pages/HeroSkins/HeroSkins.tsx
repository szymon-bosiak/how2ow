import { useState, useEffect } from "react"
import "./heroSkins.css"
import { heroSkinsData } from "./heroSkinsData"

function HeroSkins() {
  const [data, setData] = useState<Record<string, { skins: Skin[] }> | null>(
    null
  )

  useEffect(() => {
    import("./heroSkinsData").then((module) => {
      setData(module.heroSkinsData)
    })
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div className="skins">
      {/* {heroSkinsData.ana.skins.map((skin, index) => (
        <div className="skin" key={skin.name}>
          {skin.name}
          <img src={skin.img} alt={skin.img} />
        </div>
      ))} */}
    </div>
  )
}

export default HeroSkins
