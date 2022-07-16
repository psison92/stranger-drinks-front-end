import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './EditDrink.module.css'

const EditDrink = (props) => {
  const location = useLocation()
  const formElement = useRef()
	const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState(location.state.drink)

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
		evt.preventDefault()
    props.handleUpdateDrink(formData)
	}



  return (
    <>
    <div className={styles.container}>
			<h1>Mix Drink</h1>
			<form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div>
					<TextField
						required
						name="name"
						id="name-input"
						label="Name Required"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div>
					<TextField
						name="alternateName"
						id="alternateName-input"
						label="Alternate Name"
						value={formData.alternateName}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-4">
					<Button variant="contained" component="label">
						Upload Photo
						<input 
							hidden 
							accept="image/*" 
							multiple type="file"
							id="photo-upload"
							name="photo"
							/>
					</Button>
				</div>
				<div className="d-grid">
					<Button 
						type="submit"
						variant="contained"
						disabled={!validForm}
					>
						Edit Your Drink
					</Button>
          <Link
						to="/drinks"
						className="btn btn-danger btn-fluid"
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
  </>
  )
}

export default EditDrink