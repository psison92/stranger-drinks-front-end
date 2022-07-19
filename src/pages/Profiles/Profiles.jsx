import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  return (
    <>
      <h1>Hello. This is a list of all the profiles.</h1>
      {profiles.length ? 
        <>
          {profiles.map(profile => 
          <Link to='/profile-view' key={profile._id} state={{ profile }}>
            <div>
            <h2>{profile.name}</h2>
            </div>
          </Link>
            )}
        </>
      :
        <p>No profiles yet</p>
      }
    </>
  )
}

export default Profiles