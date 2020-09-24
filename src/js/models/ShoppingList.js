import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    };

    /**
     * add new item into the shopping list
     * @param {*} count 
     * @param {*} unit 
     * @param {*} ingredient 
     */
    add (count, unit, ingredient) {
        const item = {
            // create an id for each item 
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    };

    /**
     * To delete item from shopping list
     * @param {*} id 
     */
    delete(id) {
        // find the item that matches the given id
        const index = this.items.findIndex(el => el.id === id);
        // return a new array and mutating the original one -spice();
        this.items.splice(index, 1);
    };

    /**
     * Update information within the shopping list
     * @param {*} id 
     * @param {*} newCount 
     */
    update(id, newCount) {
        this.items.find(cur => cur.id === id).count = newCount;
    };
}