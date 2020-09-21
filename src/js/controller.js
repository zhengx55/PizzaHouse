import * as searchView from './views/Search_View';
import Search from './models/Search';
import { elements } from './views/base';
/** Global state of the app
 * 
 * -search object
 * -Current recipe object
 * -Shopping cart object
 * - Favorite object
 */

const state = {};

const controlSearch = async() => {
   const query = searchView.getInput();

     // Get the query data from SearchView Model
   if(query) {
        // New Search object and add to state
      state.search = new Search(query);

        // Prepare the result for the Ui
      searchView.clearInput();
      searchView.clearResults();
        // Search for the relevant recipes
        // wait the result back to the controller
      await state.search.getResults();

        // Render results on UI
      searchView.renderResults(state.search.result);
   }
}
elements.searchForm.addEventListener('submit', e =>{
    // prevent auto refresh 
   e.preventDefault();
   controlSearch();
});