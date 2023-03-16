import AddIngredient from '.././AddIngredient.js';
import getIngredients from './getIngredients.js'

//This function gets -all- recipes from the API. From what I could tell,
//there was no built-in way to do this. So this searches each letter, 
//and appends all the results to one list.
export async function getAllRecipes() {

    let recipes = new Array();

    for (var i = 9, alph = ''; ++i < 36;) {
        alph = i.toString(36);

        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alph}`)
            .then(res => res.json())
            .then(data => {
                try {
                    if (data.meals) {
                       for (const element of data.meals) {
                           recipes.push(element);
                        }
                    }
                }
                catch (err) {console.log(err) }
            })
    }

    return recipes;
}

//This checks to see if the user can make a recipe given what is in their fridge.
//Right now it only checks if they have the ingredient, it does not consider if they
//have enough of the ingredient.
function checkForIngredientMatch(recipe, userIngredients) {

    //This line is necessary to make the getIngredients() function work with the recipe format:
    let obj = { data: recipe }

    let recipeIngredients = getIngredients(obj);
    var i = 0;
    let match = false;

    do {
        for (const element in userIngredients) {
            //console.log("Comparing ", userIngredients[element].name, "to ", recipeIngredients[i][0])
            match += userIngredients[element].name === recipeIngredients[i][0]
        }
        ++i;
        //console.log("Match === ", match)
    } while (i < recipeIngredients.length && match === true)

    return match
}


export async function getMatchingRecipes() {
    //First fetch all recipes and the user ingredients:
    let [allRecipes, userIngredients] = await Promise.all([getAllRecipes(), fetch('Ingredient/GetIngredients').then(res => res.json())])

    let match = false;
    let matchedRecipes = new Array();

    //Iterate through the recipes, pushing any matches into an array to be returned:
    for (const currRecipe of Object.keys(allRecipes)) {
        match = checkForIngredientMatch(allRecipes[currRecipe], userIngredients)

        if (match) {
            matchedRecipes.push(allRecipes[currRecipe])
        }
    }

    console.log("End of getMatchingRecipes, matchedRecipes = ", matchedRecipes)

    return matchedRecipes
}