import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getProfile } from '../../services/profileService'

const ProfileView = () => {
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
      <h1>Hey Look Its {profileDetails.name}</h1>
    </>
  )
}

export default ProfileView