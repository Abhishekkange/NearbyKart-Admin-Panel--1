const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    categoryName:{

        type: String,
        required:true
    }
});

const catgeory = mongoose.model('catgeory',categorySchema);

module.exports = catgeory;
