import axios from "axios"
import { useState, useEffect } from "react"
import { HeroWithCounter } from "../../interfaces/hero.interface"
import "./counterPicking.css"
import { counterPickingData } from "./counterPickingData"
import arrow from "../../assets/icons/arrow_white.svg"
import support from "../../assets/icons/support.svg"
import damage from "../../assets/icons/damage.svg"
import tank from "../../assets/icons/tank.svg"

function CounterPicking() {
  const [heroes, setHeroes] = useState<HeroWithCounter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeHero, setActiveHero] = useState<string | null>(null)
  const [columns, setColumns] = useState<HeroWithCounter[][]>([[]])

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get<HeroWithCounter[]>(
          "https://overfast-api.tekrop.fr/heroes"
        )

        // Combine API data with local data
        const updatedHeroes = response.data.map((hero) => ({
          ...hero,
          counteredBy: counterPickingData[hero.key]?.counteredBy,
        }))

        setHeroes(updatedHeroes)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroes()
  }, [])

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width <= 1000) {
        setColumns(splitIntoColumns(heroes, 1))
      } else if (width <= 2000) {
        setColumns(splitIntoColumns(heroes, 2))
      } else {
        setColumns(splitIntoColumns(heroes, 3))
      }
    }

    updateColumns()

    window.addEventListener("resize", updateColumns)

    return () => {
      window.removeEventListener("resize", updateColumns)
    }
  }, [heroes])

  const splitIntoColumns = (
    data: HeroWithCounter[],
    numColumns: number
  ): HeroWithCounter[][] => {
    const columns: HeroWithCounter[][] = Array.from(
      { length: numColumns },
      () => []
    )
    data.forEach((hero, index) => {
      columns[index % numColumns].push(hero)
    })
    return columns
  }

  if (isLoading) return <p className="counterPicking_wrapper">Loading...</p>
  if (error) return <p className="counterPicking_wrapper">Error: {error}</p>

  const toggleHero = (heroName: string) => {
    setActiveHero((prev) => (prev === heroName ? null : heroName))
  }

  return (
    <div className="counterPicking">
      <div className="counterPicking_container">
        <div className="counterPicking_wrapper">
          <div className="counterPicking_columns">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="counterPicking_column">
                <ul>
                  {column.map((hero) => (
                    <li key={hero.name}>
                      <div className="counterPicking_list-hero">
                        <div
                          className={`counterPicking_list-hero-tile ${
                            activeHero === hero.name ? "active" : ""
                          }`}
                          onClick={() => toggleHero(hero.name)}
                        >
                          <img
                            className="counterPicking_list-hero-img"
                            src={hero.portrait}
                            alt=""
                          />
                          <h3>{hero.name}</h3>
                          <button
                            className={`counterPicking_list-hero-button ${
                              activeHero === hero.name ? "rotated" : ""
                            }`}
                          >
                            <img src={arrow} alt="arrow" />
                          </button>
                        </div>

                        <div
                          className={`counterPicking_list-counters ${
                            activeHero === hero.name ? "expanded" : ""
                          }`}
                        >
                          <div className="counterPicking_list-counters-container">
                            {Object.entries(
                              hero.counteredBy?.reduce((acc, counterKey) => {
                                const counterHero = heroes.find(
                                  (h) => h.key === counterKey
                                )

                                if (counterHero) {
                                  if (!acc[counterHero.role]) {
                                    acc[counterHero.role] = []
                                  }
                                  acc[counterHero.role].push(counterHero)
                                }

                                return acc
                              }, {} as Record<string, HeroWithCounter[]>)
                            ).map(([role, counters]) => (
                              <div
                                key={role}
                                className="counterPicking_list-role-group"
                              >
                                <div className="counterPicking_list-role-group-role-img">
                                  {role === "tank" && <img src={tank} alt="" />}
                                  {role === "damage" && (
                                    <img src={damage} alt="" />
                                  )}
                                  {role === "support" && (
                                    <img src={support} alt="" />
                                  )}
                                </div>
                                <div className="counterPicking_list-role-heroes">
                                  {counters.map((counterHero) => (
                                    <div
                                      key={counterHero.key}
                                      className="counterPicking_list-counter-hero"
                                    >
                                      <img
                                        src={counterHero.portrait}
                                        alt={`${counterHero.name} portrait`}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CounterPicking
