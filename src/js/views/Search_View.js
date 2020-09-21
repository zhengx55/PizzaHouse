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
    elements.searchResPages.innerHTML = '';
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
    elements.searchResults.insertAdjacentHTML('beforeend', markup);
};

// create the page buttons
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type ==='prev' ? page - 1: page + 1}>
        <span>Page ${type ==='prev' ? page - 1: page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>
        
    </button>
    `;

// private function used to render the page buttons
const renderButtons = (page, numOfRes, resPerPage) => {
    // round the number up
    let button;
    const pages = Math.ceil(numOfRes / resPerPage);
    if(page === 1){
        // at the first page
        button = createButton(page, 'next');
    } else if (page < pages){
        // middle page
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1){
        // at the last page   
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // 10 recipes per page as default
    // render results from the current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(cur => renderSingleRep(cur));

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};