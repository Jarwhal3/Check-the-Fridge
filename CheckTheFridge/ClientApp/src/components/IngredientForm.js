import React, { useState, onSubmit, Component, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import IngredientList from './IngredientList';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const AddIngredient = ({ onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [id, setid] = useState(0);
    const [selectedName, setSelectedName] = useState(null);
    const [ingVal, setIngVal] = useState([])

    const handleChange = (selectedOption) => {
        setName(selectedOption.label);
        setDescription(selectedOption.description);
        setid(selectedOption.id);
        setSelectedName(selectedOption);

    };

    
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`).then(res => res.json())
            .then(data => {
                const temp = [];
                data.meals.forEach((ing) => {
                    temp.push({ label: `${ing.strIngredient}`, value: `${ing.strIngredient}`, id: `${ing.idIngredient}`, description: `${ing.strDescription}` });
                });
                setIngVal(temp)
            })
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        if (!name && !description) {
            console.log('Ingredient and description not added');        
        } else if (!name && description) {
            console.log('Ingredient not added');
        } else if (name && !description) {
            console.log('Description not added');
        } else {
            onSave({ name, description, quantity, id });
        }
        setName('');
        setSelectedName(null);
        setDescription('');
        setQuantity(1);
        setid('');

    }

    const updateQuantity = (val) => {
        setQuantity(quantity + val)}

    return (

        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label for="ingredient">Ingredient</Label>
                <Select value={selectedName} options={ingVal} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input id="description" type="text" placeholder="add ingredient description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Container className="d-flex justify-content-start gx-0">
                    <Row className="gx-0" style={{ width: "50%" }}>
                        <Col md={3}><Button outline color="secondary" style={{ width: "100%" }} onClick={() => updateQuantity(-1)}>-</Button></Col>
                        <Col md={4}><Input className="text-center" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}></Input></Col>
                        <Col md={3}><Button outline color="secondary" style={{ width: "100%" }}  onClick={() => updateQuantity(1)}>+</Button></Col>
                    </Row>
                </Container>
            </FormGroup>
            <Button type="submit" className="mt-2" style={{width: "100%"}}>Submit</Button>
         </Form>
    )
}
export default AddIngredient