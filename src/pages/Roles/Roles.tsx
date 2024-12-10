import axios from "axios"
import { useEffect, useState } from "react"
import { Role } from "../../interfaces/role.interface"
import "./roles.css"

function Roles() {
  const [roles, setRoles] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<Role>(
          `https://overfast-api.tekrop.fr/heroes/roles`
        )
        setRoles(response.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  })

  return (<div>
    
  </div>)
}

export default Roles
