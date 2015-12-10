var https = require('https');
var url = require('url');
var router = require('routes')();


var busstop = 'https://api.tfl.gov.uk/StopPoint/490012632K?app_id='+ process.env.APP_ID +'&app_key=' + process.env.APP_KEY;

function routes (request, response) {

    https.get(busstop, function (response) {

        response.on('data', function () {

            response.write(response);
        });
        response.on('err', function (err) {

            console.log(err);
            response.writeHead(500);
            response.write("There was an error.");
            response.end();
        });
    });
}

module.exports = routes;
