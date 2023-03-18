
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Row, Col, Container } from 'reactstrap';


const Ingredient = ({ ingredient, onDelete, onEdit }) => {
    return (
        <ListGroup className="task">
            <ListGroupItem>
                <div>
                    <p className="ingredientName">Ingredient: {ingredient.name}</p>
                    <p className="ingredientDesc"><span className="textBold">Description:</span> {ingredient.description}
                    </p>
                    <p className="ingredientID"><span className="textBold">ID:</span> {ingredient.id}
                    </p>
                    <p className="ingredientQuan"><span className="textBold">Quantity:</span> {ingredient.quantity}
                    </p>
                </div>
                <Container>
                    <Row>
                        <Col><Button className="w-100" onClick={() => onEdit(ingredient.id)}>Edit</Button></Col>
                        <Col><Button className="w-100" onClick={() => onDelete(ingredient.id)}>Delete</Button></Col>
                    </Row>
                </Container>
                </ListGroupItem>
            </ListGroup>
    )
}
export default Ingredient;