import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import CreateDrink from './pages/CreateDrink/CreateDrink'

import * as authService from './services/authService'
import * as drinkService from './services/drinkService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [drinks, setDrinks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllDrinks = async () => {
      const drinkData = await drinkService.getAll()
      setDrinks(drinkData)
    }
    fetchAllDrinks()
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddDrink = async (newDrinkData, photo) => {
    const newDrink = await drinkService.create(newDrinkData)
    if (photo) {
      newDrink.photo = await drinkPhotoHelper(photo, newDrink._id)
    }
    setDrinks([...drinks, newDrink])
    navigate('/') // FIXME Where would we like the user to go after creating a drink
  }

  const drinkPhotoHelper = async (photo, id) => {
    const photoData = new FormData()
    photoData.append('photo', photo) // allows for sending files
    return await drinkService.addPhoto(photoData, id)
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={
            user ? (
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/mixDrink"
          element={user ? <CreateDrink /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App
