import AddIngredient from '.././AddIngredient.js';
import getIngredients from './getIngredients.js'

//const userID = sessionStorage.getItem('items');

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
export function checkForIngredientMatch(recipe, userIngredients) {

    //This line is necessary to make the getIngredients() function work with the recipe format:
    let obj = { data: recipe }

    let recipeIngredients = getIngredients(obj);
    var i = 0;
    let match = false;

    //Do-While loop goes through each
    do {
        //Compare each user ingredient to a single ingredient of the recipe:
        for (const element in userIngredients) {
            match = userIngredients[element].name === recipeIngredients[i].Name

            //If we find a match, break early to save time:
            if (match)
                break
        }
        ++i;
    } while (i < recipeIngredients.length && match === true)

    return match
}


export async function getMatchingRecipes() {
    const userID = sessionStorage.getItem("items");
    //First fetch all recipes and the user ingredients:
    let [allRecipes, userIngredients] = await Promise.all([getAllRecipes(), fetch('ApplicationUser/' + userID + '/GetUserIngredients').then(res => res.json())])
    
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