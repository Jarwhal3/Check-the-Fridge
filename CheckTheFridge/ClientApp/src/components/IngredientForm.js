import React, { useState, onSubmit, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const IngredientForm = ({ onSave }) => {
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [id, setid] = useState(0);
    const [selectedName, setSelectedName] = useState(null);
    const [ingredientValues, setIngredientValues] = useState([])
    const [errorMessage, setErrorMessage] = useState(false);

    const handleChange = (selectedOption) => {
        setName(selectedOption.label);
        setid(selectedOption.id);
        setSelectedName(selectedOption);
        setErrorMessage(false);
    };

    
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`).then(res => res.json())
            .then(data => {
                const temp = [];
                data.meals.forEach((ing) => {
                    temp.push({ label: `${ing.strIngredient}`, value: `${ing.strIngredient}`, id: `${ing.idIngredient}`, notes: `${ing.strDescription}` });
                });
                setIngredientValues(temp)
            })
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            console.log('Ingredient not added');
            setErrorMessage(true);
        } else {
            onSave({ name, notes, quantity, id });
            setErrorMessage(false);
        }
        setName('');
        setSelectedName(null);
        setNotes('');
        setQuantity(1);
        setid('');

    }

    const updateQuantity = (val) => {
        setQuantity(quantity + val)
    }

    return (

        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for="ingredient">Ingredient</Label>
                <Select value={selectedName} onMenuOpen={ () => setSelectedName(null) } options={ingredientValues} onChange={handleChange}/>
                {errorMessage && <Label style={{ color: "red" }}>Please select an ingredient.</Label>}
            </FormGroup>
            <FormGroup>
                <Label for="notes">Notes</Label>
                <Input id="notes" type="text" placeholder="Optional Notes." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Container className="d-flex justify-content-start gx-0">
                    <Row className="gx-0" style={{ width: "50%" }}>
                        <Col md={4}><Button outline color="secondary" style={{ width: "100%" }} onClick={() => updateQuantity(-1)}>-</Button></Col>
                        <Col md={4}><Input className="text-center" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}></Input></Col>
                        <Col md={4}><Button outline color="secondary" style={{ width: "100%" }}  onClick={() => updateQuantity(1)}>+</Button></Col>
                    </Row>
                </Container>
            </FormGroup>
            <Button type="submit" className="mt-2" style={{width: "100%"}}>Submit</Button>
         </Form>
    )
}
export default IngredientForm