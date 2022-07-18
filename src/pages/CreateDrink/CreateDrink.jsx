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
	const formElementIngredient = useRef()

	const [validForm, setValidForm] = useState(false)
	const [validIngredient, setValidIngredient] = useState(false)

  const [formData, setFormData] = useState({
		name: '',
		alternateName: '',
		recipe: [{
			unit: '',
			quantity: 0.0,
			ingredient: null
		}],
		photo: ''
	})


	// const handleChangeIngredient = (evt, value) => {
	// 	console.log(evt.target.name)
	// 	console.log(evt.target.value)
	// 	setSingleIngredient({ ...singleIngredient, [evt.target.name]: value })
	// }

	// const handleSingleIngredient = (evt, value) => {
	// 	setSingleIngredient({ ...singleIngredient, 
	// 		ingredient: {
	// 			_id: value._id,
	// 			name: value.name
	// 		}
	// 	 })
	// }

	const [photoData, setPhotoData] = useState({})
	const handleChangePhoto = evt => {
		setPhotoData({ photo: evt.target.files[0]}) // type file in form returns in array. we only need first index
	}


	const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

	const handleChangeIngredient = (evt, idx, value=evt.target.value) => {
		const newFormData = { ...formData }
		if (evt.target.name) {
			newFormData.recipe[idx][evt.target.name] = value
		} else {
			newFormData.recipe[idx].ingredient = value
		}
		setFormData({...newFormData })
		console.log(newFormData)
	}

  const handleSubmit = evt => {
		evt.preventDefault()
		formData.recipe.forEach(e => e.ingredient = e.ingredient._id)
		console.log(formData)
    props.handleAddDrink({...formData}, photoData.photo)
	}

	const handleAddIngredient = () => {
		const newFormData = { ...formData }

		const newRecipeData = {
			unit: '',
			quantity: 0.0,
			ingredient: null
		}

		newFormData.recipe.unshift(newRecipeData)
		setFormData({...newFormData })
	}
	
		// setFormData([...formData.recipe, ])


// 	const handleEditIngredient = (evt, value, idx) => {
// 		evt.preventDefault()
// 		setRecipeData([...recipeData, recipeData[idx] = handleSingleIngredient(value)])
// }

	// const handleDeleteIngredient = (idx) => {
	// 	console.log(idx)
	// 	console.log(recipeData)
	// 	setRecipeData(recipeData.filter((ing, index) => index !== idx))
	// 	console.log("New", recipeData)

	// }

	// RegEx Example from
	// https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
	const handleCapitalize = str => {
		return str?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
	}

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

	// useEffect(() => {
	// 	formElementIngredient.current.checkValidity() ? setValidIngredient(true) : setValidIngredient(false)
	// }, [singleIngredient])

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
					<h3>Current Ingredients: </h3>
					<ul className={styles.recipeData}>
					{formData.recipe.map( ( item, idx ) =>
						<>
							<div className={styles.recipeDataBorderLeft}></div>
							<li className={styles.recipeDataList} key={`item-${idx}`}>
								{/* <div className={styles.ingredientName}><span>Name:</span> { handleCapitalize(item.ingredient.name) }</div> */}
								<Autocomplete
									isOptionEqualToValue={(option, value) => option.id === value.id} // Fixes Warning
									disablePortal
									
									id="ingredient-combo-box"
									name="ingredient"
									
									options={props.ingredients}
									sx={{ width: 300 }}
									value={item.ingredient}
									inputValue={handleCapitalize(item.ingredient?.name)}
									getOptionLabel={(option) => 
										handleCapitalize(option.name)
									}
									onChange={(event, newValue) => {
										handleChangeIngredient(event, idx, newValue)
									}}
									renderInput={(params) => <TextField required {...params} label="Ingredients" />}
								/>
								<TextField 
									id={`ingredient-quantity-${idx}`}
									key={`ingredient-quantity-${idx}`} // FIXME Might be overkill
									type="number"
									inputProps={{ min: "0", step: "0.25" }} 
									name="quantity" 
									label="Quantity" 
									variant="outlined"
									sx={{ width: 115 }}
									value={item.quantity}
									onChange={(evt => {
										handleChangeIngredient(evt, idx)
									})}
								/>
								<TextField 
									id={`ingredient-unit-${idx}`}
									key={`ingredient-unit-${idx}`}
									name="unit" 
									label="Unit of Measurement" 
									variant="outlined"
									sx={{ width: 200 }}
									value={item.unit}
									onChange={(evt => {
										handleChangeIngredient(evt, idx)
									})}								
								/>
								{/* conditional render for index 0 */}
								<Fab 
									variant="extended" 
									color="primary" 
									aria-label="add"
									// disabled={!validIngredient}
									onClick={handleAddIngredient}
								>

									<AddIcon sx={{ mr: 0.75 }} />
									Add Ingredient
								</Fab>
								{/* <Fab 
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
								</Fab> */}
								<hr className={styles.recipeDataLine}></hr>
							</li>
						</>
					)}
					</ul>
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
			{/* <form ref={formElementIngredient} onSubmit={handleAddIngredient}>
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
						renderInput={(params) => <TextField required {...params} label="Ingredients" />}
					/>
					<TextField 
						id="ingredient-quantity" 
						type="number"
						required
						inputProps={{ min: "0", step: "0.25" }} 
						name="quantity" 
						label="Quantity" 
						variant="outlined"
						sx={{ width: 115 }}
						onChange={handleChangeIngredient}
					/>
					<TextField
						required
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
						disabled={!validIngredient}
						type="submit"
					>

						<AddIcon sx={{ mr: 0.75 }} />
						Add Ingredient
					</Fab>
				</div>
			</form> */}
		</div>
  )
}

export default CreateDrink
