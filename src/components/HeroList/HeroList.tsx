import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./heroList.css"
import { Hero } from "../../interfaces/hero.interface"
import support from "../../assets/support.svg"
import damage from "../../assets/damage.svg"
import tank from "../../assets/tank.svg"

function HeroList() {
  const [heroes, setHeroes] = useState<Hero[]>([]) // State to store API data
  const [isLoading, setIsLoading] = useState(true) // State to manage loading state
  const [error, setError] = useState<string | null>(null) // State for error handling

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get<Hero[]>(
          "https://overfast-api.tekrop.fr/heroes"
        )
        setHeroes(response.data) // Update state
      } catch (err: any) {
        setError(err.message) // Errors
      } finally {
        setIsLoading(false) // Loading indicator
      }
    }

    fetchHeroes()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="heroes_bg">
      <div className="heroes_wrapper">
        <div className="heroes_columns">
          {/* Tank Heroes */}
          <section className="heroes">
            <h1 className="heroes_class">
              <img src={tank} alt="" className="heroes_name-img" /> Tank
            </h1>
            <ul className="heroes_list">
              {heroes
                .filter((hero) => hero.role === "tank")
                .map((hero) => (
                  <Link to={hero.key} key={hero.key} className="heroes_link">
                    <li className="heroes_hero">
                      <img
                        src={hero.portrait}
                        alt={`${hero.name} portrait`}
                        className="heroes_hero-portrait"
                      />
                      <h2 className="heroes_hero-name">{hero.name}</h2>
                    </li>
                  </Link>
                ))}
            </ul>
          </section>

          {/* Damage Heroes */}
          <section className="heroes">
            <h1 className="heroes_class">
              <img src={damage} alt="" className="heroes_name-img" />
              Damage
            </h1>
            <ul className="heroes_list dps">
              {heroes
                .filter((hero) => hero.role === "damage")
                .map((hero) => (
                  <Link
                    to={hero.key}
                    key={hero.key}
                    className="heroes_link dps"
                  >
                    <li className="heroes_hero">
                      <div className="heroes_hero-portrait-bg">
                        <img
                          src={hero.portrait}
                          alt={`${hero.name} portrait`}
                          className="heroes_hero-portrait"
                        />
                      </div>

                      <h2 className="heroes_hero-name">{hero.name}</h2>
                    </li>
                  </Link>
                ))}
            </ul>
          </section>

          {/* Support Heroes */}
          <section className="heroes">
            <h1 className="heroes_class">
              <img src={support} alt="" className="heroes_name-img" />
              Support
            </h1>
            <ul className="heroes_list">
              {heroes
                .filter((hero) => hero.role === "support")
                .map((hero) => (
                  <Link to={hero.key} key={hero.key} className="heroes_link">
                    <li className="heroes_hero">
                      <img
                        src={hero.portrait}
                        alt={`${hero.name} portrait`}
                        className="heroes_hero-portrait"
                      />
                      <h2 className="heroes_hero-name">{hero.name}</h2>
                    </li>
                  </Link>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HeroList
