
/*
* RECIPE CONTROLLER
*/

const controlRecipe = async() => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
  renderLoader(elements.recipe);

  //Highlight selected search item
  if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
    // Get recipe data  and parse ingredients
    await state.recipe.getRecipe();
    state.recipe.parseIngredients();

    // Calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();

  // Render recipe
   clearLoader();
   recipeView.renderRecipe(
     state.recipe,
     state.likes.isLiked(id)
   );
 } catch (err) {
   console.log(err);
    alert('Error processing recipe');
 }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/*
* LIST CONTROLLER
*/
const controlList = () => {
  // Create a  new list if there is none yet
  if  (!state.list) state.list = new List();

  //Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
}

//Handle delete and update list item event
elements.shopping.addEventListener('click', e => {
   const id = e.target.closest('.shopping__item').dataset.itemid;

   // Handle the delete button
   if (e.target.matches('.shopping__delete, .shopping__delete *')) {
     // Delete from state
    state.list.deleteItem(id);
     // Delete from UI
     listView.deleteItem(id);

     // Handle the count update
   } else if (e.target.matches('.shopping__count-value')) {
     const val = parseFloat(e.target.value, 10);
       state.list.updateCount(id, val);
   }
});

/**
* LIKE CONTROLLER
*/

const controlLike = () =>  {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

 // User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
const newLike = state.likes.addLike(
  currentID,
  state.recipe.title,
  state.recipe.author,
  state.recipe.img
);
    //Toggle the like button
likesView.toggleLikeBtn(true);
    // Add like to UI list
    likesView.renderLike(newLike);

    // User HAS liked current recipe
  } else {
    // Remove like from the state
 state.likes.deleteLike(currentID);
    // Toggle the like buttons
    likesView.toggleLikeBtn(false);

   // Remove like from UI list
   likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener('load', () => {
  state.likes = new Likes();

  // Restore likes
  state.likes.readStorage();

  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // Render the existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
});

// Handlings recipes buttons clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
    state.recipe.updateServings('dec');
    recipeView.updateServingsIngredients(state.recipe);
     }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase button is clicked
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      // Add ingredients to shopping list
      controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
       // Like controller
       controlLike();
    }
});
