import { Link } from 'react-router-dom'

const DrinkCard = ({drink, user, handleDeleteDrink}) => {
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{drink.name}</h2>
        <h4 className="card-text">{drink.owner?.name}'s</h4>
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
    </div>
    </>
  )
}

export default DrinkCard