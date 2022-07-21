import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SignupForm.module.css'
import * as authService from '../../services/authService'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SignupForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState({})

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangePhoto = (evt) => {
    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData, photoData.photo)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <TextField
          label="Name"
          type="text"
          autoComplete="off"
          id="name"
          value={name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField 
          type="text"
          autoComplete="off"
          id="email"
          value={email}
          name="email"
          label="Email"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField 
          type="password"
          autoComplete="off"
          id="password"
          value={password}
          name="password"
          label="Password"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          type="password"
          autoComplete="off"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          label="Confirm Password"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <Button variant="contained" component="label">
          Upload Photo
          <input 
            hidden 
            accept="image/*" 
            multiple type="file"
            id="photo-upload"
            name="photo"
            onChange={handleChangePhoto}
            />
        </Button>
      </div>
      <div className={styles.inputContainer}>
        <Button 
          type="submit"
          variant="contained"
          disabled={isFormInvalid()}
        >
        Sign Up
        </Button>
        <Link to="/">
          <Button 
            style={{marginLeft: '5px'}}variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
}

export default SignupForm
