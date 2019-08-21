const request = require("./distance")
const data = require("./coordinates")
const out = require("./output")
const { checkEnvVars } = require('../scripts/utils');

checkEnvVars([ 'X_API_KEY' ]);

async function promiseToAddDistance (structure){
    var total = 0;
    return Promise.all(
        structure.map(async element => {
            if (element.from.locode != element.to.locode){
                let body = await request.promiseToGetDistance(element.from.lon, element.from.lat, element.to.lon, element.to.lat);
                for (var i = 0; i < body.getRouteJson.length; i++){
                    total += body.getRouteJson[i].distance
                }
                element.distance = total
                total = 0
            }
            else{
                element.distance = 0
            }
            return element;
        })
    )
}
    
async function promiseToGetDistanceMatrixFromLocodes(locode){

    var coordinates = await data.promiseToListCoordinates(locode)
    var structure = out.getObjectStructure(coordinates)
    structure = await promiseToAddDistance(structure)

    return structure;
}

module.exports = {promiseToGetDistanceMatrixFromLocodes}