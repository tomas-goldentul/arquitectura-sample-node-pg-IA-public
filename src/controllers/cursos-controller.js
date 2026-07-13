import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import CursosService from './../services/cursos-service.js'
import ResponseHelper from './../helpers/response-helper.js'

const router = Router();
const currentService = new CursosService();

router.get('', async (req, res) => {
    try {
        console.log(`CursosController.get`);
        const returnArray = await currentService.getAllAsync();
        if (returnArray != null){
            return ResponseHelper.json(res, StatusCodes.OK, returnArray);
        } else {
            return ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error interno.`);
        }
    } catch (error) {
        console.log(error);
        return ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error: ${error.message}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const returnEntity = await currentService.getByIdAsync(id);
        if (returnEntity != null){
            return ResponseHelper.json(res, StatusCodes.OK, returnEntity);
        } else {
            return ResponseHelper.send(res, StatusCodes.NOT_FOUND, `No se encontro la entidad (id:${id}).`);
        }
    } catch (error) {
        console.log(error);
        return ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error: ${error.message}`);
    }
});

router.post('', async (req, res) => {
    try {
        let entity = req.body;
        const newId = await currentService.createAsync(entity);
        if (newId > 0 ){
            return ResponseHelper.json(res, StatusCodes.CREATED, newId);
        } else {
            return ResponseHelper.json(res, StatusCodes.BAD_REQUEST, null);
        }
    } catch (error) {
        console.log(error);
        return ResponseHelper.send(res, StatusCodes.BAD_REQUEST, `Error: ${error.message}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let entity = req.body;

        if (entity.id && parseInt(entity.id) !== id) {
            return ResponseHelper.send(res, StatusCodes.BAD_REQUEST, `El id de la URL (${id}) no coincide con el id del body (${entity.id}).`);
        }

        entity.id = id;
        const rowsAffected = await currentService.updateAsync(entity);
        if (rowsAffected != 0){
            return ResponseHelper.json(res, StatusCodes.OK, rowsAffected);
        } else {
            return ResponseHelper.send(res, StatusCodes.NOT_FOUND, `No se encontro la entidad (id:${id}).`);
        }
    } catch (error) {
        console.log(error);
        return ResponseHelper.send(res, StatusCodes.BAD_REQUEST, `Error: ${error.message}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const rowCount = await currentService.deleteByIdAsync(id);
        if (rowCount != 0){
            return ResponseHelper.json(res, StatusCodes.OK, null);
        } else {
            return ResponseHelper.send(res, StatusCodes.NOT_FOUND, `No se encontro la entidad (id:${id}).`);
        }
    } catch (error) {
        console.log(error);
        return ResponseHelper.send(res, StatusCodes.INTERNAL_SERVER_ERROR, `Error: ${error.message}`);
    }
});

export default router;