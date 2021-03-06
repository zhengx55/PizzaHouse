export const elements = {
    // store all the DOM elements
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchEl: document.querySelector('.results'),
    searchResults: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipeEl: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list')
};
// html objects store here
export const elementString = {
    loader: 'loader'
};

// function to create the spin loader
export const renderLoader = parent => {
    const loader = `
    <div class="${elementString.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></user>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

// function used to clear the spin loader
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}
