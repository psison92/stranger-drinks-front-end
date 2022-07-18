import { Link, useLocation } from 'react-router-dom'
import StrangerDrinks from '../StrangerDrinks/StrangerDrinks'


const NavBar = ({ user, handleLogout }) => {
  const location = useLocation();

  return (
    <>
    <header className='App-header'>
      {location.pathname !== '/'
      ?
        <StrangerDrinks 
          styleDiv={{
            textAlign: 'center',
          }}
          styleImg={{
            marginTop: '2rem',
            minHeight: '5rem',
            maxHeight: '10rem',
            height: '15vh', 
            maxWidth: '1200px',
            margin: '1rem auto', 
          }} 
        />
      :
        <>
        </>
      }
      {user ?
        <nav>
            <Link to='/add'>Mix your Drink</Link>
            <Link to='/add-ingredient'>Add Ingredient</Link>
            <Link to="/drinks">Drinks</Link>
            <Link to="/profiles">Profiles</Link>
            <Link to="" onClick={handleLogout}>LOG OUT</Link>
            <Link to="/changePassword">Change Password</Link>
        </nav>
      :
        <nav>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
        </nav>
      }
    </header>
    </>
  )
}

export default NavBar
