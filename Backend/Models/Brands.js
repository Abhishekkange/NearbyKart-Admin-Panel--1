const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({

    brandName:{

        type: String,
        required:true
    }
});

const brand = mongoose.model('brand',brandSchema);

module.exports = brand;
