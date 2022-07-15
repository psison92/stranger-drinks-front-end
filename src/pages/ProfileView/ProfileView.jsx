import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getDetails } from '../../services/profileService'
import styles from './ProfileView.module.css'

const ProfileView = (props) => {
  const [profileView, setProfileView] = useState({})
  const location = useLocation()
  
  useEffect(() => {
    const profileDetails = async () => {
      const profileData = await getDetails(location.state.profile.url)
      setProfileView(profileData)
    }
    profileDetails()
  },[location.state.profile.url])
  
  return (
    <>
      <main>
        <h1> hey look its {props.profile.name} </h1>
        <h2>AAAAAAAAAAAAAAAAAAAAAAAAA</h2>
      </main>
    </>
    
  )
}

export default ProfileView