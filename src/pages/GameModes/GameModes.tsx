import axios from "axios"
import { useEffect, useState } from "react"
import { Role } from "../../interfaces/role.interface"
import "./gameModes.css"

function GameModes() {
  const [gameModes, setGameModes] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameModes = async () => {
      try {
        const response = await axios.get<Role>(
          `https://overfast-api.tekrop.fr/heroes/roles`
        )
        setGameModes(response.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGameModes()
  })

  return (<div>
    
  </div>)
}

export default GameModes