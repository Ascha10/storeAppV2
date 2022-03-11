const mongoose = require('mongoose');

const ShirtSchema = new mongoose.Schema ({

    productName :{
        type: String,
        unique : true,
        required : [true,'productName is required']
    },
    companyName	: {
        type : String
    },
    productImg: {
        type : String
    },	
    price : {
        type : Number
    },
    productDescription : {
        type : String
    },
    quentity: {
        type : Number
    },
    hasDiscount:{
        type: Boolean,
        default : false
    }

})

const Shirt = mongoose.model("Shirt",ShirtSchema); 

module.exports = Shirt;