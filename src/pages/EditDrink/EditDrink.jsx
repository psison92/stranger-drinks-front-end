import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './EditDrink.module.css'
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const EditDrink = (props) => {
  const location = useLocation()
  const formElement = useRef()
	const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState(location.state.drink)
  const [recipeData, setRecipeData] = useState([])
  const [singleIngredient, setSingleIngredient] = useState({
		quantity: 0.0,
		unit: '',
		ingredient: {}
	})

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
  const handleChangeIngredient = evt => {
		setSingleIngredient({ ...singleIngredient, [evt.target.name]: evt.target.value })
	}
  const handleUpdateIngredient = evt => {
		evt.preventDefault()
		setRecipeData([...recipeData, singleIngredient])
	 // Reset the ingredients form - this was not updating on the form
		// setSingleIngredient({
		// 	quantity: 0.0,
		// 	unit: '',
		// 	ingredient: {}
		// })
	}
  const handleSingleIngredient = (evt, value) => {
		setSingleIngredient({ ...singleIngredient, 
			ingredient: {
				_id: value._id,
				name: value.name
			}
		})
	}
  const handleCapitalize = str => {
		return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
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
    <form>
				<div>
					<Autocomplete
						isOptionEqualToValue={(option, value) => option.id === value.id} // Fixes Warning
						disablePortal
						id="ingredient-combo-box"
						name="ingredient"
						options={props.ingredients}
						sx={{ width: 300 }}
						getOptionLabel={(option) => 
							handleCapitalize(option.name)
						}
						onChange={(event, newValue) => {
							console.log(newValue)
							handleSingleIngredient(event, newValue)
						}}
						renderInput={(params) => <TextField {...params} label="Ingredients" />}
					/>
					<TextField 
						id="ingredient-quantity" 
						type="number"
						inputProps={{ min: "0", step: "0.25" }} 
						name="quantity" 
						label="Quantity" 
						variant="outlined"
						sx={{ width: 115 }}
						onChange={handleChangeIngredient}
					/>
					<TextField 
						id="ingredient-unit" 
						name="unit" 
						label="Unit of Measurement" 
						variant="outlined"
						sx={{ width: 200 }}
						onChange={handleChangeIngredient}
					/>
					<Fab 
						variant="extended" 
						color="primary" 
						aria-label="add"
						onClick={handleUpdateIngredient}
					>
						<AddIcon sx={{ mr: 0.75 }} />
						Edit Ingredient
					</Fab>
				</div>
			</form>
		</div>
  </>
  )
}

export default EditDrink