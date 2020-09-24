import * as searchView from './views/Search_View';
import * as recipeView from './views/Recipe_View';
import * as listView from './views/ShoppingList_View';
import Search from './models/Search';
import List from './models/ShoppingList';
import { clearLoader, elements, renderLoader } from './views/base';
import Recipe from './models/Recipe';
/** Global state of the app
 * 
 * -search object
 * -Current recipe object
 * -Shopping cart object
 * - Favorite object
 */

const state = {};
/**
 * Search bar Controller
 */

const controlSearch = async() => {
   const query = searchView.getInput();

     // Get the query data from SearchView Model
   if(query) {
        // New Search object and add to state
      state.search = new Search(query);
        // Prepare the result for the Ui
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchEl);
      try{
         // Search for the relevant recipes
         // wait the result back to the controller
         await state.search.getResults();
        // Render results on UI
         clearLoader();
         searchView.renderResults(state.search.result);
      }catch(err){
         alert("error happens when search");
      }
   }
};

elements.searchForm.addEventListener('submit', e =>{
    // prevent auto refresh 
   e.preventDefault();
   controlSearch();
});

elements.searchResPages.addEventListener('click', e=> {
   // closest method - find the parent html element
   const btn = e.target.closest('.btn-inline');
   if(btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults(); 
      searchView.renderResults(state.search.result, goToPage);
   }
});

/**
 * Recipe controller
 */
const controlRecipe = async() => {
   // get recipe id from the api
   const id = window.location.hash.replace('#', '');
   if (id) {
      // generate UI elements
      recipeView.clearOldView();
      renderLoader(elements.recipeEl);

      // Highlight the selected entry
      if(state.search){
         searchView.highlightSelected(id);
      }
      

      // Create new recipe object
      state.recipe = new Recipe(id);
      try{
         // Get recipe data
         await state.recipe.getRecipe();
         // Parse the ingredients
         state.recipe.parseIngredients();
         // Calculate servings and time
         state.recipe.calcTime();
         state.recipe.calcServings();
         // Render recipe to the window
         clearLoader();
         recipeView.renderRecipe(state.recipe);
      }catch(e){
         alert('Error inside controlRecipe');
         console.log(e);
      }
   }
};

// Shopping list controller
const controlList = () => {
   if(!state.list) state.list = new List();

   state.recipe.ingredient.forEach(cur => {
      const item = state.list.add(cur.count, cur.unit, cur.ingredientEl);
      listView.renderItem(item);
   });
}

// Handle delete and update buttons of shopping list
elements.shopping.addEventListener('click', e => {
   const id = e.target.closest('.shopping__item').dataset.itemid;

   // handle the delete button
   if(e.target.matches('.shopping__delete, .shopping__delete *')){
      // Delete from state
      state.list.delete(id);

      // Clear the UI
      listView.deleteItem(id);
   // handle the count update
   } else if(e.target.matches('.shopping__count-value')){
      const val = parseFloat(e.target.value);
      state.list.update(id, val);
   }
});


window.addEventListener('hashchange', controlRecipe);

// handle click event for the serving modification
elements.recipeEl.addEventListener('click', e => {
   // use matches method to select handle different buttons
   if(e.target.matches('.btn-decrease, .btn-decrease *')){
      if(state.recipe.servings > 1){
         state.recipe.updateServing('dec');
         recipeView.updateServingsIngredients(state.recipe);
      }
   }else if(e.target.matches('.btn-increase, .btn-increase *')){
      state.recipe.updateServing('inc');
      recipeView.updateServingsIngredients(state.recipe);
   }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
      controlList();
   }
});

