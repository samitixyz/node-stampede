const sendErrorDev = (err, res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });    
    } else {
        console.error('Error', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

const sendErrorProd = (err, res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });    
    } else {
        console.error('Error', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}