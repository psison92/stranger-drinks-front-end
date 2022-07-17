import ReviewCard from './ReviewCard'

const ReviewsPage = (props) => {
  return (
    <>
    <h1>Reviews</h1>
    <div className='drink-header'>
        {props.reviews.map(review =>
        <ReviewCard 
        key={review.id}
        review={review}
        user={props.user}
        />
        )}
      </div>
    </>
  )
}

export default ReviewsPage;