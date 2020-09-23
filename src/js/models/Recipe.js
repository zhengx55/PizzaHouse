import axios from 'axios';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredient = res.data.recipe.ingredients;
        }catch(error){
            console.log(error);
            alert("wrong");
        }
    }

    calcTime() {
        // calculate length of ingredients
        const numIng = this.ingredient.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        const newIngredients = this.ingredient.map(element => {
            // Uniform units
            let ingredientEl = element.toLowerCase();
            unitsLong.forEach((cur, index) => {
                // replace elements from the recipe.ingredients with the abbreviation
                ingredientEl = ingredientEl.replace(cur, unitsShort[index]);
            });
            // Remove parentheses from the query, use regex
            ingredientEl = ingredientEl.replace(/ *\([^)]*\) */g, " ");

            // Parse ingredients into count, unit and ingredient
            const arrIng = ingredientEl.split(' ');
            // test for if each element is in the unitsShort array
            // will return the index if the function includes() returns true
            const unitIndex = arrIng.findIndex(el => units.includes(el));
            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    console.log(arrCount);
                    count = eval(arrIng[0].replace('-', '+')).toFixed(2);
                } else {
                    //('2', '4').join('+') = '2+4'
                    // eval("4 + 1/2") --> 4.5
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                    console.log(arrCount);
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredientEl: arrIng.slice(unitIndex + 1).join(' ')
                };
            } else if(parseInt(arrIng[0], 10)){
                // There is No unit, but 1st el is a number
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredientEl: arrIng.slice(1).join(' ')
                };
            } else if(unitIndex === -1) {
                // There is No unit and No number at the 1st element
                objIng = {
                    count: 1,
                    unit: '',
                    ingredientEl
                };
            }   
            return objIng;
        });
        this.ingredients = newIngredients;
        console.log(newIngredients);
    }
}