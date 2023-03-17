
function getIngredients(recipe) {

    let ingredients = []
    if (recipe.data.strIngredient1 != "" && recipe.data.strIngredient1 != null) {
        ingredients.push({ Name: recipe.data.strIngredient1, Amount: recipe.data.strMeasure1, Available: false });
    }
    if (recipe.data.strIngredient2 != "" && recipe.data.strIngredient2 != null) {
        ingredients.push({ Name: recipe.data.strIngredient2, Amount: recipe.data.strMeasure2, Available: false });
    }
    if (recipe.data.strIngredient3 != "" && recipe.data.strIngredient3 != null) {
        ingredients.push({ Name: recipe.data.strIngredient3, Amount: recipe.data.strMeasure3, Available: false });
    }
    if (recipe.data.strIngredient4 != "" && recipe.data.strIngredient4 != null) {
        ingredients.push({ Name: recipe.data.strIngredient4, Amount: recipe.data.strMeasure4, Available: false });
    }
    if (recipe.data.strIngredient5 != "" && recipe.data.strIngredient5 != null) {
        ingredients.push({ Name: recipe.data.strIngredient5, Amount: recipe.data.strMeasure5, Available: false });
    }
    if (recipe.data.strIngredient6 != "" && recipe.data.strIngredient6 != null) {
        ingredients.push({ Name: recipe.data.strIngredient6, Amount: recipe.data.strMeasure6, Available: false });
    }
    if (recipe.data.strIngredient7 != "" && recipe.data.strIngredient7 != null) {
        ingredients.push({ Name: recipe.data.strIngredient7, Amount: recipe.data.strMeasure7, Available: false });
    }
    if (recipe.data.strIngredient8 != "" && recipe.data.strIngredient8 != null) {
        ingredients.push({ Name: recipe.data.strIngredient8, Amount: recipe.data.strMeasure8, Available: false });
    }
    if (recipe.data.strIngredient9 != "" && recipe.data.strIngredient9 != null) {
        ingredients.push({ Name: recipe.data.strIngredient9, Amount: recipe.data.strMeasure9, Available: false });
    }
    if (recipe.data.strIngredient10 != "" && recipe.data.strIngredient10 != null) {
        ingredients.push({ Name: recipe.data.strIngredient10, Amount: recipe.data.strMeasure10, Available: false });
    }
    if (recipe.data.strIngredient11 != "" && recipe.data.strIngredient11 != null) {
        ingredients.push({ Name: recipe.data.strIngredient11, Amount: recipe.data.strMeasure11, Available: false });
    }
    if (recipe.data.strIngredient12 != "" && recipe.data.strIngredient12 != null) {
        ingredients.push({ Name: recipe.data.strIngredient12, Amount: recipe.data.strMeasure12, Available: false });
    }
    if (recipe.data.strIngredient13 != "" && recipe.data.strIngredient13 != null) {
        ingredients.push({ Name: recipe.data.strIngredient13, Amount: recipe.data.strMeasure13, Available: false });
    }
    if (recipe.data.strIngredient14 != "" && recipe.data.strIngredient14 != null) {
        ingredients.push({ Name: recipe.data.strIngredient14, Amount: recipe.data.strMeasure14, Available: false });
    }
    if (recipe.data.strIngredient15 != "" && recipe.data.strIngredient15 != null) {
        ingredients.push({ Name: recipe.data.strIngredient15, Amount: recipe.data.strMeasure15, Available: false });
    }
    if (recipe.data.strIngredient16 != "" && recipe.data.strIngredient16 != null) {
        ingredients.push({ Name: recipe.data.strIngredient16, Amount: recipe.data.strMeasure16, Available: false });
    }
    if (recipe.data.strIngredient17 != "" && recipe.data.strIngredient17 != null) {
        ingredients.push({ Name: recipe.data.strIngredient17, Amount: recipe.data.strMeasure17, Available: false });
    }
    if (recipe.data.strIngredient18 != "" && recipe.data.strIngredient18 != null) {
        ingredients.push({ Name: recipe.data.strIngredient18, Amount: recipe.data.strMeasure18, Available: false });
    }
    if (recipe.data.strIngredient19 != "" && recipe.data.strIngredient19 != null) {
        ingredients.push({ Name: recipe.data.strIngredient19, Amount: recipe.data.strMeasure19, Available: false });
    }
    if (recipe.data.strIngredient20 != "" && recipe.data.strIngredient20 != null) {
        ingredients.push({ Name: recipe.data.strIngredient20, Amount: recipe.data.strMeasure20, Available: false });
    }
    return ingredients;
}

export default getIngredients