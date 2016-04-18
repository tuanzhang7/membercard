/**
 * Created by xujing on 15/04/16.
 */
'use strict';
var visit = require('./visit.model');
var fs = require('fs');

exports.getAll=function () {
    var obj = JSON.parse(fs.readFileSync('./server/api/visit/visit.json', 'utf8'));
    return obj;
};

exports.getById=function (id) {
    var objs = JSON.parse(fs.readFileSync('./server/api/visit/visit.json', 'utf8'));
    return objs[id];
};

exports.getVisitByDateTime=function (branch,datetime) {
    var objs = JSON.parse(fs.readFileSync('./server/api/visit/visit.json', 'utf8'));

    return objs.slice(1,3);
};
exports.getVisits=function (branch,fromDate,toDate) {
    var objs = JSON.parse(fs.readFileSync('./server/api/visit/visit.json', 'utf8'));

    return objs.slice(1,3);
};