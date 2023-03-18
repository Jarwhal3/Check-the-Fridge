import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Ingredient from "./Ingredient";


test("Display Ingredient Test", () => {
    const tempingredient = {
        name: "Avo",
        description: "temp desc",
        id: 100,
        quantity: 2
    };

    render(<Ingredient ingredient={tempingredient}/>);

    const nameText = screen.getByText(/Ingredient: Avo/i);
    expect(nameText).toBeInTheDocument();

    const descriptionText = screen.getByText(/Description: temp desc/i);
    expect(descriptionText).toBeInTheDocument();

    const idText = screen.getByText(/ID: 100/i);
    expect(idText).toBeInTheDocument();

    const quantityText = screen.getByText(/Quantity: 2/i);
    expect(quantityText).toBeInTheDocument();
});
