import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTip } from "../../services/profileService"
import styles from './HangoverTipForm.module.css'

const HangoverTip = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  })

  const handleChange = (e)=> {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit= async (e) => {
    e.preventDefault()
    const tip = await createTip(props.user.profile, formData)
    console.log(tip)
    navigate(-1)
  }

  console.log(formData)

  
  return(
    <>
    <div>
      <h2>{props.user.name}</h2>
      <h3>Tell us how you get by!</h3>
      <div className={styles.profileContainer}>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <label>
            <h3>Whats This Called</h3>
          <input type="text" name="title" id="tip-title"  onChange={handleChange}/>
          </label>
          <label>
            <h3>Whats The Tip </h3> 
            <input type="text" name="text" id="tip-text" onChange={handleChange} />      
          </label>
          <button className='btn btn-sm btn-info' type="submit">Share your secret</button>
        </form>
      </div>
    </div>
    
    </>
    
  )

}

export default HangoverTip