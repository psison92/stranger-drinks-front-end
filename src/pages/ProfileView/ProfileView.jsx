
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as profileService from '../../services/profileService'



import { getProfile } from '../../services/profileService'

const ProfileView = (props) => {
  const [profiles, setProfiles] = useState([])
  const location = useLocation()
  const profile = location.state.profile
  const drinklist = props.drinks.filter( drink => drink.owner._id !== profiles._id )
  
  
  useEffect(() => {
    const fetchProfileDetails = async () => {
      const profileData = await getProfile(profile._id)
      setProfiles(profileData)
    }
    fetchProfileDetails(profiles)

  }, [profile._id])

  const handleDeleteTip = async (tipId) => {
    const updatedProfile = await profileService.deleteTip(tipId)
    setProfiles(profile)
  }

  const drinkList = props.drinks.filter( drink => drink.owner._id === profiles._id )
  
  console.log(drinkList)
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
        
        <h1>Hey Look Its {profiles.name}</h1>
        {profiles.hangoverTip?.length?
        <>
        <h2>Hangover Tip:</h2><>
            {profiles.hangoverTip.map(hangoverTip => 
            <>
            <h2>{hangoverTip.title}: {hangoverTip.text}</h2>
            {props.user?.profile === profiles?._id &&
              <>
              <Link to="/hangover-tip-edit" key={profile}>
                <button>Rethinking This?</button>
              </Link>

              {/* <Link to="/hangover-tip" key={profile} > */}
                <button onClick={() => handleDeleteTip(hangoverTip._id)}>Regret this?</button>
              {/* </Link> */}
              </>
            }</>
            )}
          </></>
        :
        <><h2>No Hangover Tips yet</h2><>
            {props.user?.profile === profiles?._id &&
              <Link to="/hangover-tip" key={profiles._id}>
                <button>Add a new tip?</button>
              </Link>}
          </></>
        }
        <h2>Personal Creations:</h2>
        {drinkList.map( drinkList =>
            <h3>{drinkList.name}</h3>
          )}
      </main>
    </>
  )
}

export default ProfileView