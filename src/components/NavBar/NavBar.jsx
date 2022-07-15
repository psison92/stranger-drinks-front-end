import { Link } from 'react-router-dom'


const NavBar = ({ user, handleLogout }) => {
  return (
    <>
    <header className='App-header'>
      {user ?
        <nav>
            <Link to='/add'>Mix your Drink</Link>
            <Link to='/add-ingredient'>Add Ingredient</Link>
            <Link to='/'>Drinks</Link>
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
    <div class="st">

  <div class="st-top">
    <div class="st-bound st-bound-full"></div>
    <p><span class="st-drop st-stranger-s">S</span><span class="st-stranger-t">t</span><span class="st-stranger-r">r</span><span class="st-stranger-a">a</span><span class="st-stranger-n">n</span><span class="st-stranger-g">g</span><span class="st-stranger-e">e</span><span class="st-drop st-stranger-r-2">r</span>
    </p>
    <div class="st-bound st-bound-mini st-bound-left"></div>
    <div class="st-bound st-bound-mini st-bound-right"></div>
  </div>

  <div class="st-bottom">
    <p><span class="st-things-t">D</span><span class="st-things-h">r</span><span class="st-things-i">i</span><span class="st-things-n">n</span><span class="st-things-g">k</span><span class="st-things-s">s</span></p>
  </div>

</div>
    </>
  )
}

export default NavBar
