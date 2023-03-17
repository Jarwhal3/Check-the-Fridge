import React from "react";
import { useState, useEffect } from "react";
import RecipeItem from "./RecipeItem";
import './recipeBrowseStyles.css';
import { getAllRecipes, getMatchingRecipes } from "./getAllRecipes.js";

const Recipe = () => {
    const userID = sessionStorage.getItem('items');
    const [search, setSearch] = useState("");
    const [recipe, setRecipe] = useState();
    const [userIngredients, setUserIngredients] = useState([]);

    async function getIngredientList() {
        fetch('Ingredient/GetIngredients')
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                const userIngredients = [];
                data.forEach((ing) => {
                    if (ing.appUserId == userID) {
                        userIngredients.push(ing);
                    }
                });
                setUserIngredients(userIngredients);
            });
    }

    useEffect(() => {
        getIngredientList();
    },[recipe]);
    const searchMeal = (evt) => {
        if (evt.key == "Enter") {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(res => res.json()).then(data => { console.log("Data.meals: ", data.meals);  setRecipe(data.meals); setSearch("") })
        }
       
    }

    const displayMatchingMeals = () => {
            getMatchingRecipes().then(res => {
                console.log("Returned recipe list: ", res); setRecipe(res)
            });
    }

    const displayAllMeals = (evt) => {        
        if (evt.key == "Enter") {
            getAllRecipes().then(res => { console.log("Res: ", res); setRecipe(res) });
        }
    }

    return (
        <>
            <div className="main">
                <div className="heading">
                    <h1>Search for a Recipe</h1>
                    <h4>Get inspired by other recipes to create your own or find new ones to add to your recipes list!</h4>
                </div>
                <div className="searchBox">
                    <input type="search" className="search-bar" placeHolder="Enter item" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchMeal} />
                </div>

                <div className="button">
                    <input type="button" value="Get matching recipes" className="button" onClick={displayMatchingMeals} />
                </div>

                <h3>Results:</h3>
                <div className="container">
                    {
                        (recipe == null) ? <p className="notSearch">Not found</p> :
                            recipe.map((res) => {
                                return (
                                    <RecipeItem data={res} user={userIngredients} />)
                            }
                            )
                    }
                </div>
            </div>
        </>
    )
}
export default Recipe;