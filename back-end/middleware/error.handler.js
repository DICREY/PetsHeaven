// Errors middlewares
function logErrors(error,req,res,next) {
    console.log('logErrors')
    console.error(error)
    next(error)
}

function errorHandler (err,req,res,next) {
    console.error(err.stack);  // Log del error
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

// export middleware 
module.exports = { logErrors, errorHandler }