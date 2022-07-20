import { useLocation } from "react-router-dom";
import AddReview from "../../components/ReviewComponents/AddReview";
import ReviewCard from "../../components/ReviewComponents/ReviewCard";


const ShowPage = (props) => {
  const location = useLocation()
  const drinkData = location.state.drink
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
          key={review._id}
          review={review}
          user={props.user}
          handleDeleteReview={props.handleDeleteReview}
          handleUpdateReview={props.handleUpdateReview}
        />
      </>

      )}
      
      </>
      :
      <h5>No Reviews yet</h5>
      }
    </div>
    <div>
    <AddReview drink={drinkData} handleAddReview={props.handleAddReview}/> 
    </div>
    </>
  )
}

export default ShowPage