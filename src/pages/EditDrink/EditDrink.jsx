import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './EditDrink.module.css'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const EditDrink = (props) => {
  const location = useLocation()
	const formElement = useRef()
	const [validForm, setValidForm] = useState(false)

	const buttonWidth = '10rem'
	const buttonHeight = '3rem'

  const [formData, setFormData] = useState(location.state.drink)
	const [photoData, setPhotoData] = useState({})
	const handleChangePhoto = evt => {
		setPhotoData({ photo: evt.target.files[0]})
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
    props.handleUpdateDrink({...formData}, photoData.photo)
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

	const handleDeleteIngredient = (idx) => {
		const newFormData = {...formData}
		newFormData.recipe = formData.recipe.filter((ing, index) => index !== idx)
		setFormData(newFormData)
	}

	// RegEx Example from
	// https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
	const handleCapitalize = str => {
		return str?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
	}

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  return (
    <div className={styles.container}>
			<h1>Edit Drink</h1>
			<form ref={formElement} onSubmit={handleSubmit}>
				<div>
					<TextField
						required
						name="name"
						id="name-input"
						label="Name Required"
						autoComplete="off"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div>
					<TextField
						name="alternateName"
						id="alternateName-input"
						autoComplete="off"
						label="Alternate Name"
						value={formData.alternateName}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Fab 
					variant="extended" 
					color="primary" 
					aria-label="add"
					sx={{ 
						marginBottom: '1.5rem',
					}}
					onClick={handleAddIngredient}
				>

					<AddIcon sx={{ mr: 0.75 }} />
					Add Another Ingredient
				</Fab>
					<h3>Current Ingredients: </h3>
					<ul className={styles.recipeData}>
					{formData.recipe.map( ( item, idx ) =>
						<div key={`itemKey-${idx}`}>
							<div className={styles.recipeDataBorderLeft}></div>
							<li className={styles.recipeDataList} key={`item-${idx}`}>
								<Autocomplete
									isOptionEqualToValue={(option, value) => option.id === value.id}
									disablePortal
									
									id="ingredient-combo-box"
									name="ingredient"
									
									options={props.ingredients}
									sx={{ width: 300 }}
									value={item.ingredient}
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
									required
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
									required
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
						</div>
					)}
					</ul>
				</div>
				<div>
					<Button variant="contained" component="label">
						Upload New Photo
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
						size="medium"
					>
						Edit Your Drink
					</Button>
				<div className={styles.cancelbutton}>
					<Button 
						type="submit"
						variant="contained"
						color="error"
						size="medium"
						sx={{ 
							marginTop: '0.5rem',
							width: buttonWidth,
							height: buttonHeight
						}}
					>
					<Link
						to="/drinks"
					>
						Cancel
						</Link>
					</Button>
					</div>
				</div>
			</form>
		</div>
  )
}

export default EditDrink