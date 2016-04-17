/**
 * Created by tuanzhang on 16/4/2016.
 */
'use strict';

var service = require('./membercard.service.js');

exports.index = function (request, reply) {
    var objs = service.getAll();

    return reply(objs);
};

exports.show = function (request, reply) {
    var id=request.params.id;
    var obj = service.getById(id);

    return reply(obj);
};

exports.create = function (request, reply) {
    var id=request.body;
    var obj = service.getById(id);

    return reply(obj);
};
