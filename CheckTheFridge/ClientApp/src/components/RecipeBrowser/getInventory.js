
function ingredientAvailable(ing, user1) {

    for (let i = 0; i < ing.length; i++) {
        for (let j = 0; j < user1.length; j++) {
            if (ing[i].Name == user1[j].name) {
                ing[i].Available = true;
            }
        }
    }
    return ing;
}

export default ingredientAvailable;
