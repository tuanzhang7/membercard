/**
 * Created by xujing on 15/04/16.
 */
'use strict';

var fs = require('fs');

exports.getAll=function () {
    var obj = JSON.parse(fs.readFileSync('./server/api/package/package.json', 'utf8'));
    return obj;
};

exports.getById=function (id) {
    var objs = JSON.parse(fs.readFileSync('./server/api/package/package.json', 'utf8'));
    return objs[id];
};