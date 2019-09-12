const distance = require("./distance")
const data = require("./coordinates")
const out = require("./output")
const { checkEnvVars } = require('../scripts/utils');

checkEnvVars([ 'X_API_KEY' ]);

async function promiseToModifyElement (element, body){
    var total = 0
    if (body && body.getRouteJson){
        for (var i = 0; i < body.getRouteJson.length; i++){
            total += body.getRouteJson[i].distance
        }
        element.distance = total
        total = 0
    }
    else if (body){
        element.message = body.message
    }
    return element
}

async function promiseToProcessBatch (structure){
    var recursive = 0
    return Promise.all(
        structure.map(async function req(element){
            if (element.from.locode != element.to.locode){
                let body = await distance.promiseToGetDistance(element.from.lon, element.from.lat, element.to.lon, element.to.lat);
                if (body)
                    element = await promiseToModifyElement(element, body)
                else {
                    recursive++
                    if (recursive > 3){
                        element.message = 'too much fail'
                        recursive = 0
                        return element
                    }
                    return req(element)
                }
                recursive = 0;
            }
            else{
                element.distance = 0
            }
            return element
        })
    )
}

async function promiseToAddDistance (structure, batchSize){
    var batches = []
    var index = 0
    for (var i = 0; (structure.length + batchSize) / ((i+1) * batchSize) > 1 ; i++){
        batches.push([])
        for(var nb = 0; nb < batchSize && structure[index]; nb++){
            batches[i].push(structure[index])
            index++
        }
    }
    structure = []
    for (var i = 0; batches[i]; i++){
        batches[i] = await promiseToProcessBatch(batches[i])
        for (var j = 0; batches[i][j]; j++)
            structure.push(batches[i][j])
        await new Promise(done => setTimeout(done, 1000));
    }

    return (structure)
}

async function promiseToGetDistanceMatrixFromLocodes(locode){
    var batchSize = 50
    var coordinates = await data.promiseToListCoordinates(locode, batchSize)
    var structure = out.getObjectStructure(coordinates)
    structure = await promiseToAddDistance(structure, batchSize)

    return structure;
}

module.exports = {promiseToGetDistanceMatrixFromLocodes}