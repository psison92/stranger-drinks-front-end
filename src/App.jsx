import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ProfileView from './pages/ProfileView/ProfileView'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import CreateDrink from './pages/CreateDrink/CreateDrink'
import StrangerDrinks from './components/StrangerDrinks/StrangerDrinks'
import ShowPage from './pages/ShowPage/ShowPage'
import * as authService from './services/authService'
import * as drinkService from './services/drinkService'
import AddIngredient from './pages/AddIngredient/AddIngredient'
import DrinksPage from './pages/DrinksPage/DrinksPage'
import * as ingredientService from './services/ingredientService'
import EditDrink from './pages/EditDrink/EditDrink'
import AddReview from './components/ReviewComponents/AddReview'
import * as reviewService from './services/reviewService'
import ReviewsPage from './components/ReviewComponents/ReviewsPage'
import HangoverTip from './pages/ProfileHangoverTip/HangoverTipForm'
import * as profileService from './services/profileService'
import EditReview from './components/ReviewComponents/EditReview'



const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [drinks, setDrinks] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [reviews, setReviews] = useState([])
  const [hangoverTip, setHangoverTip] = useState([])
  const [profiles, setProfiles] = useState([])
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllDrinks = async () => {
      const drinkData = await drinkService.getAll()
      setDrinks(drinkData)
    }
    fetchAllDrinks()
  }, [])
  
  useEffect(() => {
    const fetchAllReviews = async () => {
      const reviewData = await reviewService.getAll()
      setReviews(reviewData)
    }
    fetchAllReviews()
  }, [])

  useEffect(() => {
    const fetchAllIngredients = async () => {
      const ingredientData = await ingredientService.getAll()
      setIngredients(ingredientData)
    }
    fetchAllIngredients()
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
    navigate('/drinks')
  }
  
  const handleAddIngredient = async (newIngredientData) => {
    const newIngredient = await ingredientService.create(newIngredientData)
    setIngredients([...ingredients, newIngredient])
    navigate('/')
  }
  
  const handleAddReview = async (newReviewData, drinkId) => {
    const newReview = await reviewService.create(newReviewData, drinkId)
    setReviews([...reviews, newReview])
  
  }

  const handleDeleteReview = async id => {
    const deletedReview = await reviewService.deleteOne(id)
    setReviews(reviews.filter(review => review._id !== deletedReview._id))
  }

  const handleUpdateReview = async (updatedReviewData) => {
    const updatedReview = await reviewService.update(updatedReviewData)
    const newReviewArray = reviews.map(review => 
      review._id === updatedReview._id ? updatedReview : review
    )
    setReviews(newReviewArray)
		navigate('/drinks')
    console.log(updatedReviewData)
  }

  const drinkPhotoHelper = async (photo, id) => {
    const photoData = new FormData()
    photoData.append('photo', photo) // allows for sending files
    return await drinkService.addPhoto(photoData, id)
  }

  const handleDeleteDrink = async id => {
    const deletedDrink = await drinkService.deleteOne(id)
    setDrinks(drinks.filter(drink => drink._id!== deletedDrink._id))
  }

  const handleUpdateDrink = async (updatedDrinkData, photo) => {
    const updatedDrink = await drinkService.update(updatedDrinkData)
		// If there is a photo...
    if (photo) {
      updatedDrink.photo = await drinkPhotoHelper(photo, updatedDrink._id)
    }

    const newDrinkData = drinks.map(drink => 
      drink._id === updatedDrink._id ? updatedDrink : drink
    )

    setDrinks(newDrinkData)
		navigate('/drinks')
  }
  const handleCreateTip = async (newHangoverTipData) => {
    const newHangoverTip = await newHangoverTip.create(newHangoverTipData)
    setHangoverTip([...hangoverTip, newHangoverTip])
    navigate('/profile-view')
  }

  const handleDeleteTip = async profileId => {
    const deletedTip = await profileService.deleteTip(profileId)
    setHangoverTip(hangoverTip.filter(hangoverTip => hangoverTip._id !== deletedTip._id))
    console.log('this will delete')
  }  

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <StrangerDrinks 
            styleDiv={{
              height: '90vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
            styleImg={{
              width: '90vw', 
              maxWidth: '1200px',
              animation: 'fadeIn ease 5s',
              WebkitAnimation: 'fadeIn ease 5s',
              MozAnimation: 'fadeIn ease 5s',
              OAnimation: 'fadeIn ease 5s',
              MSAnimation: 'fadeIn ease 5s',
            }}
          />
          }
        />
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
          path="/profile-view"
          element={<ProfileView 
            user={user} 
            handleDeleteTip={handleDeleteTip}/>}
        />
        <Route
          path="/hangover-tip"
          element={<HangoverTip
            user={user}
            handleCreateTip={handleCreateTip}
          />}
        >
        </Route>
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
          element={<EditDrink ingredients={ingredients} handleUpdateDrink={handleUpdateDrink} />}        
        
        />
        <Route
          path='/add-review'
          element={user ? <AddReview handleAddReview={handleAddReview} /> : <Navigate to="/login" />}        
        />
        <Route
          path='/reviews'
          element={
            <ReviewsPage 
              reviews={reviews} 
              user={user}
              handleDeleteReview={handleDeleteReview}
            />
          }        
        />
        <Route
          path='/edit-review'
          element={<EditReview handleUpdateReview={handleUpdateReview} />}        
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
        <Route 
          path='/drinks/:id'
          element={
            <ShowPage 
              user={user} 
              drinks={drinks} 
              reviews={reviews} 
              handleAddReview={handleAddReview}
              handleDeleteReview={handleDeleteReview}
              handleUpdateReview={handleUpdateReview}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
