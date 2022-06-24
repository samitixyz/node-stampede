const fsp = require('fs').promises;
const fs = require('fs');
const net = require('net');
exports.validateIP = (req, res, next) => {
    console.log(net.isIP(req.query.ip))
    if(net.isIP(req.query.ip) === 1 ){
        return res.status(404).json({
            status: 'fail',
            data: {
                message: 'Invalid IP, not found.'
            }
        })
    }
    next();
}