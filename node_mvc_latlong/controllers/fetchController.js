const fsp = require('fs').promises;
const fs = require('fs');
const calculateDistance = require('../utilities/calculateDistance');

const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appErrror');

exports.getAnalytics = catchAsync(async(req, res, next) => {
    const { ip } = req.query;
    let reportAnalytics = [];

    if(fs.existsSync(`${__dirname}/storeAnalytics.json`)) {
        const reportFile = await fsp.readFile(`${__dirname}/storeAnalytics.json`, 'utf-8')
        reportAnalytics = JSON.parse(reportFile)
    }

    for(let i=0; i<reportAnalytics.length; i++) {
        if(reportAnalytics[i].ip !== ip) {
            return next(new AppError('No Coordinates found with that IP', 404));
        };
    }

    //Get Last Hour
    const hourAgo = new Date();
    hourAgo.setHours(hourAgo.getHours()-1)
    const getReport = reportAnalytics.filter(el=>
        el.ip === ip && new Date(el.createdAt) > hourAgo
    )

    const coordinatesArray = getReport.map(element => element.coordinates)
    let totalLength = 0;
    for(let i=0; i<coordinatesArray.length; i++){
        if(i == coordinatesArray.length -1){
            break;
        }
        let distance = calculateDistance(coordinatesArray[i], coordinatesArray[i+1]);
        totalLength += distance;
    }
    res.status(200).json({distance: totalLength})
});

