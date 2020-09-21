import { mark } from "regenerator-runtime";
import { elements } from "./base";
// get the input from the search field
// global
export const getInput = () => elements.searchInput.value;

export const clearInput =() => {
    elements.searchInput.value = '';
};

// clear the results of previous search
export const clearResults = () => {
    elements.searchResults.innerHTML = '';
};

// local
// set the limits of characters which is acceptable
const limitTitle = (title, limit = 17) => {
    const titleArray = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                titleArray.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${titleArray.join(' ')}...`
    }
    return title;
};

const renderSingleRep = recipe => {
    const markup = ` 
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResults.insertAdjacentHTML('beforeend',markup);
};

export const renderResults = recipes => {
    recipes.forEach(cur => renderSingleRep(cur));
};