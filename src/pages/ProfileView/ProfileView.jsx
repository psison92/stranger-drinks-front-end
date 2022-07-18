
import { useRadioGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getProfile } from '../../services/profileService'

const ProfileView = (props) => {
  const [profileDetails, setProfileDetails] = useState({})
  const location = useLocation()
  
  useEffect(() => {
    const fetchProfileDetails = async () => {
      const profileData = await getProfile(location.state.profile.url)
      setProfileDetails(profileData)
    } 
    fetchProfileDetails()
  }, [location.state.profile.url])
  return (
    <>
      <main>
        {/* cant find a default picture yet but will be adding one once one is found */}
        {/* <img 
          src={
            location.state.profile.photo
            ?location.state.profile.photo
            :
          } 
          alt="" 
          srcset="" /> */}
        <h1>Hey Look Its {location.state.profile.name}</h1>
        <div>
        {location.state.profile.hangoverTip === ""?
        <h2>Hangover Tip: {location.state.profile.hangoverTip}</h2>
        :
        <h2>No Hangover Tips yet</h2>
        }
        </div>
        {props.user?.profile === location.state.profile?._id &&
        <Link to="/hangover-tip" >
          <button>Add a new tip?</button>
        </Link>
        }
        <h2>Favorite Drinks:{location.state.profile.favoriteDrinks}</h2>
        <h2>Personal Creations:{location.state.profile.drinkList}</h2>
      </main>
    </>
  )
}

export default ProfileView