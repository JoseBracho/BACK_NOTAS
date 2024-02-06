const {validationResult} = require("express-validator");

const validatefields = (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        const {errors} = err
        return res.status(400).json({done: false, error:errors[0]?.msg})
    }
    next();
}

module.exports = validatefields;