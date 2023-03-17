import { render, screen } from "@testing-library/react";
import AddIngredient from "./IngredientForm";

test('on render', () => {
    render(<AddIngredient />);

    screen.debug();
})
