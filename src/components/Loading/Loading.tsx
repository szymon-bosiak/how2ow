import "./loading.css"
import { motion } from "framer-motion";
import OW from "../../assets/ow.svg"

function Loading() {
  return (
    <div className="loading">
      <div className="loading_logo">
        <img src={OW} alt="" className="loading_logo-static"/>
        <motion.img
          src={OW}
          alt=""
          className="loading_logo-animate"
          animate={{
            scale: [1, 1.45, 1],
            opacity: [0.25, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  )
}

export default Loading
