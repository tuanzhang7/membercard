'use strict';

var Visit = require('../api/visit/visit.model');
var Chance = require('chance');
var moment = require('moment');
var chance = new Chance();

Visit.find({}).removeAsync()
    .then(() => {
        var fakes=[];
        var startDate=moment("2016-01-01");
        for (var j=0;j<100;j++){
            var today=new moment(startDate).add(1, 'day').toDate();
            for (var i = 0; i <1000; i++) {

                var hour=chance.integer({min:11,max:22});

                var checkInTime=new moment(today).add(hour, 'hours').toDate();
                var checkOutTime=new moment(checkInTime).add(120, 'minutes').toDate();
                var actualcheckOutTime=new moment(checkInTime).add(chance.integer({min: 30, max: 200}), 'm').toDate();

                var branch=chance.pickone(['vivo city"', 'changi airport']);
                var serviceNo=chance.integer({min: 1, max: 200});

                var visit= {
                    checkInTime:checkInTime,
                    checkOutTime:checkOutTime,
                    actualcheckOutTime:actualcheckOutTime,
                    branch:branch,
                    serviceNo:serviceNo
                };
                fakes.push(visit);
            }
        }
        Visit.create(fakes);
    });

