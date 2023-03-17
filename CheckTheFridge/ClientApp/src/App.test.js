import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ingredientAvailable from './components/RecipeBrowser/getInventory';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
  await new Promise(resolve => setTimeout(resolve, 1000));
});

const User1 = [
    { Name: "Peanut Butter", Available: false },
    { Name: "Sugar", Available: false },
    { Name: "Egg", Available: false },
    { Name: "Chicken", Available: false },
    { Name: "Buttter", Available: false }
];

const User2 = [
    { Name: "Chicken", Available: false },
    { Name: "White Rice", Available: false },
    { Name: "Siracha", Available: false },
    { Name: "Butter", Available: false }
];

test('expect availability to be false for null ingredient', () => {
    let ing1 = [{ Name: "", Available: false }];
    let ing = ingredientAvailable(ing1, User1);
    expect(ing[0].Available).toBe(false);
});

test('expect ingredient to be false for close match', () => {
    let ing1 = [{ Name: "Butter", Available: false }];
    let ing = ingredientAvailable(ing1, User1);
    expect(ing[0].Available).toBe(false);
});

test('expect ingredient to be true for correct match', () => {
    let ing1 = [{ Name: "Butter", Available: false }];
    let ing = ingredientAvailable(ing1, User2);
    expect(ing[0].Available).toBe(true);
});

test('expect ALL ingredients to be available for Cookie Recipe', () => {
    const ing1 = [
        { Name: "Peanut Butter", Available: false },
        { Name: "Sugar", Available: false },
        { Name: "Egg", Available: false }
    ];
    let ing = ingredientAvailable(ing1, User1);
    let amount = 0;
    for (let i = 0; i < ing.length; i++) {
        if (ing[i].Available == true) { amount++;}
    }
    expect(amount).toBe(3);
});

test('expect NO ingredients to be available for Cookie Recipe', () => {
    const ing1 = [
        { Name: "Peanut Butter", Available: false },
        { Name: "Sugar", Available: false },
        { Name: "Egg", Available: false }
    ];
    let ing = ingredientAvailable(ing1, User2);
    let amount = 0;
    for (let i = 0; i < ing.length; i++) {
        if (ing[i].Available == true) { amount++; }
    }
    expect(amount).toBe(0);
});