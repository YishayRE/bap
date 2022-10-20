import { validationResult } from 'express-validator';

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);

    if( !errors.isEmpty() )
        return res.status(406).json(errors);

    next();
}


export {
    validarCampos
}