'use strict';

var mongoose = require('mongoose');

var VisitSchema = new mongoose.Schema({
        checkInTime: { type: Date, default: Date.now,required: true},
        checkOutTime:{ type: Date, default: Date.now,required: true},
        actualcheckOutTime:{ type: Date},
        branch:String,
        serviceNo:{type:String,required:true}
    }
    ,
    {
        timestamps: true
    });


export default mongoose.model('membercard', VisitSchema);

