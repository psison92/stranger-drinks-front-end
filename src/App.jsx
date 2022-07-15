import './App.css'
import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import StrangerDrinks from './components/StrangerDrinks/StrangerDrinks'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <div className='App'>
        <NavBar user={user} handleLogout={handleLogout} />
        <main>
          <Routes>
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
              element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
