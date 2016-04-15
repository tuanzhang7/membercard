/**
 * Created by tuanzhang on 15/4/2016.
 */
'use strict';

exports.show = function (request, reply) {
    var id=request.params.id;
    return reply({
        "id":id,
        "validPeriod":365,
        "vistis":16,
        "price":188
    });
};