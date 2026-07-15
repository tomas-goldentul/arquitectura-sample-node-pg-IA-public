import AlumnosRepository from '../repositories/alumnos-repository.js';

function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mesDiff = hoy.getMonth() - nacimiento.getMonth();
    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

function agregarEdad(alumno) {
    if (!alumno) return alumno;
    return { ...alumno, edad: calcularEdad(alumno.fecha_nacimiento) };
}

export default class AlumnosService {
    constructor() {
        this.AlumnosRepository = new AlumnosRepository();
    }

    getAllAsync = async () => {
        const returnArray = await this.AlumnosRepository.getAllAsync();
        if (returnArray == null) return null;
        return returnArray.map(alumno => agregarEdad(alumno));
    }

    getByIdAsync = async (id) => {
        const returnEntity = await this.AlumnosRepository.getByIdAsync(id);
        return agregarEdad(returnEntity);
    }

    createAsync = async (entity) => {
        return await this.AlumnosRepository.createAsync(entity);
    }

    updateAsync = async (entity) => {
        return await this.AlumnosRepository.updateAsync(entity);
    }

    deleteByIdAsync = async (id) => {
        return await this.AlumnosRepository.deleteByIdAsync(id);
    }
}