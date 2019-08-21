function getObjectStructure(coordinates){
    var x = 0;
    var y = 0;
    var output = []
    while (y < coordinates.length){
        while (x < coordinates.length){
            output.push({
                from: coordinates[y],
                to: coordinates[x],
                distance: 0.0
            })
            x++;
        }
        x = 0;
        y++
    }
    return output;
}

module.exports.getObjectStructure = getObjectStructure
