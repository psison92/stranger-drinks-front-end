import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
    <header className='App-header'>
      Stranger Drinks
      {user ?
        <nav>
            <Link to='/add'>Mix your Drink</Link>
            <Link to='/add-ingredient'>Add Ingredient</Link>
            <Link to='/'>/Drinks</Link>
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
