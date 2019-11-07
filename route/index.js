const express = require('express');
const router = express.Router();

const { promiseToGetDistanceMatrixFromLocodes } = require('../service');

router.get('/distance', function getDistanceMatrix(req, res){
    try {
        const locode = req.query.locode
        if (!Array.isArray(locode)){
            return res.status(400).json({ error: 'please enter 2 [locode] minimum.' })
        }
        else{
            promiseToGetDistanceMatrixFromLocodes(locode)
            let estimateTime = Math.round((locode.length*locode.length*0.43)/6)/10    //0.43 correspond to averageTimeByBatch / batchSize (25)
            res.status(200).send(`The matrix is computing, see json result at matrix.json.\nEstimate time ${estimateTime} mn.`)
        }    
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
    }
});

module.exports = router;
