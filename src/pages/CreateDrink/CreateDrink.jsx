import { useState, useRef, useEffect } from "react"
import styles from './CreateDrink.module.css'

// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const CreateDrink = (props) => {
  const formElement = useRef()
	const [validForm, setValidForm] = useState(false)
	const [recipeData, setRecipeData] = useState([])

	const [singleIngredient, setSingleIngredient] = useState({
		quantity: 0.0,
		unit: '',
		ingredient: {}
	})

	const handleChangeIngredient = evt => {
		setSingleIngredient({ ...singleIngredient, [evt.target.name]: evt.target.value })
	}

	const handleSingleIngredient = (evt, value) => {
		setSingleIngredient({ ...singleIngredient, 
			ingredient: {
				_id: value._id,
				name: value.name
			}
		 })
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
	 // Reset the ingredients form - this was not updating on the form
		// setSingleIngredient({
		// 	quantity: 0.0,
		// 	unit: '',
		// 	ingredient: {}
		// })
	}

	const handleDeleteIngredient = (idx) => {
		console.log(idx)
		console.log(recipeData)
		setRecipeData(recipeData.filter((ing, index) => index !== idx))
		console.log("New", recipeData)

	}

	// RegEx Example from
	// https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
	const handleCapitalize = str => {
		return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
	}

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
						options={props.ingredients}
						sx={{ width: 300 }}
						getOptionLabel={(option) => 
							handleCapitalize(option.name)
						}
						onChange={(event, newValue) => {
							console.log(newValue)
							handleSingleIngredient(event, newValue)
						}}
						renderInput={(params, idx) => <TextField {...params} label="Ingredients" />}
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
			<div>
				{recipeData.length > 0 ?
				<>
					<h3>Current Ingredients: </h3>
					<ul className={styles.recipeData}>
					{recipeData.map( ( measurement, idx ) =>
						<>
							<div className={styles.recipeDataBorderLeft}></div>
							<li className={styles.recipeDataList} key={`measurement-${idx}`}>
								<div className={styles.ingredientName}><span>Name:</span> { handleCapitalize(measurement.ingredient.name) }</div>
								<TextField 
									id={`ingredient-quantity-${idx}`}
									key={`ingredient-quantity-${idx}`} // FIXME Might be overkill
									type="number"
									inputProps={{ min: "0", step: "0.25" }} 
									name="quantity" 
									label="Quantity" 
									variant="outlined"
									sx={{ width: 115 }}
									value={measurement.quantity}
									onChange={handleChangeIngredient}
								/>
								<TextField 
									id={`ingredient-unit-${idx}`}
									key={`ingredient-unit-${idx}`}
									name="unit" 
									label="Unit of Measurement" 
									variant="outlined"
									sx={{ width: 200 }}
									value={measurement.unit}
									onChange={handleChangeIngredient}
								/>
								<Fab 
									variant="extended" 
									color="primary" 
									size="small"
									aria-label="add"
									onClick={() => handleDeleteIngredient(idx)}
									>
									<DeleteForeverIcon 
										fontSize="small" 
										sx={{ mr: 0.25 }}
									/>
								</Fab>
								<hr className={styles.recipeDataLine}></hr>
							</li>
						</>
					)}
					</ul>
				</>
				:
				<>No ingredients yet</>
				}
			</div>
		</div>
  )
}

export default CreateDrink
