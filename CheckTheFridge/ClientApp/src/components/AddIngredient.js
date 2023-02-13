import React, { Component, useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import { v4 as uuidv4 } from 'uuid';
import IngredientList from './IngredientList';


export function AddIngredient() {

    const [ingredientList, setIngredientList] = useState([]);


    const getIngredientList = JSON.parse(localStorage.getItem("ingredientAdded"));
    useEffect(() => {
        if (getIngredientList == null) {
            console.log('Ingredient list is empty')
            setIngredientList([])
        } else {
            setIngredientList(getIngredientList);
        }
    }, [])

    // Add Ingredient
    const addIngredient = (ingredient) => {
        const id = uuidv4();
        const newIngredient = { id, ...ingredient }
        setIngredientList([...ingredientList, newIngredient]);
        localStorage.setItem("ingredientAdded", JSON.stringify([...ingredientList, newIngredient]));
        console.log('Local ingredient saved')
    }

    // Delete Ingredient
    const deleteIngredient = (id) => {
        const deleteIngredient = ingredientList.filter((ingredient) => ingredient.id !== id);
        setIngredientList(deleteIngredient);
        console.log('Deleted an ingredient')
        localStorage.setItem("ingredientAdded", JSON.stringify(deleteIngredient));
    }

    // Edit Ingredient
    const editIngredient = (id) => {
        const name = prompt("Ingredient");
        const desc = prompt("Description");
        let data = JSON.parse(localStorage.getItem('ingredientAdded'));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    name: name,
                    desc: desc,
                    id: uuidv4()
                }
            }
            return x;
        })
        console.log('Ingredient edited')
        localStorage.setItem("IngredientAdded", JSON.stringify(myData));
        window.location.reload();
    }

        return (
            <React.Fragment>
                <IngredientForm onSave={addIngredient} />
                <h2>Ingredient List: {ingredientList.length}</h2>
                {
                    ingredientList.length > 0 ?
                        (<IngredientList ingredientList={ingredientList} onDelete={deleteIngredient} onEdit={editIngredient} />) :
                        ('No Ingredients Found!')
                }
            </React.Fragment>
        );

};
