import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Heroes from "./pages/Heroes/Heroes"
import HeroDetails from "./pages/HeroDetails/HeroDetails"
import HeroesSkins from "./pages/HeroesSkins/HeroesSkins"
import HeroSkins from "./pages/HeroSkins/HeroSkins"
import About from "./pages/About/About"
import TierList from "./pages/TierList/TierList"
import GameModes from "./pages/GameModes/GameModes"
import CounterPicking from "./pages/CounterPicking/CounterPicking"
import Home from "./pages/Home/Home"
import { AnimatePresence, motion } from "motion/react"

const pageVariants = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Home />
            </motion.div>
          }
        />

        <Route
          path="/game-info/game-modes"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <GameModes />
            </motion.div>
          }
        />
        <Route
          path="/game-info/counter-picking"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CounterPicking />
            </motion.div>
          }
        />

        <Route
          path="/heroes"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Heroes />
            </motion.div>
          }
        />
        <Route
          path="/heroes/:heroName"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HeroDetails />
            </motion.div>
          }
        />

        <Route
          path="/skins"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HeroesSkins />
            </motion.div>
          }
        />
        <Route
          path="/skins/:heroName"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HeroSkins />
            </motion.div>
          }
        />
        <Route
          path="/tier-list"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <TierList />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <About />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function RootApp() {
  return (
    <Router>
      <Layout>
        <App />
      </Layout>
    </Router>
  )
}
