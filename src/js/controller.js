import * as searchView from './views/Search_View';
import Search from './models/Search';
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
   console.log(id);
   if (id) {
      // generate UI elements
      // Create new recipe object
      state.recipe = new Recipe(id);
      try{
         // Get recipe data
         await state.recipe.getRecipe();
         // Calculate servings and time
         state.recipe.calcTime();
         state.recipe.calcServings();
         // Render recipe to the window
      }catch(e){
         alert('Error inside controlRecipe');
         console.log(e);
      }
   }
};

window.addEventListener('hashchange', controlRecipe);
