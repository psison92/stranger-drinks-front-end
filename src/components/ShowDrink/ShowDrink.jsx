const ShowDrink = (props) => {
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h5 className="card-text">{props.rec.ingredient.name}</h5>
        <h5 className="card-text">{props.rec.quantity}</h5>
        <h5 className="card-text">{props.rec.unit}</h5>
      </div>
    </div>
    </>
  )
}

export default ShowDrink