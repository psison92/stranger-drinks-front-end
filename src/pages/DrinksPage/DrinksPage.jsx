const DrinksPage = (props) => {
  return (
    <>
    <h1>Drinks Page</h1>
    <div className='drink-header'>
        {props.drinks.map(drink =>
          <li key={drink.id}>{drink.name}</li>
        )}
      </div>
    
    </>
  )
}

export default DrinksPage;