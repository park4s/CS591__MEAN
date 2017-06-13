var mongoose = require('mongoose');

var stringSchema = new mongoose.Schema({
    string: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: false,
        default: 0
    }
});
var StringParam = mongoose.model('StringParam', stringSchema);

module.exports = StringParam;