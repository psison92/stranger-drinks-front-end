import { Link, useLocation } from 'react-router-dom'
import StrangerDrinks from '../StrangerDrinks/StrangerDrinks'
import styles from './NavBar.module.css'

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
        <nav className={styles.container}>
            <Link className={styles.navitem} to='/add'>Mix your Drink</Link>
            <Link className={styles.navitem} to='/add-ingredient'>Add Ingredient</Link>
            <Link className={styles.navitem} to="/drinks">Drinks</Link>
            <Link className={styles.navitem} to="/profiles">Profiles</Link>
            <Link className={styles.navitem} to="" onClick={handleLogout}>Log Out</Link>
            <Link className={styles.navitem} to="/changePassword">Change Password</Link>
        </nav>
      :
        <nav className={styles.container}>
            <Link className={styles.navitemnolog} to="/login">Log In</Link>
            <Link className={styles.navitemnolog} to="/signup">Sign Up</Link>
        </nav>
      }
    </header>
    </>
  )
}

export default NavBar