
function ingredientAvailable(ing, user1) {

    for (let i = 0; i < ing.length; i++) {
        for (let j = 0; j < user1.length; j++) {
            //tempIng = tempIng.toUpperCase()
            if (ing[i].Name.toUpperCase() == user1[j].name.toUpperCase()) {
                ing[i].Available = true;
            }
        }
    }
    return ing;
}

export default ingredientAvailable;
