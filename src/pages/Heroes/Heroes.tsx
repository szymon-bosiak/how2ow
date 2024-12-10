import "./heroes.css"
import HeroList from "../../components/HeroList/HeroList"

function Heroes() {
  return (
    <div className="heroList_bg--info">
      <div className="heroList_wrapper--info">
        <HeroList />
      </div>
    </div>
  )
}

export default Heroes
