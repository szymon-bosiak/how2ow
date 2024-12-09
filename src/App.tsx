import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Heroes from "./pages/Heroes/Heroes"
import HeroDetails from "./pages/HeroDetails/HeroDetails"
import HeroesSkins from "./pages/HeroesSkins/HeroesSkins"
import HeroSkins from "./pages/HeroSkins/HeroSkins"
import About from "./pages/About/About"
import TierList from "./pages/TierList/TierList"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/game-info" element={<GameInfo />} /> */}
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/heroes/:heroName" element={<HeroDetails />} />
          <Route path="/skins" element={<HeroesSkins />} />
          <Route path="/skins/:heroName" element={<HeroSkins />} />
          <Route path="/tier-list" element={<TierList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
