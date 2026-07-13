class ResponseHelper {
    /**
     * Envía una respuesta HTTP con cuerpo JSON.
     * @param {Object} res - Objeto de respuesta de Express.
     * @param {number} statusCode - Código de estado HTTP definido por el controlador.
     * @param {*} data - Datos a serializar en formato JSON.
     */
    json = (res, statusCode, data) => {
        return res.status(statusCode).json(data);
    }

    /**
     * Envía una respuesta HTTP con texto o contenido plano.
     * @param {Object} res - Objeto de respuesta de Express.
     * @param {number} statusCode - Código de estado HTTP definido por el controlador.
     * @param {string} message - Mensaje de texto a enviar.
     */
    send = (res, statusCode, message) => {
        return res.status(statusCode).send(message);
    }
}

export default new ResponseHelper();