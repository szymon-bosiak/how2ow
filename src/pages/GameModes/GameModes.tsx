import axios from "axios"
import { useEffect, useState } from "react"
import { Map } from "../../interfaces/map.interface"
import { GameMode, GameModeWithMaps } from "../../interfaces/gameMode.interface"
import "./gameModes.css"
import arrow from "../../assets/icons/arrow_white.svg"
import Loading from "../../components/Loading/Loading"

function GameModes() {
  const [gameModes, setGameModes] = useState<GameModeWithMaps[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showcaseIndex, setShowcaseIndex] = useState<number>(0)
  const [mapsToDisplay, setMapsToDisplay] = useState<number>(0)

  const [selectedGameMode, setSelectedGameMode] =
    useState<GameModeWithMaps | null>()
  const [currentMap, setCurrentMap] = useState<Map>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameModesResponse = await axios.get<GameMode[]>(
          `https://overfast-api.tekrop.fr/gamemodes`
        )
        const gameModesData = gameModesResponse.data

        const mapsResponse = await axios.get<Map[]>(
          `https://overfast-api.tekrop.fr/maps`
        )
        const mapsData = mapsResponse.data

        const combinedData: GameModeWithMaps[] = gameModesData.map(
          (gameMode) => ({
            ...gameMode,
            map: mapsData.filter((map) => map.gamemodes.includes(gameMode.key)),
          })
        )

        setGameModes(combinedData)
        setSelectedGameMode(combinedData[0])
        setCurrentMap(combinedData[0].map[0])
        setMapsToDisplay(combinedData[0].map.length)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Loading />
  if (error) return <p className="gameModes_wrapper">Error: {error}</p>

  const handleGameModeClick = (gameMode: GameModeWithMaps) => {
    setSelectedGameMode(gameMode)
    setCurrentMap(gameMode.map[0])
    setMapsToDisplay(gameMode.map.length)
    setShowcaseIndex(0)
  }

  const handleNext = () => {
    setShowcaseIndex((prevIndex) => {
      const nextIndex =
        prevIndex === mapsToDisplay - 1 ? prevIndex : prevIndex + 1
      setCurrentMap(selectedGameMode?.map[nextIndex])
      return nextIndex
    })
  }

  const handlePrev = () => {
    setShowcaseIndex((prevIndex) => {
      const prev = prevIndex > 0 ? prevIndex - 1 : 0
      setCurrentMap(selectedGameMode?.map[prev])
      return prev
    })
  }

  return (
    <div className="gameModes">
      <div
        className="gameModes_bg"
        style={{ backgroundImage: `url(${currentMap?.screenshot})` }}
      >
        <div className="gameModes_wrapper">
          <div className="gameModes_wrapper-flex">
            <div className="gameModes_container">
              <div className="gameModes_content">
                <div className="gameModes_content-header">
                  <h2>MAPS</h2>
                  <p>
                    Travel the world and fight for the future in diverse
                    locations around the globe. From the technological marvels
                    of Busan to the snow-dusted streets of Toronto, every map
                    has objectives to accomplish, secrets to uncover, and
                    strategies to explore.
                  </p>
                </div>

                <div className="gameModes_content-graphics">
                  <div className="gameModes_content-graphics-icons">
                    {gameModes?.map((gameMode) => (
                      <div
                        key={gameMode.key}
                        className={`gameModes_content-graphics-icon ${
                          selectedGameMode?.key === gameMode.key
                            ? "gameModes_content-graphics-icon--active"
                            : "gameModes_content-graphics-icon"
                        }`}
                        onClick={() => handleGameModeClick(gameMode)}
                      >
                        <img
                          className="gameModes_content-graphics-icon-img"
                          src={gameMode.icon}
                          alt={gameMode.icon}
                        />
                        <p className="gameModes_content-graphics-text">
                          {gameMode.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="gameModes_content-graphics-showcase">
                    <div className="gameModes_content-graphics-carousel">
                      <div
                        className={`gameModes_content-graphics-carousel-nav left ${
                          showcaseIndex === 0
                            ? "gameModes_content-graphics-carousel-nav--disabled"
                            : ""
                        }`}
                        onClick={handlePrev}
                      >
                        <img src={arrow} alt="arrow left" />
                      </div>
                      <div
                        className="gameModes_content-graphics-carousel-img"
                        style={{
                          backgroundImage: `url(${currentMap?.screenshot})`,
                        }}
                      ></div>
                      <div
                        className={`gameModes_content-graphics-carousel-nav right ${
                          showcaseIndex === mapsToDisplay - 1
                            ? "gameModes_content-graphics-carousel-nav--disabled"
                            : ""
                        }`}
                        onClick={handleNext}
                      >
                        <img src={arrow} alt="arrow right" />
                      </div>
                    </div>
                    <div className="gameModes_content-graphics-info">
                      <h3>
                        {currentMap?.name} - {currentMap?.location}
                      </h3>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameModes
