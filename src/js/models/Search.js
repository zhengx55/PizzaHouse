import axios from 'axios';
export default class Search {
    constructor(query){
        this.query = query;
    }
    // use axios since fetch doesn't work at old browser
    async getResults(query) {
        // no key require for the forkify-api
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
        }catch(error){
            alert(error);
        }
    }
}
