const mongoose = require('mongoose');

const addToStoreSchema = mongoose.Schema({

    name: {
        type: String,
        
    },
    image:{

        type:String
    },
    categories: [
        {
            categoryName: String,
            categoryImage: String
        }
    ],
    subcategories: [
        {
            subcategoryName: String,
            subcategoryImage: String
        }
    ],
    price: {
        type: String,
        
    },
    shopName: {
        type: String,
        
    },

    shortDescription: {
        type: String,
       
    },
    description: {

        type: String,
        
    },
    designNumber: {
        type: String,
        
    },

    sizes: [{
        
        size:String
    }],

    colors:[{

        colorName: String,
        colorCode: String
       
    }],

    discount: {

        type: String,
       
    }


});

const addToStore = mongoose.model('product',addToStoreSchema);

module.exports = addToStore;
