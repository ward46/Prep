var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var GadgetsSchema = new Schema({    
    Yoo: { type: String, requred: true },    
    Hoo: { type: Number, requred: true, default: 10 }
});

module.exports =  Mongoose.model('Gadgets', GadgetsSchema);