const mongoose = require('mongoose');

const SubcategorySchema = mongoose.Schema({

    SubcategoryName:{

        type: String,
        required:true
    }
});

const Subcatgeory = mongoose.model('Subcatgeory',SubcategorySchema);

module.exports = Subcatgeory;
