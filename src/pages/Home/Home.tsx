import { useState } from "react"
import "./home.css"

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInside, setIsMouseInside] = useState(false)

  const assets = {
    lg: {
      all: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt10ca78298ef6edf0/660c5d270b9c8248765adc18/Desktop_Outro_Characters.png?format=webply&quality=90",
      background:
        "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt0783c76a58bd39e2/660c5cce39a9b3d622f86c68/Desktop_Outro_Sky.jpg?format=webply&quality=90",
    },
    sm: {
      universal:
        "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt29fc116531f1acaa/660c5c8d022c72028b87ff42/960_Outro.jpg?format=webply&quality=90",
    },
  }

  const heroes = [
    {
      name: "Lucio",
      url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt24bd0c583f02e676/660c5e6339a9b3a823f86c6c/Lucio.png?format=webply&quality=90",
      depth: 0.05,
    },
    {
      name: "Mercy",
      url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt50b24d1663ede72d/660c5ea2940fef074481def0/Edited_Mercy.png?format=webply&quality=90",
      depth: 0.07,
    },
    {
      name: "Reinhardt",
      url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/bltdf9dece108257e84/660c5ed039a9b3cb99f86c70/Reinhardt.png?format=webply&quality=90",
      depth: 0.15,
    },
    {
      name: "Mei",
      url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt0e09c46a0eba2025/660c5f0e194871210a5d1ce1/Mei_Without_Ice_Blast.png?format=webply&quality=90",
      depth: 0.19,
    },
    {
      name: "Tracer",
      url: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/bltf38ff705499bfd25/660c5f692c8f66429a8483e2/Tracer.png?format=webply&quality=90",
      depth: 0.25,
    },
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5 // X and Y position normalized (-0.5 to 0.5)
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
    setIsMouseInside(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInside(false)
  }

  return (
    <div
      className="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="home_container">
        {heroes.map((hero, index) => (
          <img
            key={index}
            src={hero.url}
            alt={hero.name}
            style={{
              transform: isMouseInside
                ? `translate3d(${mousePosition.x * hero.depth * 200}px, ${
                    mousePosition.y * hero.depth * 200
                  }px, 0px)`
                : "translate3d(0px, 0px, 0px)",
              transition: isMouseInside ? "none" : "transform 0.6s ease-out",
            }}
          />
        ))}
        <header className="home_container-header">
          <h2>The future is worth fighting for. Join us!</h2>
          <div className="home_container-button-group">
            <button
              className="home_container-primary-button"
              onClick={() => alert("Play Now clicked!")}
            >
              Play Now
            </button>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Home
