const ShowDrink = (props) => {

  const handleabvShow = () => {
    if (props.rec.ingredient.abv) {
      return '(' + props.rec.ingredient.abv + '%)'

    } else
    return ''
  }
  
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h5 className="card-text">{props.rec.quantity} {props.rec.unit} of {props.rec.ingredient.name} {handleabvShow()}
        </h5>
      </div>
    </div>
    </>
  )
}

export default ShowDrink