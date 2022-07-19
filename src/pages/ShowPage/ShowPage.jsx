import { useLocation } from "react-router-dom";
import { useState } from "react";
import ShowDrink from "../../components/ShowDrink/ShowDrink";
import AddReview from "../../components/ReviewComponents/AddReview";
import ReviewCard from "../../components/ReviewComponents/ReviewCard";


const ShowPage = (props) => {
  const location = useLocation()
  const drinkData = location.state.drink
  //const [reviewData] = useState([props.reviews])
  const filteredReviewData = props.reviews.filter(review => drinkData._id === review.drink._id)
  
  return (
    <>
    <h5>Drink</h5>
    <h5>{drinkData.name}</h5>
    <h5>{drinkData?.alternateName}</h5>
    <div className="drink-header">

      {filteredReviewData.length ?
      <>
      {filteredReviewData.map(review =>
      <>
        <ReviewCard 
          review={review}
          user={props.user}
          handleDeleteReview={props.handleDeleteReview}
        />
      </>

      )}
      
      </>
      :
      <h5>No Reviews yet</h5>
      }
    </div>
    <AddReview drink={drinkData} handleAddReview={props.handleAddReview}/>
    <div className="drink-header">
      {drinkData.recipe.length ?
      <>
        {drinkData.recipe.map(recipe =>
        <>
          <ShowDrink key={recipe._id} recipe={recipe}/>
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