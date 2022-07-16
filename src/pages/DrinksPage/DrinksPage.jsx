import DrinkCard from "../../components/DrinkCard/DrinkCard";
import './DrinksPage.css'

const DrinksPage = (props) => {
  return (
    <>
    <h1>Drinks Page</h1>
    <div className='drink-header'>
        {props.drinks.map(drink =>
        <DrinkCard 
        key={drink.id}
        drink={drink}
        user={props.user}
        handleDeleteDrink={props.handleDeleteDrink}
        />
        )}
      </div>
    </>
  )
}

export default DrinksPage;