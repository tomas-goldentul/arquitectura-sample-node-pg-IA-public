import Db from './db-pg.js';
import GenericRepository from './generic-repository.js';

export default class MateriasRepository {
    constructor() {
        console.log('Estoy en: MateriasRepository.constructor()');
        this.db = new Db();
        this.base = new GenericRepository('materias', 'MateriasRepository');
    }

    // Métodos delegados a la composición
    getAllAsync = async () => await this.base.getAllAsync();
    getByIdAsync = async (id) => await this.base.getByIdAsync(id);
    deleteByIdAsync = async (id) => await this.base.deleteByIdAsync(id);

    // Métodos específicos
    createAsync = async (entity) => {
        console.log(`MateriasRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `INSERT INTO materias (nombre) VALUES ($1) RETURNING id`;
        const values = [entity?.nombre ?? ''];
        return await this.db.queryReturnId(sql, values);
    }

    updateAsync = async (entity) => {
        console.log(`MateriasRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `UPDATE materias SET nombre = $2 WHERE id = $1`;
        const values = [entity.id, entity?.nombre ?? ''];
        return await this.db.queryRowCount(sql, values);
    }
}