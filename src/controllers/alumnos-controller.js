import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import AlumnosService from './../services/alumnos-service.js';
import Alumno from './../entities/alumno.js';
import ResponseHelper from './../helpers/response-helper.js';
import ValidacionesHelper, { ValidationError, ConflictError } from '../helpers/validaciones-helper.js';

const router = Router();
const currentService = new AlumnosService();


function manejarErroresControlador(error, res) {
    if (error instanceof ValidationError) {
        return ResponseHelper.json(res, StatusCodes.BAD_REQUEST, {
            error: 'Input inválido',
            detalle: error.message,
            ...(error.detalles.length > 0 && { detalles: error.detalles })
        });
    }
    
    if (error instanceof ConflictError) {
        return ResponseHelper.json(res, StatusCodes.CONFLICT, {
            error: 'Conflicto',
            detalle: error.message
        });
    }

    // Errores de infraestructura o base de datos no filtran detalles internos
    return ResponseHelper.json(res, StatusCodes.INTERNAL_SERVER_ERROR, { 
        error: 'Error inesperado' 
    });
}

router.get('/test-insert', async (req, res) => {
    try {
        const nuevoAlumno = new Alumno('Willy', 'Wonka', 1, '2005-07-15', true);
        const newId = await currentService.createAsync(nuevoAlumno);
        
        if (newId > 0) {
            return ResponseHelper.json(res, StatusCodes.CREATED, {
                message : `Se creó el alumno desde código con id: ${newId}`,
                alumno  : nuevoAlumno,
                newId   : newId
            });
        } else {
            return ResponseHelper.json(res, StatusCodes.BAD_REQUEST, { 
                error: 'Input inválido', 
                detalle: 'No se pudo crear el alumno.' 
            });
        }
    } catch (error) {
        return manejarErroresControlador(error, res);
    }
});

router.get('', async (req, res) => {
    try {
        const returnArray = await currentService.getAllAsync();
        if (returnArray != null) {
            return ResponseHelper.json(res, StatusCodes.OK, returnArray);
        } else {
            return ResponseHelper.json(res, StatusCodes.INTERNAL_SERVER_ERROR, { 
                error: 'Error inesperado', 
                detalle: 'No se pudieron recuperar los registros.' 
            });
        }
    } catch (error) {
        console.error('Error en GET /:', error);
        return manejarErroresControlador(error, res);
    }
});

router.get('/:id', ValidacionesHelper.validarParamIdMiddleware, async (req, res) => {
    try {
        const id = req.params.idClean; 
        const returnEntity = await currentService.getByIdAsync(id);
        
        if (returnEntity != null) {
            return ResponseHelper.json(res, StatusCodes.OK, returnEntity);
        } else {
            return ResponseHelper.json(res, StatusCodes.NOT_FOUND, { 
                error: 'No encontrado', 
                detalle: `No se encontró la entidad de Alumno con ID: ${id}` 
            });
        }
    } catch (error) {
        console.error(`Error en GET /:${req.params.id}:`, error);
        return manejarErroresControlador(error, res);
    }
});

router.post('', 
    ValidacionesHelper.validarAlumnoBodyMiddleware, 
    ValidacionesHelper.validarCursoExisteMiddleware, 
    async (req, res) => {
        try {
            const entity = req.body;
            const newId = await currentService.createAsync(entity);
            
            if (newId > 0) {
                return ResponseHelper.json(res, StatusCodes.CREATED, { id: newId });
            } else {
                return ResponseHelper.json(res, StatusCodes.BAD_REQUEST, { 
                    error: 'Input inválido', 
                    detalle: 'No se pudo procesar la solicitud de creación.' 
                });
            }
        } catch (error) {
            console.error('Error en POST /:', error);
            return manejarErroresControlador(error, res);
        }
    }
);

router.put('/:id', 
    ValidacionesHelper.validarParamIdMiddleware, 
    ValidacionesHelper.validarAlumnoBodyMiddleware, 
    ValidacionesHelper.validarCursoExisteMiddleware, 
    async (req, res) => {
        try {
            const id = req.params.idClean;
            const entity = req.body;

            if (entity.id && parseInt(entity.id, 10) !== id) {
                // El controlador maneja directamente el código de error HTTP
                return ResponseHelper.json(res, StatusCodes.BAD_REQUEST, {
                    error: 'Input inválido',
                    detalle: `El ID de la URL (${id}) no coincide con el ID especificado en el cuerpo (${entity.id}).`
                });
            }

            entity.id = id;
            const rowsAffected = await currentService.updateAsync(entity);
            
            if (rowsAffected != 0) {
                return ResponseHelper.json(res, StatusCodes.OK, { 
                    message: 'Registro actualizado con éxito.', 
                    rowsAffected 
                });
            } else {
                return ResponseHelper.json(res, StatusCodes.NOT_FOUND, { 
                    error: 'No encontrado', 
                    detalle: `No se encontró la entidad de Alumno con ID: ${id} para actualizar.` 
                });
            }
        } catch (error) {
            console.error(`Error en PUT /:${req.params.idClean}:`, error);
            return manejarErroresControlador(error, res);
        }
    }
);

router.delete('/:id', ValidacionesHelper.validarParamIdMiddleware, async (req, res) => {
    try {
        const id = req.params.idClean;
        const rowCount = await currentService.deleteByIdAsync(id);
        
        if (rowCount != 0) {
            return ResponseHelper.json(res, StatusCodes.OK, { 
                message: 'Entidad eliminada correctamente.' 
            });
        } else {
            return ResponseHelper.json(res, StatusCodes.NOT_FOUND, { 
                error: 'No encontrado', 
                detalle: `No se encontró la entidad de Alumno con ID: ${id} para eliminar.` 
                });
        }
    } catch (error) {
        console.error(`Error en DELETE /:${req.params.idClean}:`, error);
        return manejarErroresControlador(error, res);
    }
});


router.use((error, req, res, next) => {
    manejarErroresControlador(error, res);
});

export default router;