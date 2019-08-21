//OLD TEST - INVALID

var should = require('should');
let { getObjectStructure } = require('../../service/output.js');

it('getObjectStructure should transform a list of locodes into list of js objects', function () {
    const locodeList = ['DEHAM', 'GBLON'];
    const jsMatrix = getObjectStructure(locodeList)
    jsMatrix.forEach(element => {
        element.should.have.property('from');
        element.should.have.property('to');
        element.should.have.property('distance');
    });
});
