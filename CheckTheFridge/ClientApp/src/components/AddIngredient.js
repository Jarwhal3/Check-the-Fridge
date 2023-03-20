import React, { Component, useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';

export function AddIngredient() {
    const [ingredientList, setIngredientList] = useState([]);
    const [duplicate, setDuplicate] = useState({});
    const userID = sessionStorage.getItem('items');
    const [modal, setModal] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState({});
    const [currentName, setCurrentName] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);



    const toggle = (ingredient) => {
        setModal(!modal);
        setCurrentIngredient(ingredient);
        setCurrentName(ingredient.name);
    }


    const updateQuantity = (val) => {
        setNewQuantity(newQuantity + val)
    }

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
                        console.log('Ingredient quantity duplicated edit');
                        getIngredientList();
                    }
                    else { throw new Error('Ingredient not duplicate edit.', response.json()); }
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
  async function editIngredient(){

      await fetch(('Ingredient/Edit/' + currentIngredient.id + '?Description=' + newNotes + '&&' + 'Quantity=' + newQuantity).replace('#', '%23'),
          { method: 'PUT' })
          .then((response) => {
              if (response.ok) {
                  console.log('Ingredient edit');
                  getIngredientList();
              }
              else { throw new Error('Ingredient not edit.', response.json()); }
          })
      .catch((error) => { console.log(error); });
      setModal(!modal);
      setNewQuantity(0);
      setNewNotes('');


  };

    return (
        <Container>
            <Row>
                <React.Fragment>
                    <Col className='border rounded p-5 mx-2 mt-3'>
                        <h1 style={{ textAlign: 'center' }}>New Ingredient</h1>
                        <h5 className='m-4' style={{ textAlign: 'center' }}>Enter an ingredient from your fridge (...or pantry)</h5>
                        <IngredientForm onSave={checkDuplicate} />
                    </Col>
                    <Col className='border rounded p-5 mx-2 mt-3'>

                        <h1 style={{ textAlign: 'center' }}>Total Ingredients: {ingredientList.length}</h1>

                        {ingredientList.length > 0 ? (
                            <IngredientList ingredientList={ingredientList} onDelete={deleteIngredient} onEdit={toggle} />
                        ) : ('No Ingredients Found!')}

                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}> Edit Ingredient: {currentName} </ModalHeader>
                            <ModalBody>
                              <Label>Notes</Label>
                              <Input value={newNotes} onChange={(e) => setNewNotes(e.target.value)}></Input>
                              <Label>Quantity</Label>
                                <Container className="d-flex justify-content-start gx-0">
                                    <Row className="gx-0" style={{ width: "50%" }}>
                                        <Col md={4}><Button outline color="secondary" style={{ width: "100%" }} onClick={() => updateQuantity(-1)}>-</Button></Col>
                                        <Col md={4}><Input className="text-center" type="text" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)}></Input></Col>
                                        <Col md={4}><Button outline color="secondary" style={{ width: "100%" }} onClick={() => updateQuantity(1)}>+</Button></Col>
                                    </Row>
                                </Container>

                          </ModalBody>
                          <ModalFooter>
                              <Button onClick={editIngredient}>Save Changes</Button>
                          </ModalFooter>
                      </Modal>
          </Col>
        </React.Fragment>
      </Row>
    </Container>
  );
}
