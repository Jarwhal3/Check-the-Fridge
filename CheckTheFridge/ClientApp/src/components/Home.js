import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';



export function Home() {

    const [ingredientValues, setIngredientValues] = useState([]);


    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json())
            .then(data => {
                setIngredientValues({ label: `${data.meals[0].strMeal}`, instructions: `${data.meals[0].strInstructions}`, pic: `${data.meals[0].strMealThumb}` });
      
            })
    
    }, []);


    return (
      <div>
            <h1>Try a random recipe today!</h1>
            <Container>
                <Row>
                    <Col>
                        <h2>{ingredientValues.label}</h2>
                        <img src={ingredientValues.pic}></img>

                    </Col>

                    <Col>
                        {ingredientValues.instructions}
                    </Col>
                </Row>
            </Container>

      </div>
    );

}
