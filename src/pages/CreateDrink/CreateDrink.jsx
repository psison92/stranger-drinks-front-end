import { useState, useRef, useEffect } from "react"
import styles from './CreateDrink.module.css'

// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const ingredients = [
  { _id: '62d1a60d051fdbfcd0eddcaa', label: 'Rum'},
];

const CreateDrink = props => {
  const formElement = useRef()
	const [validForm, setValidForm] = useState(false)

	const [recipeData, setRecipeData] = useState([])

	const [singleIngredient, setSingleIngredient] = useState({
		name: '',
		quantity: 0.0,
		unit: '',
		ingredient: '62d1a60d051fdbfcd0eddcaa'
	})

	const handleChangeIngredient = evt => {
		setSingleIngredient({ ...singleIngredient, [evt.target.name]: evt.target.value })
	}

  const [formData, setFormData] = useState({
		name: '',
		alternateName: '',
		recipe: recipeData,
		photo: ''
	})

	const [photoData, setPhotoData] = useState({})

	const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleSubmit = evt => {
		evt.preventDefault()
    props.handleAddDrink({...formData, recipe: recipeData}, photoData.photo)
	}

	const handleChangePhoto = evt => {
		setPhotoData({ photo: evt.target.files[0]}) // type file in form returns in array. we only need first index
	}

	const handleAddIngredient = evt => {
		evt.preventDefault()
		setRecipeData([...recipeData, singleIngredient])
	 // Reset the ingredients form
		setSingleIngredient({
			name: '',
			quantity: 0.0,
			unit: '',
			ingredient: {}
		})
	}

	console.log(recipeData)

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  return (
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
				<div>
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
				<div>
					<Button 
						type="submit"
						variant="contained"
						disabled={!validForm}
					>
						Add Your Drink
					</Button>
				</div>
			</form>
			<form>
				<div>
					<Autocomplete
						isOptionEqualToValue={(option, value) => option.id === value.id} // Fixes Warning
						disablePortal
						id="ingredient-combo-box"
						name="ingredient"
						options={ingredients}
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Ingredients" />}
						// onChange={handleChangeIngredient}
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
						onClick={handleAddIngredient}
					>
						<AddIcon sx={{ mr: 0.75 }} />
						Add Ingredient
					</Fab>
				</div>
			</form>
		</div>
  )
}

export default CreateDrink
