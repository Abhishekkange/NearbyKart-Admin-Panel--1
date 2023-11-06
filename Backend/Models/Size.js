const mongoose = require('mongoose');

const sizeSchema = mongoose.Schema({

    size:{

        type: String,
        required:true
    }
});

const size = mongoose.model('size',sizeSchema);

module.exports = size;
