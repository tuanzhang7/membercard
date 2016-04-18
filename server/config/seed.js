*
* Populate DB with sample data on server start
* to disable, edit config/environment/index.js, and set `seedDB: false`
*/

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Freport from '../api/freport/freport.model';
import House from '../api/house/house.model';
import Chance from 'chance';
import _ from 'lodash';
var chance = new Chance();

var houseList=CreateHouses();
function CreateHouses(){
    var _houseList=[];
    var wh=['4','6','8','10','12','14','15','17','19','43','45','54','56'];

    for (var i = 0; i < wh.length; i++) {
        var whNumber = wh[i];
        var name="WH"+chance.pad(whNumber, 2);
        var countryServed=chance.pick(['China', 'Thialand', 'Vienam']);
        var lat=chance.latitude({min: 1.308966, max: 1.313696});
        var lng=chance.longitude({min: 103.876986, max: 103.888005});

        var house= {
            'name':name,
            countryServed:countryServed,
            loc: { lat: lat, lng: lng }

        };
        _houseList.push(house);
    }
    for (var i = 0; i <20; i++) {

        var name="L"+chance.pick(['8','10','12','14','16','18','20','22','24','26','28'])+"H"+chance.integer({min: 1, max: 70});
        var countryServed=chance.pick(['China', 'Thialand', 'Vienam']);
        var lat=chance.latitude({min: 1.308966, max: 1.313696});
        var lng=chance.longitude({min: 103.876986, max: 103.888005});

        var house= {
            'name':name,
            countryServed:countryServed,
            loc: { lat: lat, lng: lng }

        };
        if(_.some(_houseList, ['name', name])==false){
            _houseList.push(house);
        }

    }
    return _houseList;
}



Thing.find({}).removeAsync()
    .then(() => {
        Thing.create({
            name: 'Development Tools',
            info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
            'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
            'Stylus, Sass, and Less.'
        }, {
            name: 'Server and Client integration',
            info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
            'AngularJS, and Node.'
        }, {
            name: 'Smart Build System',
            info: 'Build system ignores `spec` files, allowing you to keep ' +
            'tests alongside code. Automatic injection of scripts and ' +
            'styles into your index.html'
        }, {
            name: 'Modular Structure',
            info: 'Best practice client and server structures allow for more ' +
            'code reusability and maximum scalability'
        }, {
            name: 'Optimized Build',
            info: 'Build process packs up your templates as a single JavaScript ' +
            'payload, minifies your scripts/css/images, and rewrites asset ' +
            'names for caching.'
        }, {
            name: 'Deployment Ready',
            info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
            'and openshift subgenerators'
        });
    });

User.find({}).removeAsync()
    .then(() => {
        User.createAsync({
                provider: 'local',
                name: 'Test User',
                email: 'test@example.com',
                password: 'test'
            }, {
                provider: 'local',
                role: 'admin',
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin'
            })
            .then(() => {
                console.log('finished populating users');
            });
    });

House.find({}).removeAsync()
    .then(() => {
        House.create(houseList);
    });
Freport.find({}).removeAsync()
    .then(() => {

        var fakes=[];
        var scoresList=["look","body","boob",'ass',"attitude","Bbbj","GFE","FJ","catBath","AR","french","HJ","massage"];

        for (var i = 0; i <20; i++) {
            var name=chance.first();
            var house=chance.pick(houseList);
            var duration=chance.pick(['25', '40', '60', '90']);
            var damage=chance.pick(['50', '80', '100', '120','150']);
            var number=chance.integer({min: 1, max: 80});
            var numberOfReports=chance.integer({min: 1, max:20});
            for (var j = 0; j <numberOfReports; j++) {
                var age=chance.pick(['18 ~ 25', '25 ~ 35', '>35']);
                var height=chance.pick(['< 160cm', '160 ~ 165cm', '165 ~ 170cm', '> 170cm']);
                var cup=chance.pick(['A', 'B', 'C', 'D+']);

                var reportDate=chance.date({year: 2015});
                //var willReturn=chance.bool({likelihood: 60});
                var description=chance.paragraph();

                var ratingMax=10;


                var scores={};
                var numberOfScore=chance.integer({min: 1, max: scoresList.length});

                var scoresGived=[];
                if(numberOfScore==1){
                    scoresGived.push(chance.pick(scoresList));
                }
                else{
                    scoresGived=chance.pick(scoresList,numberOfScore);
                }
                _.forEach(scoresGived, function(value) {
                    scores[value]={"comment":chance.sentence({words: 5}),"score":chance.integer({min: 1, max: ratingMax})};
                });

                var report={
                    "name":name,
                    "number":number,
                    "country":house.countryServed,
                    "province":"HuBei",
                    "cup": cup,
                    "height":height,
                    "age":age,

                    "house": house.name,
                    "description":description,
                    "duration":duration,
                    "damage":damage,
                    //"willReturn": willReturn,
                    "scores":scores,
                    reportBy:chance.first(),
                    reportDate:reportDate
                };
                fakes.push(report);
            }

        }

        Freport.create(fakes);
    });

Status API Training Shop Blog About
