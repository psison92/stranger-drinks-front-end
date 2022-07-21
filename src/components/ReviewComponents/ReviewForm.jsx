import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import * as authService from '../../services/authService'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ReviewForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  })
  const navigate = useNavigate()

  const handleChange = e => {
    props.updateMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <TextField 
          type="text"
          autoComplete="off"
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField 
          type="password"
          autoComplete="off"
          id="password"
          value={formData.pw}
          name="pw"
          onChange={handleChange}
          label="Password"
        />
      </div>
      <div>
        <Button 
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
          <Button 
              style={{marginLeft: '5px'}}variant="contained"
              color="error"
          >
          </Button>
      </div>
    </form>
  )
}

export default ReviewForm
