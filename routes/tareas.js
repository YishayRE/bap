import { Router } from 'express';
import { check } from 'express-validator';

import { tareas } from '../controllers/index.js';
import * as middlewares from '../middlewares/index.js';
import * as helpers from '../helpers/index.js';

const router = Router();

/**
 * {{url}}/api/tareas
 */

//  obtener las tareas de un usuario en particular
router.get('/:usuario', [
    check('usuario', 'El id del usuario es obligatorio').isInt().notEmpty(),
    check('usuario').custom( helpers.dbValidators.existeUsuarioPorId ),
    middlewares.validarCampos.validarCampos
], tareas.obtenerTareas);

//  obtener una tarea completa de un usuario
router.get('/unico/:usuario/:tarea', [
    check('usuario', 'El id del usuario es obligatorio').isInt().notEmpty(),
    check('usuario').custom( helpers.dbValidators.existeUsuarioPorId ),
    check('tarea', 'El id de la tarea es obligatoria').isInt().notEmpty(),
    check('tarea').custom( helpers.dbValidators.existeTareaPorId ),
    middlewares.validarCampos.validarCampos
], tareas.obtenerTarea);

//  crear una tarea y guardarla
router.post('/', [
    check('titulo', 'El titulo es obligatorio').isLength({min: 1, max: 50}).notEmpty(),
    check('descripcion', 'La descripcion es obligatorio').isLength({min: 1, max: 200}).notEmpty(),
    check('estatusComplecion', 'El estatusComplecion es obligatorio').isBoolean().notEmpty(),
    check('fechaEntrega', 'La fechaEntrega es obligatorio').isISO8601().toDate().notEmpty(),
    check('usuario', 'El usuario es obligatorio').isInt().notEmpty(),
    check('usuario').custom( helpers.dbValidators.existeUsuarioPorId ),
    middlewares.validarCampos.validarCampos
], tareas.crearTarea);

//  editar una tarea
router.put('/', [
    check('usuario', 'El usuario es obligatorio').isInt().notEmpty(),
    middlewares.validarCampos.validarCampos,
    check('tarea', 'El id de la tarea es obligatoria').isInt().notEmpty(),
    check('tarea').custom( helpers.dbValidators.existeTareaPorId ),
], tareas.actualizarTarea);

//  eliminar una tarea
router.delete('/', [
    check('usuario', 'El usuario es obligatorio').isInt().notEmpty(),
    middlewares.validarCampos.validarCampos,
    check('tarea', 'El id de la tarea es obligatoria').isInt().notEmpty(),
    check('tarea').custom( helpers.dbValidators.existeTareaPorId ),
], tareas.eliminarTarea);

export { router };