import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import CreateDrink from './pages/CreateDrink/CreateDrink'
import StrangerDrinks from './components/StrangerDrinks/StrangerDrinks'

import * as authService from './services/authService'
import * as drinkService from './services/drinkService'
import AddIngredient from './pages/AddIngredient/AddIngredient'
import DrinksPage from './pages/DrinksPage/DrinksPage'
import * as ingredientService from './services/ingredientService'
import EditDrink from './pages/EditDrink/EditDrink'


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [drinks, setDrinks] = useState([])
  const [ingredients, setIngredients] = useState([])
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
    navigate('/drinks') // FIXME Where would we like the user to go after creating a drink
  }
  
  const handleAddIngredient = async (newIngredientData) => {
    const newIngredient = await ingredientService.create(newIngredientData)
    setIngredients([...ingredients, newIngredient])
    navigate('/')
  }

  const drinkPhotoHelper = async (photo, id) => {
    const photoData = new FormData()
    photoData.append('photo', photo) // allows for sending files
    return await drinkService.addPhoto(photoData, id)
  }

  const handleDeleteDrink = async id => {
    const deletedDrink = await drinkService.deleteOne(id)
    setDrinks(drinks.filter(drink => drink._id)!== deletedDrink._id)
  }

  const handleUpdateDrink = async (updatedDrinkData, photo) => {
    const updatedDrink = await drinkService.update(updatedDrinkData)
		// If there is a photo...
    if (photo) {
      updatedDrink.photo = await drinkPhotoHelper(photo, updatedDrink._id)
    }
    const newDrinkArray = drinks.map(drink => 
      drink._id === updatedDrink._id ? updatedDrink : drink
    )
    setDrinks(newDrinkArray)
		navigate('/drinks')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <StrangerDrinks />
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
          path="/add-ingredient"
          element={<AddIngredient handleAddIngredient={handleAddIngredient} />}
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
          path="/add"
          element={user ? <CreateDrink handleAddDrink={handleAddDrink} ingredients={ingredients}/> : <Navigate to="/login" />}
        />
        <Route
          path='/edit'
          element={<EditDrink handleUpdateDrink={handleUpdateDrink} />}        
        
        />

        <Route 
          path="/drinks" 
          element={
          <DrinksPage 
            drinks={drinks} 
            user={user}
            handleDeleteDrink={handleDeleteDrink} 
          />}
        />
      </Routes>
    </>
  )
}

export default App
