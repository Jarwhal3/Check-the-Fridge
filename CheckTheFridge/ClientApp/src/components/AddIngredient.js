import React, { Component, useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import { v4 as uuidv4 } from 'uuid';
import IngredientList from './IngredientList';
import { Container, Row, Col } from 'reactstrap';

export function AddIngredient() {
    const [ingredientList, setIngredientList] = useState([]);
    const [duplicate, setDuplicate] = useState({});
    const userID = sessionStorage.getItem('items');

    useEffect(() => {
        getIngredientList();
    }, []);

    async function getIngredientList() {
        fetch('Ingredient/GetIngredients').then((results) => { return results.json(); })
            .then((data) => {
                const userIngredients = [];
                data.forEach((ing) => {
                    if (ing.appUserId == userID) {
                        userIngredients.push(ing);
                    }
                });
                setIngredientList(userIngredients);
            });
    }


    function checkDuplicate(ingredient) {
        const temp = ingredientList.find(temp => ingredient.name === temp.name);

        if (temp === undefined) {
            console.log("Ing no exist");
            addIngredient(ingredient);
            }
        else if (temp !== undefined)  {
            temp.quantity += 1;
            console.log("Ingredient Exists, added one to quantity");
            addIngredientQuantity(temp);
        }
       
    }



    async function addIngredientQuantity(ingredient) {
        console.log(ingredient.quantity);
            await fetch('Ingredient/Edit/' + ingredient.id,
                { method: 'PUT' })
                .then((response) => {
                    if (response.ok) {
                        console.log('Ingredient edit');
                    }
                    else { throw new Error('Ingredient not edit.', response.json()); }
                })
                .catch((error) => { console.log(error); });

        
    }

    async function addIngredient(ingredient) {
            await fetch('Ingredient/Add/' + ingredient.name + '/' + ingredient.description +
                '/' + ingredient.quantity + '/' + ingredient.id + '/' + userID,
                { method: 'POST' })
                .then((response) => {
                    if (response.ok) {
                        console.log('Ingredient created');
                        getIngredientList();
                    }
                    else { throw new Error('Ingredient not created.', response.json()); }
                })
                .catch((error) => { console.log(error); });   
        
    }

  // Delete Ingredient
  const deleteIngredient = (id) => {
    const deleteIngredient = ingredientList.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredientList(deleteIngredient);
    console.log('Deleted an ingredient');
    localStorage.setItem('ingredientAdded', JSON.stringify(deleteIngredient));
  };

  // Edit Ingredient
  const editIngredient = (id) => {
    const name = prompt('Ingredient');
    const desc = prompt('Description');
    let data = JSON.parse(localStorage.getItem('ingredientAdded'));
    const myData = data.map((x) => {
      if (x.id === id) {
        return {
          ...x,
          name: name,
          desc: desc,
          id: uuidv4(),
        };
      }
      return x;
    });
    console.log('Ingredient edited');
    localStorage.setItem('IngredientAdded', JSON.stringify(myData));
    window.location.reload();
  };

  return (
    <Container>
      <Row>
        <React.Fragment>
          <Col className='border rounded p-5 mx-2 mt-3'>
            <h1 style={{ textAlign: 'center' }}>New Ingredient</h1>
            <h5 className='m-4' style={{ textAlign: 'center' }}>
              Enter the ingredient name, description, and quantity about the
              ingredient to add to your fridge.
            </h5>
            <IngredientForm onSave={checkDuplicate} />
          </Col>
          <Col className='border rounded p-5 mx-2 mt-3'>
            <h1 style={{ textAlign: 'center' }}>
              Ingredient List: {ingredientList.length}
            </h1>
            {ingredientList.length > 0 ? (
              <IngredientList
                ingredientList={ingredientList}
                onDelete={deleteIngredient}
                onEdit={editIngredient}
              />
            ) : (
              'No Ingredients Found!'
            )}
          </Col>
        </React.Fragment>
      </Row>
    </Container>
  );
}
