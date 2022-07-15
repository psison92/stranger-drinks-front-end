import { useState, useRef, useEffect } from "react"
import styles from './CreateDrink.module.css'

const CreateDrink = props => {
  const formElement = useRef()
	const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
		name: '',
		alternateName: '',
		ingredients: []
	})
  
	const [photoData, setPhotoData] = useState({})

	const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleSubmit = evt => {
		evt.preventDefault()
    props.handleAddPuppy(formData, photoData.photo)
	}

	const handleChangePhoto = evt => {
		setPhotoData({ photo: evt.target.files[0]}) // type file in form returns in array. we only need first index
	}

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  return (
    <>
    <h1>Mix Drink</h1>
    <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
						Drink's Name (required)
					</label>
					<input 
						type="text"
						className="form-control"
						id="name-input"
						name="name"
            value={formData.name}
            onChange={handleChange}
						required
					/>
				</div>
        <div className="form-group mb-3">
        <label htmlFor="alternateName-input" className="form-label">
						Alternate Name
					</label>
					<input 
						type="text"
						className="form-control"
						id="alternateName-input"
						name="alternateName"
            value={formData.alternateName}
            onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="photo-upload" className="form-label">
						Upload Photo
					</label>
					<input 
						type="file"
						className="form-control"
						id="photo-upload"
						name="photo"
            value={formData.photo}
            onChange={handleChangePhoto}
					/>
				</div>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Add Your Drink
					</button>
				</div>
			</form>
    </>
  )
}

export default CreateDrink
