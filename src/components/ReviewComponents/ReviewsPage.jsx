import ReviewCard from './ReviewCard'

const ReviewsPage = (props) => {
  return (
    <>
    <h1>Reviews</h1>
    <div className='drink-header'>
        {props.reviews.map(review =>
        <ReviewCard 
          key={review._id}
          review={review}
          user={props.user}
          handleDeleteReview={props.handleDeleteReview}
        />
        )}
      </div>
    </>
  )
}

export default ReviewsPage;