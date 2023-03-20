const Ingredient = ({ ingredient }) => {
    return (
        <div>
            <p className="ingredientName">Ingredient: {ingredient.name}</p>
            <p className="ingredientDesc">Notes: {ingredient.description}</p>
            <p className="ingredientID">ID: {ingredient.id}</p>
            <p className="ingredientQuan">Quantity: {ingredient.quantity}</p>
        </div>
    )
}

export default Ingredient;