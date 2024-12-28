import { useParams } from "react-router-dom"
import { SetStateAction, useEffect, useState } from "react"
import axios from "axios"
import "./heroDetails.css"
import { HeroDesc } from "../../interfaces/heroDesc.interface"
import support from "../../assets/icons/support.svg"
import damage from "../../assets/icons/damage.svg"
import tank from "../../assets/icons/tank.svg"
import location from "../../assets/icons/location.svg"
import birthday from "../../assets/icons/birthday.svg"
import { heroDetailsData } from "./heroDetailsData"
import NotFound from "../NotFound/NotFound"
import Loading from "../../components/Loading/Loading"

const general = {
  tipsBg: {
    sm: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt5a55cd286f231034/64502825c0e72e6550ce00d0/960_Origin_Story_v2.jpg?format=webply&quality=90",
    md: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/bltd0bc9a7387113fff/6450282513e90763ea6e0eee/1600_Origin_Story_v2.jpg?format=webply&quality=90",
    lg: "https://blz-contentstack-images.akamaized.net/v3/assets/blt2477dcaf4ebd440c/blt19114dec63b882c2/645182c1a3865a4b9eaa7c58/2600_Origin_Story_v2.jpg?format=webply&quality=90",
  },
}

function HeroDetails() {
  const { heroName } = useParams<{ heroName: string }>()
  const [hero, setHero] = useState<HeroDesc | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [thumbnail, setThumbnail] = useState<string>("")
  const [tipsBg, setTipsBg] = useState<string>("")
  const [currentVideo, setCurrentVideo] = useState("")

  // Fetching hero data
  useEffect(() => {
    if (!heroName) {
      setError("Hero not found")
      setIsLoading(false)
      return
    }

    const fetchHero = async () => {
      try {
        const response = await axios.get<HeroDesc>(
          `https://overfast-api.tekrop.fr/heroes/${heroName}`
        )
        setHero(response.data)
        setCurrentVideo(response.data.abilities[0].video.link.webm)
        setCurrentAbilityDescription(response.data.abilities[0].description)
        setCurrentAbilityName(response.data.abilities[0].name)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHero()
  }, [heroName])

  // Reactive images
  const heroData = heroDetailsData[heroName!]
  const [activeAbilityIndex, setActiveAbilityIndex] = useState(0)
  const [currentAbilityDescription, setCurrentAbilityDescription] = useState("")
  const [currentAbilityName, setCurrentAbilityName] = useState("")

  if (!heroData) {
    return <NotFound />
  }

  useEffect(() => {
    const updateAssest = () => {
      const width = window.innerWidth
      if (width <= 960) {
        setThumbnail(heroData.thumbnail.sm)
        setTipsBg(general.tipsBg.sm)
      } else if (width <= 1600) {
        setThumbnail(heroData.thumbnail.md)
        setTipsBg(general.tipsBg.md)
      } else {
        setThumbnail(heroData.thumbnail.lg)
        setTipsBg(general.tipsBg.lg)
      }
    }

    updateAssest()

    window.addEventListener("resize", updateAssest)

    return () => {
      window.removeEventListener("resize", updateAssest)
    }
  }, [heroData.thumbnail])

  const handleAbilityClick = (
    link: SetStateAction<string>,
    index: number,
    abilityName: string,
    abilityDescription: string
  ) => {
    setActiveAbilityIndex(index)
    setCurrentVideo(link)
    setCurrentAbilityDescription(abilityDescription)
    setCurrentAbilityName(abilityName)
  }

  if (isLoading) return <Loading />
  if (error) return <p>Error: {error}</p>
  if (!hero) return <p>No hero found.</p>

  // Conditional icon
  type Role = "support" | "tank" | "damage"

  const role = hero.role
  const roleIcons: Record<Role, string> = {
    support,
    tank,
    damage,
  }

  // Abilities

  return (
    <div className="hero-details">
      {/* about */}
      <div
        className="hero-details_info"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <div className="hero-details_info-wraper">
          <div className="spacer"></div>
          <h2 className="hero-details_info-name">{hero.name}</h2>
          <p className="hero-details_info-desc">{hero.description}</p>

          <div className="hero-details_info-general">
            <div className="hero-details_info-general-point">
              <div className="hero-details_info-general-point-icon">
                <img src={roleIcons[role as Role]} alt="role icon" />
              </div>
              <p className="hero-details_info-general-point-role">{role}</p>
            </div>

            <div className="hero-details_info-general-point">
              <div className="hero-details_info-general-point-icon">
                <img src={location} alt="location icon" />
              </div>
              <p>{hero.location}</p>
            </div>

            <div className="hero-details_info-general-point">
              <div className="hero-details_info-general-point-icon">
                <img src={birthday} alt="birthday icon" />
              </div>

              <p>
                {hero.birthday} (Age: {hero.age})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* abilities */}
      <div className="hero-details_abilities">
        {/* Background video container */}
        <div className="hero-details_abilities-wrapper">
          <div className="hero-details_abilities-bg">
            <video
              key={currentVideo}
              autoPlay
              loop
              muted
              playsInline
              className="hero-details_abilities-bg-video"
            >
              {currentVideo && <source src={currentVideo} type="video/webm" />}
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="hero-details_abilities-content">
            <div className="hero-details_abilities-content-heading">
              <h2>Abilities</h2>
            </div>

            <div className="hero_details_abilities-content-outer">
              <div className="hero_details_abilities-content-ability-row">
                <div className="hero_details_abilities-content-ability">
                  {hero.abilities.map((ability, index) => (
                    <div
                      key={index}
                      className={`hero_details_abilities-content-ability-content ${
                        activeAbilityIndex === index
                          ? "hero_details_abilities-content-ability-content--active"
                          : ""
                      }`}
                      onClick={() =>
                        handleAbilityClick(
                          ability.video.link.webm,
                          index,
                          ability.name,
                          ability.description
                        )
                      }
                    >
                      <div
                        className={`hero_details_abilities-content-ability-icon ${
                          activeAbilityIndex === index
                            ? "hero_details_abilities-content-ability-icon--active"
                            : ""
                        }`}
                      >
                        <img src={ability.icon} alt={ability.name} />
                      </div>
                      <div className="hero_details_abilities-content-ability-name">
                        {ability.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero_details_abilities-content-ability-spacer"></div>
              <p className="hero_details_abilities-content-ability-name--mobile">
                {currentAbilityName}
              </p>
              <p className="hero_details_abilities-content-ability-description">
                {currentAbilityDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="hero-details_tips-wrapper">
        <div
          className="hero-details_tips"
          style={{ backgroundImage: `url(${tipsBg})` }}
        >
          <h2>Tips</h2>
          <div className="hero-details_tips-container">
            {heroData.tips.map((tip, index) => (
              <div className="hero-details_tip" key={index}>
                <h3>{index + 1}.</h3>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroDetails
