/*import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import IngredientList from "./IngredientList";
import { editIngredient } from "./AddIngredient";


test("Test Edit Button", () => {
    const tempingredient = {
        name: "Avo",
        description: "temp desc",
        id: 100,
        quantity: 2
    };

    render(<IngredientList ingredient={tempingredient} onEdit={editIngredient} />);

    const newIngredient = editIngredient;

    const nameText = screen.getByText(/Ingredient: Avo/i);
    expect(nameText).toBeInTheDocument();


});
*/