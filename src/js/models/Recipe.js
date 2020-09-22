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
        const newIngredients = this.ingredient.map(el => {
            
        })
    }
}