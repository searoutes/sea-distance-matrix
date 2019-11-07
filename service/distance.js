const request = require("request");

function promiseDoRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

async function promiseToGetDistance (lon1, lat1, lon2, lat2){
    try{
        var options = { 
            method: 'GET',
            url: process.env.ROUTING_API_URL + lon1 + ',' + lat1 + ';' + lon2 + ',' + lat2,
            qs: {},
            json: true,
            headers: { 
                'x-api-key': process.env.X_API_KEY
            } 
        };
        let body = await promiseDoRequest(options);
        return (body);
    }
    catch (err){
        console.error('route:', err);
    }
}

module.exports.promiseToGetDistance = promiseToGetDistance
module.exports.promiseDoRequest = promiseDoRequest
