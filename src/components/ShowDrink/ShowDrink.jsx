import styles from './ShowDrink.module.css'

const ShowDrink = ({recipe}) => {

  const handleabvShow = () => {
    if (recipe.ingredient.abv) {
      return '(' + recipe.ingredient.abv + '%)'

    } else
    return ''
  }
  
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h5 className="card-text">{recipe.quantity} {recipe.unit} of <span className={styles.ingredient}>{recipe.ingredient.name}</span> {handleabvShow()}
        </h5>
      </div>
    </div>
    </>
  )
}

export default ShowDrink