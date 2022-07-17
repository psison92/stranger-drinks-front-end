import { Link } from 'react-router-dom'

const ReviewCard = ({review}) => {
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{review.author?.name} says</h2>
        <h3 className="card-text">{review.title}</h3>
        <p className="card-text">{review.content}</p>
        <p className="card-text">Rating: {review.rating}</p>
      </div>
    </div>
    </>
  )
}

export default ReviewCard