module.exports = function Cart(initItems) {
    this.items = initItems;

    this.totalQty = 0;

    if(this.items) {
        for(var key in this.items) {
            this.totalQty += this.items[key].qty;
        }
    }

    //add new items to the cart
    this.add = function (item, id, qty) {
        var storedItem = this.items[id];

        //if an item doesn't already exist in the cart, then assign default values to the variables
        if(!storedItem) {
            storedItem = this.items[id] = {qty: 0, item: item, price: 0};
        }

        //aggregate quantities and prices of items
        storedItem.qty += qty;
        storedItem.price = parseFloat(storedItem.item.price * storedItem.qty).toFixed(2);
        this.totalQty += storedItem.qty;
    };

    //get the total no. of products in the cart
    this.getTotalQty = function(){
        return this.totalQty;
    }

    //loop through the array of cart items
    this.lookupItems = function () {
        var arr = [];
        for(var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};