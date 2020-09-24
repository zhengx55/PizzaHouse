import { elements } from './base';
import { Fraction } from 'fractional'


export const clearOldView = () => {
    elements.recipeEl.innerHTML = '';
}
// use the fractional package to convert the decimal into the fractional number
const formatCount = count => {
    // check if there is a count
    if(count){
        const [int, dec] = count.toString().split('.').map(cur => parseInt(cur, 10));
        // if not decimal exists the return the count
        if(!dec) return count;

        if(int === 0) {
            const frCount = new Fraction(count);
            return `${frCount.numerator}/${frCount.denominator}`;
        } else {
            const frCount = new Fraction(count - int);
            return `${int} ${frCount.numerator}/${frCount.denominator}` ;
        }
    }
    return 'unknown';
};

const creatIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count) }</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.ingredientEl}
        </div>
    </li>`;
export const renderRecipe = recipe => {
    const markup = `
        <figure class="recipe__fig">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredient.map(el => creatIngredient(el)).join('')}
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;
    elements.recipeEl.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients = recipe => {
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // update ingredients
    const countElement = Array.from(document.querySelectorAll('.recipe__count'));
    countElement.forEach((cur, index) => {
        cur.textContent = formatCount(recipe.ingredient[index].count);
    });
}