import { Link } from 'react-router-dom'

const ReviewCard = ({review, user, drinkData, handleDeleteReview, handleUpdateReview}) => {
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{review.author?.name} says</h2>
        <h3 className="card-text">{review.title}</h3>
        <p className="card-text">{review.content}</p>
        <p className="card-text">Rating: {review.rating}</p>
      </div>
      {user?.profile === review.author?._id &&
        <div className="card-footer">
          <Link
            to="/edit-review"
            className='btn btn-sm btn-warning'
            state={{review}}
          >
            Edit
          </Link>
          <button 
            className="btn btn-sm btn-danger m-left"
            onClick={() => handleDeleteReview(review._id)}
          >
            Delete
          </button>
        </div>
      }
    </div>
    </>
  )
}

export default ReviewCard