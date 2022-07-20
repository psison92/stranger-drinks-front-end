import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function getProfile(profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()

}
async function createTip(profileId, formData) {
  console.log('it connects')
  const res = await fetch(`${BASE_URL}/${profileId}/hangover-tip`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-type' : "application/json"
    },
      body: JSON.stringify(formData)
    })
  console.log('it works')
    
    console.log(profileId)
    return await res.json()
  }

  async function deleteTip(profileId) {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  }

async function addPhoto(photoData, profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
  return await res.json()
  
}

export { getAllProfiles, addPhoto , getProfile, createTip, deleteTip}
