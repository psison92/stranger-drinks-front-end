
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getProfile, deleteTip } from '../../services/profileService'

const ProfileView = (props, handleDeleteTip) => {
  const [ profileDetails, setProfileDetails ] = useState({})
  const location = useLocation()
  const profile = location.state.profile
  
  useEffect(() => {
    const fetchProfileDetails = async () => {
      const profileData = await getProfile(profile._id)
      setProfileDetails(profileData)
    } 
    fetchProfileDetails()
  }, [profile._id])
  console.log(profileDetails)
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
        
        <h1>Hey Look Its {profileDetails.name}</h1>
        {profile.hangoverTip.length?
        <><h2>Hangover Tip: </h2><>
            {profile.hangoverTip.map(hangoverTip => 
            <>
            <h2>{hangoverTip.title}: {hangoverTip.text}</h2>
            {props.user?.profile === profile?._id &&
              <>
              <button>Rethinking This?</button>
              
              <button onClick={()=> handleDeleteTip(hangoverTip._id)}>Regret this?</button>
              </>
            }</>
            )}
          </></>
        :
        <h2>No Hangover Tips yet</h2>
        }
        {props.user?.profile === profile?._id &&
        <Link to="/hangover-tip" key={profile} >
          <button>Add a new tip?</button>
        </Link>
        }
        <h2>Favorite Drinks:{profile.favoriteDrinks}</h2>
        <h2>Personal Creations:{profile.drinkList}</h2>
      </main>
    </>
  )
}

export default ProfileView