const rqPromise = require("./distance")

async function promiseToGetCoordinates(code){
    try{
        var options = { 
            method: 'GET',
            url: process.env.GEOCODING_API_URL,
            qs: { 
                'locode': code 
            },
            headers: { 
                'x-api-key': process.env.X_API_KEY 
            } 
        };
        let body = await rqPromise.promiseDoRequest(options);
        return body;
    }
    catch(err){
        console.error(err);
    }
}

async function promiseToListCoordinates(locode){
    return Promise.all(
        locode.map(async code => {
            let data = await promiseToGetCoordinates(code);
            var arr_data = data.split(':').map(function(line){
                return line.split(',');
            });
            var result = {}
            result.locode = code
            result.lon = arr_data[5][0]
            result.lat = arr_data[6][0]
            return result;
        })
    )
}

module.exports.promiseToListCoordinates = promiseToListCoordinates
