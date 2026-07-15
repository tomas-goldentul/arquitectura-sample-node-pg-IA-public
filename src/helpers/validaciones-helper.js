import CursosService from '../services/cursos-service.js';

// Clases de error personalizadas para identificar la semántica del fallo sin usar HTTP
export class ValidationError extends Error {
    constructor(message, detalles = []) {
        super(message);
        this.name = 'ValidationError';
        this.detalles = detalles;
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
}

export default class ValidacionesHelper {
    /**
     * Valida y convierte un ID a entero positivo.
     * Retorna el ID parseado si es válido, o null si no lo es.
     */
    static parsearId(idStr) {
        if (!idStr) return null;
        
        const esEnteroValido = /^\d+$/.test(idStr);
        if (!esEnteroValido) return null;

        const id = parseInt(idStr, 10);
        return id > 0 ? id : null;
    }

    /**
     * Middleware 1: Valida y parsea el ID de los parámetros de la ruta (:id)
     */
    static validarParamIdMiddleware(req, res, next) {
        const idOriginal = req.params.id;
        const idParseado = ValidacionesHelper.parsearId(idOriginal);

        if (idParseado === null) {
            // En lugar de responder HTTP, propagamos un ValidationError semántico
            return next(new ValidationError(`El parámetro ID proporcionado ('${idOriginal}') debe ser un número entero positivo.`));
        }

        req.params.idClean = idParseado;
        next();
    }

    /**
     * Middleware 2: Valida la estructura y tipos de datos del Alumno (Body)
     */
    static validarAlumnoBodyMiddleware(req, res, next) {
        const body = req.body;
        const errores = [];

        // 1. Validar nombre
        if (body.nombre === undefined || body.nombre === null || String(body.nombre).trim() === '') {
            errores.push("El campo 'nombre' es requerido y no puede estar vacío.");
        } else if (typeof body.nombre !== 'string' || body.nombre.length > 100) {
            errores.push("El campo 'nombre' debe ser un texto de máximo 100 caracteres.");
        }

        // 2. Validar apellido
        if (body.apellido === undefined || body.apellido === null || String(body.apellido).trim() === '') {
            errores.push("El campo 'apellido' es requerido y no puede estar vacío.");
        } else if (typeof body.apellido !== 'string' || body.apellido.length > 100) {
            errores.push("El campo 'apellido' debe ser un texto de máximo 100 caracteres.");
        }

        // 3. Validar id_curso
        if (body.id_curso !== undefined && body.id_curso !== null) {
            const esEntero = Number.isInteger(body.id_curso) || /^\d+$/.test(String(body.id_curso));
            if (!esEntero || parseInt(body.id_curso, 10) <= 0) {
                errores.push("El campo 'id_curso' debe ser un número entero positivo válido.");
            }
        } else {
            errores.push("El campo 'id_curso' es requerido.");
        }

        // 4. Validar fecha_nacimiento
        if (body.fecha_nacimiento) {
            const esFechaValida = !isNaN(Date.parse(body.fecha_nacimiento));
            if (!esFechaValida) {
                errores.push("El campo 'fecha_nacimiento' debe ser una fecha válida (formato recomendado: YYYY-MM-DD).");
            }
        }

        // 5. Validar hace_deportes
        if (body.hace_deportes !== undefined && body.hace_deportes !== null) {
            if (typeof body.hace_deportes !== 'boolean') {
                errores.push("El campo 'hace_deportes' debe ser un valor booleano (true o false).");
            }
        }

        if (errores.length > 0) {
            // Propagamos el error de validación estructurado
            return next(new ValidationError('Input inválido', errores));
        }

        next();
    }

    /**
     * Middleware 3: Valida que el curso asociado exista en la Base de Datos
     */
    static async validarCursoExisteMiddleware(req, res, next) {
        const idCurso = req.body.id_curso;

        if (!idCurso) {
            return next();
        }

        try {
            const cursosService = new CursosService();
            const curso = await cursosService.getByIdAsync(idCurso);
            if (curso == null) {
                // Propagamos un ConflictError de negocio
                return next(new ConflictError(`El curso con id ${idCurso} no existe en el sistema.`));
            }
            next();
        } catch (error) {
            // Propagamos cualquier error inesperado para que el controlador lo centralice
            next(error);
        }
    }
}