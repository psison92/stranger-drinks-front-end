import { Link } from 'react-router-dom'
import ShowDrink from '../ShowDrink/ShowDrink'


const DrinkCard = ({drink, user, handleDeleteDrink}) => {
  const recipeList = drink.recipe.map(recipe => {
    return <ShowDrink key={recipe._id} recipe={recipe} />
  })
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{drink.owner?.name}'s Drink</h2>
        <h4 className="card-text">{drink.name}</h4>
        <h5>{recipeList}</h5>
      </div>
      {user?.profile === drink.owner?._id &&
        <div className="card-footer">
          <Link
            to="/edit"
            className='btn btn-sm btn-warning'
            state={{drink}}
          >
            Edit
          </Link>
          <button 
            className="btn btn-sm btn-danger m-left"
            onClick={() => handleDeleteDrink(drink._id)}
          >
            Delete
          </button>
        </div>
      }
          <Link
            to={`/drinks/${drink._id}`}
            className='btn btn-sm btn-info'
            state={{drink}}      
            > Details
          </Link>
    </div>
    </>
  )
}

export default DrinkCard