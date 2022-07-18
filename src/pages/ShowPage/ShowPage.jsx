import { useLocation } from "react-router-dom";
import { useState } from "react";
import ShowDrink from "../../components/ShowDrink/ShowDrink";


const ShowPage = () => {
  const location = useLocation()
  const [drinkData] = useState(location.state.drink)


  return (
    <>
    <h5>Drink</h5>
    <h5>{drinkData.name}</h5>
    <h5>{drinkData?.alternateName}</h5>
    <div className="drink-header">
      {drinkData.reviews.length ?
      <>
      {drinkData.reviews.map(review =>
      <>
        <p key={review._id}>{review}</p>
      </>

      )}
      
      </>
      :
      <h5>No Reviews yet</h5>
      }
    </div>
    <div className="drink-header">
      {drinkData.recipe.length ?
      <>
      {drinkData.recipe.map(rec =>
      <>
      <ShowDrink key={rec._id} rec={rec}/>
      </>
      )}
      </>
      :
      <h5>No Recipe Yet</h5>
      }
    </div>
    </>
  )
}

export default ShowPage