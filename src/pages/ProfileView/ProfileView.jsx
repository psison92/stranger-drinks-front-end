import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getDetails } from '../../services/profileService'

const ProfileView = ({ profile }) => {
  // const setProfileView = useState({})
  // const location = useLocation()
  
  // useEffect(() => {
  //   const profileDetails = async () => {
  //     const profileData = await getDetails(location.state.profile.url)
  //     setProfileView(profileData)
  //   }
  //   profileDetails()
  // },[location.state.profile.url])
  
  return (
    <>
      <main>
        <h1> hey look its </h1>
        <h2></h2>
      </main>
    </>
    
  )
}

export default ProfileView