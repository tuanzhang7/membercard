/**
 * Created by tuanzhang on 15/4/2016.
 */
'use strict';


var service = require('./visit.service.js');

exports.index = function (request, reply) {
    var branch=request.params.branch;
    var fromDate=request.params.fromDate;
    var toDate=request.params.toDate;

    var objs = service.getVisits(branch,fromDate,toDate);
    return reply(objs);
};

exports.show = function (request, reply) {
    var id=request.params.id;
    var obj = service.getById(id);

    return reply(obj);
};

exports.getCurrentVisits = function (request, reply) {
    var branch=request.params.branch;
    var obj = service.getVisitByDateTime(branch,Date.now());

    return reply(obj);
};

exports.checkIn = function (request, reply) {
    console.log(request.body);
    var checkInTime=request.payload.checkInTime;
    var checkOutTime=request.payload.checkOutTime;
    var serviceno=request.payload.serviceno;
    var branch=request.payload.branch;

    console.log("checkin:"+checkInTime+" "+checkOutTime+" "+serviceno+" "+branch);
    var obj = service.getById(id);

    return reply(obj);
};

exports.checkOut = function (request, reply) {
    var id=request.params.id;
    var obj = service.getById(id);

    var actualcheckOutTime=Date.now();

    if(request.payload && request.payload.actualcheckOutTime){
        actualcheckOutTime=request.payload.actualcheckOutTime;

    }
    obj.actualcheckOutTime=actualcheckOutTime;
    
    console.log("checkout:"+id+" "+actualcheckOutTime);
    
    var obj = service.getById(id);

    return reply(obj);
};
