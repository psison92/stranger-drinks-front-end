import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as profileService from '../../services/profileService'
import styles from './ProfileView.module.css'



import { getProfile } from '../../services/profileService'

const ProfileView = (props) => {
  const [profiles, setProfiles] = useState([])
  const location = useLocation()
  const profile = location.state.profile
  
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
      <main className={styles.mainContainer}>
        <h1>{profiles.name}</h1>
        {profiles.hangoverTip?.length?
        <>
        <h2>Hangover Tip:</h2><>
            {profiles.hangoverTip.map(hangoverTip => 
            <>
            <div key={hangoverTip._id}>
              <h2>{hangoverTip.title}: {hangoverTip.text}</h2>
            </div>
            {props.user?.profile === profiles?._id &&
              <>
              <Link to="/hangover-tip" key={profiles._id}>
                <button className='btn btn-sm btn-warning' onClick={() => handleDeleteTip(hangoverTip._id)}>Replace This?</button>
              </Link>

                <button className="btn btn-sm btn-danger m-left" onClick={() => handleDeleteTip(hangoverTip._id)}>Delete this?</button>
              </>
            }</>
            )}
          </></>
        :
        <><h2>No Hangover Tips yet</h2><>
            {props.user?.profile === profiles?._id &&
              <Link to="/hangover-tip" key={profiles._id}>
                <button className='btn btn-sm btn-info'>Add a new tip?</button>
              </Link>}
          </></>
        }
        <h2>Personal Creations:</h2>
        {drinkList.map( drinkList =>
        <div key={drinkList._id}>
          <Link to="/drinks" key={drinkList._id}>
            <h3 className={styles.drinkList}>{drinkList.name}</h3>
          </Link>
        </div>
          )}
      </main>
    </>
  )
}

export default ProfileView