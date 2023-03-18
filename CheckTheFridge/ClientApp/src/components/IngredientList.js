import Ingredient from './Ingredient';
import Scrollbars from 'react-custom-scrollbars-2';
import { Button, Row, Col, Container } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';




const IngredientList = ({ ingredientList, onDelete, onEdit }) => {
    return (
        <Scrollbars style={{ width: "100%", height: 500 }}>
            {
                ingredientList.map((ingredient) => (
                    <ListGroup>
                        <ListGroupItem>
                            <Container>
                                <Ingredient key={ingredient.id} ingredient={ingredient}/>
                                <Row>
                                    <Col><Button className="w-100" onClick={() => onEdit(ingredient.id)}>Edit</Button></Col>
                                    <Col><Button className="w-100" onClick={() => onDelete(ingredient.id)}>Delete</Button></Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                    </ListGroup>))
            }
        </Scrollbars>)
}

export default IngredientList;