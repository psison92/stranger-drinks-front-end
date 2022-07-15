import { useState, useRef, useEffect } from "react"

const AddIngredient = (props) => {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: 0,
		typeOfMeasurement: '',
		abv: 0,
  })

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddIngredient(formData)
  }

	return (
		<>
			<h1>Add Ingredient</h1>
			<form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
						Ingredient Name (required)
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
					<label htmlFor="type-input" className="form-label">
						Type:
					</label>
					<input 
						type="text"
						className="form-control"
						id="type-input"
						name="type"
            value={formData.type}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="age-input" className="form-label">
						Quantity:
					</label>
					<input 
						type="number"
						className="form-control"
						id="quantity-input"
						name="quantity"
            value={formData.quantity}
            onChange={handleChange}
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="type-input" className="form-label">
						Type of Measurement (required)
					</label>
					<input 
						type="text"
						className="form-control"
						id="typeOfMeasurement-input"
						name="typeOfMeasurement"
            value={formData.typeOfMeasurement}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="age-input" className="form-label">
						ABV(%):
					</label>
					<input 
						type="number"
						className="form-control"
						id="abv-input"
						name="abv"
            value={formData.abv}
            onChange={handleChange}
					/>
				</div>
				<div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Add Ingredient
					</button>
				</div>
			</form>
		</>
	)
}

export default AddIngredient