import Ingredient from './Ingredient';
import  Scrollbars  from 'react-custom-scrollbars-2';



const IngredientList = ({ ingredientList, onDelete, onEdit }) => {
    return (
        <Scrollbars style={{ width: "100%", height: 500 }}>
        <div>
            {
                ingredientList.map((ingredient) => (
                    <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={onDelete} onEdit={onEdit} />
                ))
            }
            </div>
            </Scrollbars>
    )
}
export default IngredientList;