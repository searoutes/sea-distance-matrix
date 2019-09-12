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

async function promiseToGetBatchCoordinates(locode){
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

async function promiseToListCoordinates(locode, batchSize)
{
    var batches = []
    var index = 0
    for (var i = 0; (locode.length + batchSize) / ((i+1) * batchSize) > 1 ; i++){
        batches.push([])
        for(var nb = 0; nb < batchSize && locode[index]; nb++){
            batches[i].push(locode[index])
            index++
        }
    }
    locode = []
    for (var i = 0; batches[i]; i++){
        batches[i] = await promiseToGetBatchCoordinates(batches[i])
        for (var j = 0; batches[i][j]; j++)
            locode.push(batches[i][j])
        await new Promise(done => setTimeout(done, 1000));
    }
    return locode
}

module.exports.promiseToListCoordinates = promiseToListCoordinates