import { useState, useEffect } from "react"
import "./heroSkins.css"
import { heroSkinsData, Skin } from "./heroSkinsData"
import { useParams } from "react-router"

import battlePass from "../../assets/icons/Battle_Pass_Icon.webp"
import charity from "../../assets/icons/Charity.webp"
import halloweenTerror from "../../assets/icons/Halloween_Terror_Icon.webp"
import lunarNewYear from "../../assets/icons/Lunar_New_Year_Icon.webp"
import overwatchAnniversary from "../../assets/icons/Overwatch_Anniversary_Icon.webp"
import overwatchArchives from "../../assets/icons/Overwatch_Archives_Icon.webp"
import summerGames from "../../assets/icons/Summer_Games_Icon.webp"
import shop from "../../assets/icons/Shop_Icon.png"
import winterWonderland from "../../assets/icons/Winter_Wonderland_Icon.webp"
import esports from "../../assets/icons/Overwatch_Esports_Icon.webp"

import credits from "../../assets/icons/Credits.webp"
import mythicPrisms from "../../assets/icons/Mythic_Prism.webp"
import overwatchCoins from "../../assets/icons/Overwatch_Coin.png"
import owlTokens from "../../assets/icons/OWLtoken.webp"

import locked from "../../assets/icons/Locked.webp"
import info from "../../assets/icons/info_full.svg"

function HeroSkins() {
  const { heroName } = useParams<{ heroName: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSkin, setActiveSkin] = useState<Skin | null>(
    heroSkinsData[heroName!].skins[0]
  )

  const heroSkins = heroSkinsData[heroName!].skins

  const eventIcons: Record<string, JSX.Element> = {
    "Lunar New Year": <img src={lunarNewYear} alt="Lunar New Year" />,
    "Halloween Terror": <img src={halloweenTerror} alt="Halloween Terror" />,
    "Winter Wonderland": <img src={winterWonderland} alt="Winter Wonderland" />,
    "Battle Pass": <img src={battlePass} alt="Battle Pass" />,
    Shop: <img src={shop} alt="Shop" />,
    "Overwatch Anniversary": (
      <img src={overwatchAnniversary} alt="Overwatch Anniversary" />
    ),
    "Overwatch Archives": (
      <img src={overwatchArchives} alt="Overwatch Archives" />
    ),
    "Summer Games": <img src={summerGames} alt="Summer Games" />,
    // "Overwatch Esports": <img src={esports} alt="Overwatch Esports" />,
    "BCRF Charity Event": <img src={charity} alt="BCRF Charity Event" />,
  }

  const currencyIcons: Record<string, JSX.Element> = {
    Credits: <img src={credits} alt="Credits" />,
    "Overwatch Coins": <img src={overwatchCoins} alt="Overwatch Coins" />,
    "League Tokens": <img src={owlTokens} alt="League Tokens" />,
    "Mythic Prisms": <img src={mythicPrisms} alt="Mythic Prisms" />,
  }

  const handleSkinClick = (skin: Skin) => {
    setActiveSkin(skin)
  }

  return (
    <div className="skins">
      <div className="skins_bg">
        <div className="skins_wrapper">
          <div className="skins_wrapper-flex">
            <div className="skins_hero">
              <h3>{heroName}</h3>
            </div>

            <div className="skins_wrapper-flex-inner">
              {activeSkin?.desc ? (
                <p className="skins_skin-desc mobile">
                  <img
                    className="skins_skin-desc-icon"
                    src={info}
                    alt="skin information icon"
                  />
                  {activeSkin?.desc}
                </p>
              ) : (
                ""
              )}
              <div className="skins_list">
                {heroSkins.map((skin, index) => (
                  <div key={skin.name} className="skins_list-skin">
                    <div
                      key={skin.name + index}
                      className={`skins_list-skin-item ${
                        activeSkin === skin ? "active" : ""
                      }`}
                      onClick={() => handleSkinClick(skin)}
                    >
                      <div className="skins_list-skin-item-left">
                        <div className="skins_list-skin-event">
                          {skin.event
                            ? eventIcons[skin.event] ?? (
                                <span>{skin.event}</span>
                              )
                            : null}
                        </div>
                        <h4
                          className={`skin_list-skin-name ${skin.rarity.toLowerCase()}`}
                        >
                          {skin.name}
                        </h4>
                      </div>

                      <div className="skins_list-skin-item-right">
                        <div className="skins_list-skin-item-right-currency">
                          {skin.avaliable && skin.currency
                            ? currencyIcons[skin.currency] ?? (
                                <span>{skin.currency}</span>
                              )
                            : null}
                        </div>

                        <div className="skins_list-skin-item-right-price">
                          {skin.avaliable && skin.value !== null && (
                            <p>{skin.value}</p>
                          )}
                        </div>

                        <div className="skins_list-skin-item-right-avalibility">
                          {skin.avaliable ? (
                            ""
                          ) : (
                            <img src={locked} alt="Not avaliable" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="skins_skin">
            <div className="skins_skin-img-container">
              <img
                className="skins_skin-img"
                src={activeSkin?.img}
                alt={activeSkin?.name}
              />
            </div>

            {activeSkin?.desc ? (
              <div className="skins_skin-desc desktop">
                <img
                  className="skins_skin-desc-icon"
                  src={info}
                  alt="skin information icon"
                />
                <p>{activeSkin?.desc}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSkins
