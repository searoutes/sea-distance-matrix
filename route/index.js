const express = require('express');
const router = express.Router();

const { promiseToGetDistanceMatrixFromLocodes } = require('../service');

router.get('/distance', async function getDistanceMatrix(req, res){
    try {
        const locode = req.query.locode
        if (!Array.isArray(locode)){
            return res.status(400).json({ error: 'please enter 2 [locode] minimum.' })
        }
        else{
            const result = await promiseToGetDistanceMatrixFromLocodes(locode)
            res.json(result)
        }    
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
    }
});

module.exports = router;
