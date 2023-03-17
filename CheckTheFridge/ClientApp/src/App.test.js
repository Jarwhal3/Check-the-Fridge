import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ingredientAvailable from './components/RecipeBrowser/getInventory';
import getIngredients from './components/RecipeBrowser/getIngredients';
import { getAllRecipes } from './components/RecipeBrowser/getAllRecipes';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
  await new Promise(resolve => setTimeout(resolve, 1000));
});

const User1 = [
    { Name: "Peanut Butter", Available: false },
    { Name: "Sugar", Available: false },
    { Name: "Egg", Available: false },
    { Name: "Chicken", Available: false },
    { Name: "Buttter", Available: false }
];

const User2 = [
    { Name: "Chicken", Available: false },
    { Name: "White Rice", Available: false },
    { Name: "Siracha", Available: false },
    { Name: "Butter", Available: false }
];

const Recipe = [
    {
        data: {
/*
            "idMeal": "53064",
            "strMeal": "Fettuccine Alfredo",
            "strDrinkAlternate": null,
            "strCategory": "Pasta",
            "strArea": "Italian",
            "strInstructions": "Cook pasta according to package...",
            "strMealThumb": "https:\/\/www.themealdb.com\/images\/media\/meals\/0jv5gx1661040802.jpg",
            "strTags": null,
            "strYoutube": "https:\/\/www.youtube.com\/watch?v=LPPcNPdq_j4",
            */
            strIngredient1: "Fettuccine"
            /*"strIngredient2": "Heavy Cream",

            "strIngredient3": "Butter", "strIngredient4": "Parmesan",
            "strIngredient5": "Parsley", "strIngredient6": "Black Pepper",
            "strIngredient7": "", "strIngredient8": "", "strIngredient9": "",
            "strIngredient10": "", "strIngredient11": "", "strIngredient12": "",
            "strIngredient13": "", "strIngredient14": "", "strIngredient15": "",
            "strIngredient16": "", "strIngredient17": "", "strIngredient18": "",
            "strIngredient19": "", "strIngredient20": "", "strMeasure1": "1 lb",
            "strMeasure2": "1\/2 cup ", "strMeasure3": "1\/2 cup ",
            "strMeasure4": "1\/2 cup ", "strMeasure5": "2 tbsp", "strMeasure6": " ",
            "strMeasure7": " ", "strMeasure8": " ", "strMeasure9": " ",
            "strMeasure10": " ", "strMeasure11": " ", "strMeasure12": " ",
            "strMeasure13": " ", "strMeasure14": " ", "strMeasure15": " ",
            "strMeasure16": " ", "strMeasure17": " ", "strMeasure18": " ",
            "strMeasure19": " ", "strMeasure20": " ",
            "strSource": "https:\/\/www.delish.com\/cooking\/recipe-ideas\/a55312\/best-homemade-fettuccine-alfredo-recipe\/",
            "strImageSource": null,
            "strCreativeCommonsConfirmed": null,
            "dateModified": null*/
        }
    }
]

test('expect availability to be false for null ingredient', () => {
    let ing1 = [{ Name: "", Available: false }];
    let ing = ingredientAvailable(ing1, User1);
    expect(ing[0].Available).toBe(false);
});

test('expect ingredient to be false for close match', () => {
    let ing1 = [{ Name: "Butter", Available: false }];
    let ing = ingredientAvailable(ing1, User1);
    expect(ing[0].Available).toBe(false);
});

test('expect ingredient to be true for correct match', () => {
    let ing1 = [{ Name: "Butter", Available: false }];
    let ing = ingredientAvailable(ing1, User2);
    expect(ing[0].Available).toBe(true);
});

test('expect ALL ingredients to be available for Cookie Recipe', () => {
    const ing1 = [
        { Name: "Peanut Butter", Available: false },
        { Name: "Sugar", Available: false },
        { Name: "Egg", Available: false }
    ];
    let ing = ingredientAvailable(ing1, User1);
    let amount = 0;
    for (let i = 0; i < ing.length; i++) {
        if (ing[i].Available == true) { amount++;}
    }
    expect(amount).toBe(3);
});

test('expect NO ingredients to be available for Cookie Recipe', () => {
    const ing1 = [
        { Name: "Peanut Butter", Available: false },
        { Name: "Sugar", Available: false },
        { Name: "Egg", Available: false }
    ];
    let ing = ingredientAvailable(ing1, User2);
    let amount = 0;
    for (let i = 0; i < ing.length; i++) {
        if (ing[i].Available == true) { amount++; }
    }
    expect(amount).toBe(0);
});

test('expect to fetch ALL recipes', async () => {
    expect(await getAllRecipes()).toHaveLength(284);
})

//User fetch tests:

test('expect user fetch to FAIL with invalid userID', async () => {
    let user = await fetch('ApplicationUser/-1/GetUsers').then(data => {
        expect(deleteResult).toHaveProperty(['ok'], false)
    })
    
})

test('expect user registration, login, and delete to function', async () => {
    const user = await fetch(
        'ApplicationUser/Register/unit/test/username/password',
        { method: 'POST' }
    );
    expect(user).toHaveProperty([ 'ok'], true )

    const userID = await fetch('ApplicationUser/username/password');
    expect(userID).toHaveProperty(['ok'], true)

    const deleteResult = await fetch('ApplicationUser/' + userID, { method: "DELETE" });
    expect(deleteResult).toHaveProperty(['ok'], true)
})
