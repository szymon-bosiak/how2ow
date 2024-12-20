import "./tierList.css"
import all from "../../assets/icons/all.svg"
import support from "../../assets/icons/support.svg"
import damage from "../../assets/icons/damage.svg"
import tank from "../../assets/icons/tank.svg"
import axios from "axios"
import { useState, useEffect } from "react"
import { HeroWithTier } from "../../interfaces/hero.interface"
import { motion, AnimatePresence } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const localData: Record<string, { tier: string }> = {
  ana: {
    tier: "S",
  },
  ashe: {
    tier: "A",
  },
  baptiste: {
    tier: "A",
  },
  bastion: {
    tier: "C",
  },
  brigitte: {
    tier: "S",
  },
  cassidy: {
    tier: "A",
  },
  dva: {
    tier: "A",
  },
  doomfist: {
    tier: "B",
  },
  echo: {
    tier: "A",
  },
  genji: {
    tier: "A",
  },
  hanzo: {
    tier: "B",
  },
  hazard: {
    tier: "A",
  },
  illari: {
    tier: "B",
  },
  "junker-queen": {
    tier: "B",
  },
  junkrat: {
    tier: "A",
  },
  juno: {
    tier: "S",
  },
  kiriko: {
    tier: "A",
  },
  lifeweaver: {
    tier: "D",
  },
  lucio: {
    tier: "A",
  },
  mauga: {
    tier: "B",
  },
  mei: {
    tier: "A",
  },
  mercy: {
    tier: "C",
  },
  moira: {
    tier: "B",
  },
  orisa: {
    tier: "A",
  },
  pharah: {
    tier: "A",
  },
  ramattra: {
    tier: "A",
  },
  reaper: {
    tier: "B",
  },
  reinhardt: {
    tier: "B",
  },
  roadhog: {
    tier: "B",
  },
  sigma: {
    tier: "A",
  },
  sojourn: {
    tier: "S",
  },
  "soldier-76": {
    tier: "B",
  },
  sombra: {
    tier: "C",
  },
  symmetra: {
    tier: "B",
  },
  torbjorn: {
    tier: "B",
  },
  tracer: {
    tier: "A",
  },
  venture: {
    tier: "B",
  },
  widowmaker: {
    tier: "S",
  },
  winston: {
    tier: "A",
  },
  "wrecking-ball": {
    tier: "B",
  },
  zarya: {
    tier: "C",
  },
  zenyatta: {
    tier: "A",
  },
}

function TierList() {
  const [heroes, setHeroes] = useState<HeroWithTier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>("all")

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get<HeroWithTier[]>(
          "https://overfast-api.tekrop.fr/heroes"
        )

        // Combine API data with local data
        const combinedHeroes = response.data.map((hero) => ({
          ...hero,
          tier: localData[hero.key]?.tier,
        }))

        setHeroes(combinedHeroes)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroes()
  }, [])

  const tiers = [
    { tier: "A", nameClass: "legendary" },
    { tier: "B", nameClass: "epic" },
    { tier: "C", nameClass: "rare" },
    { tier: "D", nameClass: "common" },
  ]

  const filterHeroes = (tier: string) =>
    heroes.filter(
      (hero) =>
        hero.tier === tier && (roleFilter === "all" || hero.role === roleFilter)
    )

  if (isLoading) return <p className="tierList_content">Loading...</p>
  if (error) return <p className="tierList_content">Error: {error}</p>

  return (
    <div className="tierList_container">
      <div className="tierList_content">
        <div className="tierList_content-wraper">
          <div className="tierList_content-heading">
            <div className="tierList_content-heading-text">
              <h2>Hero Tier List</h2>
              <p>for Season 13</p>
            </div>
            <div className="tierList_content-heading-select">
              {[
                { role: "all", img: all, alt: "All roles" },
                { role: "tank", img: tank, alt: "Tank role" },
                { role: "damage", img: damage, alt: "Damage role" },
                { role: "support", img: support, alt: "Support role" },
              ].map(({ role, img, alt }) => (
                <div
                  key={role}
                  className="tierList_content-heading-role-container"
                >
                  <button
                    className={`tierList_content-heading-role-button ${
                      roleFilter === role
                        ? "tierList_content-heading-role-button--active"
                        : ""
                    }`}
                    onClick={() => setRoleFilter(role)}
                  >
                    <img src={img} alt={alt} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* This tier is separated because its "S" has a different styling */}
          <div className="tierList_content-list">
            <div className="tierList_content-tiers">
              <div className="tierList_content-tier-inner">
                <div className="tierList_content-mythic-container">
                  <div className="tierList_content-tier-name--mythic mythic">
                    <h3>S</h3>
                  </div>
                </div>
                <div className="tierList_content-tier-row">
                  {roleFilter === "all" ? (
                    <div className="tierList_content-tier-portrait">
                      {heroes
                        .filter((hero) => hero.tier === "S")
                        .map((hero) => (
                          <img
                            src={hero.portrait}
                            alt={`${hero.name} portrait`}
                            key={hero.name}
                          />
                        ))}
                    </div>
                  ) : (
                    <div className="tierList_content-tier-portrait">
                      {heroes
                        .filter(
                          (hero) =>
                            hero.role === roleFilter && hero.tier === "S"
                        )
                        .map((hero) => (
                          <img
                            src={hero.portrait}
                            alt={`${hero.name} portrait`}
                            key={hero.name}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {tiers.map(({ tier, nameClass }) => (
                <div key={tier} className="tierList_content-tier-inner">
                  <div className={`tierList_content-tier-name ${nameClass}`}>
                    <h3>{tier}</h3>
                  </div>
                  <div className="tierList_content-tier-row">
                    <div className="tierList_content-tier-portrait">
                      {filterHeroes(tier).map((hero) => (
                        <img
                          key={hero.name}
                          src={hero.portrait}
                          alt={`${hero.name} portrait`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tierList_source">
            <p>
              Tier list based on this{" "}
              <a
                href="https://www.youtube.com/watch?v=e46iBfwuKMg"
                target="blank"
                className="tierList_source-link"
              >
                video
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TierList
