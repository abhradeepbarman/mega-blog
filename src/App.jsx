import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(loading) {
    return (
      // assignment: style this
      <div>Loading</div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400" >
      <div className="w-full block">
        <Header />
        <main>
            TODO: {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
