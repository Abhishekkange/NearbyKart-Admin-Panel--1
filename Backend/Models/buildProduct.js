const mongoose = require('mongoose');

const buildProductSchema = mongoose.Schema({

    name: {
        type: String,
        
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
       
    },
    image:{

        type: String


    }


});

const buildProduct = mongoose.model('buildProduct',buildProductSchema);

module.exports = buildProduct;
