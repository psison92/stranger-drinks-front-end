import { useLocation } from "react-router-dom";
import { useState } from "react";

const ShowPage = () => {
  const location = useLocation()
  console.log(location)
  const [drinkData] = useState(location.state.drink)
  console.log(drinkData)


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
        <p>{review}</p>
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
        <h5>{rec.ingredient}</h5>
        <h5>{rec.quantity}</h5>
        <h5>{rec.unit}</h5>
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