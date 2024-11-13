// import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
// import HomePage from "./pages/HomePage"
// import AboutPage from "./pages/AboutPage"
// import GameInfo from "./pages/GameInfo"
// import Heroes from "./pages/Heroes"
// import Skins from "./pages/Skins"
// import TierList from "./pages/TierList"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/game-info" element={<GameInfo />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/skins" element={<Skins />} />
          <Route path="/tier-list" element={<TierList />} /> */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
