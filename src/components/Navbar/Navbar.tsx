import { useState, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import "./navbar.css"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import OW from "../../assets/ow.svg"
import arrow from "../../assets/icons/arrow.svg"
import subnavArrow from "../../assets/icons/subnav-arrow.svg"
import hamburger from "../../assets/icons/hamburger.svg"
import x from "../../assets/icons/x.svg"

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const subNavRef = useRef(null)
  const navMobileRef = useRef(null)
  const subNavMobileRef = useRef(null)
  const overlayRef = useRef(null)

  const menuItems = [
    {
      title: "Game Info",
      path: "",
      icon: arrow,
      subNav: [
        { title: "Roles", path: "/game-info/roles" },
        { title: "Game Modes", path: "/game-info/game-modes" },
        { title: "Counter picking", path: "/game-info/counter-picking" },
      ],
    },
    { title: "Heroes", path: "/heroes" },
    { title: "Skins", path: "/skins" },
    { title: "Tier List", path: "/tier-list" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const handleItemClick = (itemTitle: string) => {
    setClickedItem((prevClickedItem) =>
      prevClickedItem === itemTitle ? null : itemTitle
    )
  }

  return (
    <div className="navbar_wrapper">
      <nav className="navbar">
        <button className="navbar_hamburger" onClick={toggleMenu}>
          <div className="navbar_hamburger-inner">
            <img src={hamburger} alt="" />
          </div>
        </button>
        <div className="navbar_flex">
          <div className="navbar_home">
            <Link to="/" className="navbar_home-logo">
              <img className="navbar_home-logo-how" src={logo} alt="Logo" />
              <img className="navbar_home-logo-ow" src={OW} alt="Logo" />
            </Link>
          </div>

          {/* Links for desktop */}
          <div className="navbar_links">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="navbar_link"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.path ? (
                  <Link className="navbar_link-content" to={item.path}>
                    <div className="navbar_link-text">
                      {item.title}
                      {item.icon && (
                        <img
                          className="navbar_link-icon"
                          src={item.icon}
                          alt=""
                        />
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="navbar_link-content">
                    <div className="navbar_link-text">
                      {item.title}
                      {item.icon && (
                        <img
                          className="navbar_link-icon"
                          src={item.icon}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                )}

                {item.subNav && (
                  <CSSTransition
                    in={hoveredItem === item.title}
                    timeout={250}
                    classNames="subnav-transition"
                    unmountOnExit
                    nodeRef={subNavRef}
                  >
                    <div ref={subNavRef} className="navbar_subnav">
                      <div className="navbar_subnav-decor">
                        <img src={subnavArrow} alt="" />
                      </div>
                      <div className="navbar_subnav-links">
                        {item.subNav.map((subItem, subIndex) => (
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

          {/* Overlay */}
          <CSSTransition
            in={isMenuOpen}
            timeout={100}
            classNames="overlay-transition"
            unmountOnExit
            nodeRef={overlayRef}
          >
            <div
              ref={overlayRef}
              className="overlay"
              onClick={toggleMenu}
            ></div>
          </CSSTransition>

          {/* Links for mobile */}
          <CSSTransition
            in={isMenuOpen}
            timeout={250}
            classNames="subnav-mobile-transition"
            unmountOnExit
            nodeRef={navMobileRef}
          >
            <div
              ref={navMobileRef}
              className={`navbar_menu ${isMenuOpen ? "open" : ""}`}
            >
              <button className="navbar_hamburger" onClick={toggleMenu}>
                <div className="navbar_hamburger-inner">
                  <img src={x} alt="" />
                </div>
              </button>
              <div className="navbar_wraper">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className={`navbar_link mobile ${
                      clickedItem === item.title ? "selected" : ""
                    }`}
                    onClick={() => handleItemClick(item.title)}
                  >
                    {item.path ? (
                      <Link
                        className="navbar_link-content mobile"
                        to={item.path}
                        onClick={toggleMenu}
                      >
                        <div className="navbar_link-text mobile">
                          {item.title}
                          {item.icon && (
                            <img
                              className="navbar_link-icon mobile"
                              src={item.icon}
                              alt=""
                            />
                          )}
                        </div>
                      </Link>
                    ) : (
                      <div className="navbar_link-content mobile">
                        <div className="navbar_link-text mobile">
                          {item.title}
                          {item.icon && (
                            <img
                              className="navbar_link-icon mobile"
                              src={item.icon}
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {item.subNav && (
                      <CSSTransition
                        in={clickedItem === item.title}
                        timeout={250}
                        classNames="subnav-transition"
                        unmountOnExit
                        nodeRef={subNavMobileRef}
                      >
                        <div ref={subNavMobileRef} className="mobile_subnav">
                          <div className="mobile_subnav-links">
                            {item.subNav?.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                className="mobile_subnav-link"
                                to={subItem.path}
                                onClick={toggleMenu}
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
          </CSSTransition>
        </div>

        <Link className="navbar_cta" to="/about">
          <div className="navbar_cta-content">
            <div className="navbar_cta-text">About</div>
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar
