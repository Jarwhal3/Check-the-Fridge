import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Ingredient from "./Ingredient";

const tempingredient = {
    name: "Avo",
    desc: "temp desc",
    id: 1,
    quan: 2
};

test("Display Ingredient Test", () => {
    render(<Ingredient ingredient={tempingredient}/>);

    const ingText = screen.getByText(/Ingredient: Avo/i);
    expect(ingText).toBeInTheDocument();
});
