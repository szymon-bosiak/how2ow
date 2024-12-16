import { useEffect, useState } from "react"
import "./home.css"
import link from "../../assets/icons/link_icon.svg"
import { Link } from "react-router-dom"

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInside, setIsMouseInside] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

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

  useEffect(() => {
    const updateAssest = () => {
      const width = window.innerWidth
      if (width <= 1000) {
        setIsDesktop(false)
      } else {
        setIsDesktop(true)
      }
    }

    updateAssest()

    window.addEventListener("resize", updateAssest)

    return () => {
      window.removeEventListener("resize", updateAssest)
    }
  })

  return (
    <div
      className="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="home_container">
        {isDesktop ? (
          <>
            {heroes.map((hero, index) => (
              <img
                key={index}
                src={hero.url}
                alt={hero.name}
                className="home_container-img"
                style={{
                  transform: isMouseInside
                    ? `translate3d(${mousePosition.x * hero.depth * 200}px, ${
                        mousePosition.y * hero.depth * 200
                      }px, 0px)`
                    : "translate3d(0px, 0px, 0px)",
                }}
              />
            ))}
          </>
        ) : (
          ""
        )}

        <header className="home_container-header">
          <h2>Welcome to</h2>
          <img
            className="home_container-header-img"
            src="https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt12c582d9d58631b9/6504c4b7af4949338d926e6c/Masthead_Overwatch2_Logo.png?format=webply&quality=90"
            alt="Overwatch 2"
          />
          <h2>guide</h2>
          <div className="home_container-button-group">
            <button className="home_container-button primary">
              <a
                href="https://overwatch.blizzard.com/en-us/news/patch-notes/"
                target="blank"
                className="home_container-button-link"
              >
                {" "}
                Patch Notes{" "}
                <img
                  className="home_container-link-img"
                  src={link}
                  alt="link"
                />
              </a>
            </button>

            <button className="home_container-button secondary">
              <Link to="/skins" className="home_container-button-link">
                Browse Skins
              </Link>
            </button>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Home
