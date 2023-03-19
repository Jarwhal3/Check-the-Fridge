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
        const match = ingredientList.find(temp => ingredient.name === temp.name);
        if (match === undefined) {
            console.log("Ing no exist");
            addIngredient(ingredient);
            }
        else if (match !== undefined) {
            if (match.description == 'None') {
                match.description = '';
            }
            match.notes = match.description + '\n' + ingredient.notes 
            match.quantity += ingredient.quantity;
            console.log("Ingredient Exists, added one to quantity");
            addIngredientQuantity(match);
        }
       
    }

    async function addIngredientQuantity(ingredient) {
        await fetch(('Ingredient/Edit/' + ingredient.id + '?Description=' + ingredient.notes + '&&' + 'Quantity=' + ingredient.quantity).replace('#', '%23'),
                { method: 'PUT' })
                .then((response) => {
                    if (response.ok) {
                        console.log('Ingredient edit');
                        getIngredientList();
                    }
                    else { throw new Error('Ingredient not edit.', response.json()); }
                })
                .catch((error) => { console.log(error); });

        
    }

    async function addIngredient(ingredient) {
        if (!ingredient.notes) {
            ingredient.notes = "None"
        }
            console.log(ingredient.notes);

            await fetch(encodeURI('Ingredient/Add/' + ingredient.name + '/' + ingredient.notes +
                '/' + ingredient.quantity + '/' + ingredient.id + '/' + userID).replace('#','%23'),
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
 async function deleteIngredient(id){
      await fetch('Ingredient?Id=' + id,
          { method: 'DELETE' })
          .then((response) => {
              if (response.ok) {
                  console.log('Ingredient Deleted');
                  getIngredientList();
              }
              else { throw new Error('Ingredient not deleted.', response.json()); }
          })
          .catch((error) => { console.log(error); });
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
              Enter an ingredient from your fridge (...or pantry)
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
