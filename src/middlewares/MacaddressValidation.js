const HTTP_STATUS_BAD_REQUEST = 400;

const MacaddressValidation = (req, res, next) => {
    if (!req.body.macaddress) 
        return res.status(HTTP_STATUS_BAD_REQUEST).json({error: 'macaddress nao foi informado'});
    else 
        next();
}

module.exports = MacaddressValidation;