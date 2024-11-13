import { useState } from "react"
import { CSSTransition } from "react-transition-group"
import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import OW from "../../assets/ow.svg"
import arrow from "../../assets/arrow.svg"
import subnavArrow from "../../assets/subnav-arrow.svg"

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems = [
    {
      title: "Game Info",
      path: "/game-info",
      icon: arrow, // add an icon if needed
      subNav: [
        { title: "Roles", path: "/game-info/roles" },
        { title: "Game Modes", path: "/game-info/game-modes" },
      ],
    },
    { title: "Heroes", path: "/heroes" },
    { title: "Skins", path: "/skins" },
    { title: "Tier List", path: "/tier-list" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar_flex">
        <div className="navbar_home">
          <Link to="/" className="navbar_home-logo">
            <img className="navbar_home-logo-how" src={logo} alt="Logo" />
            <img className="navbar_home-logo-ow" src={OW} alt="Logo" />
          </Link>
        </div>

        <div className="navbar_links">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="navbar_link"
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link className="navbar_link-content" to={item.path}>
                <div className="navbar_link-text">
                  {item.title}
                  {item.icon && (
                    <img className="navbar_link-icon" src={item.icon} alt="" />
                  )}
                </div>
              </Link>

              {item.subNav && (
                <CSSTransition
                  in={hoveredItem === item.title}
                  timeout={250}
                  classNames="subnav-transition"
                  unmountOnExit
                >
                  <div className="navbar_subnav">
                    <div className="navbar_subnav-decor">
                      <img src={subnavArrow} alt="" />
                    </div>
                    <div className="navbar_subnav-links">
                      {item.subNav?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          className="navbar_subnav-link"
                          to={subItem.path}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </CSSTransition>
              )}
            </div>
          ))}
        </div>
      </div>

      <Link className="navbar_cta" to="/about">
        <div className="navbar_cta-content">
          <div className="navbar_cta-text">About</div>
        </div>
      </Link>
    </nav>
  )
}

export default Navbar
