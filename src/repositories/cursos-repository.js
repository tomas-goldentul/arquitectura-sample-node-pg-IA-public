import Db from './db-pg.js';
import GenericRepository from './generic-repository.js';

export default class CursosRepository {
    constructor() {
        console.log('Estoy en: CursosRepository.constructor()');
        this.db = new Db();
        this.base = new GenericRepository('cursos', 'CursosRepository');
    }

    // Métodos delegados a la composición
    getAllAsync = async () => await this.base.getAllAsync();
    getByIdAsync = async (id) => await this.base.getByIdAsync(id);
    deleteByIdAsync = async (id) => await this.base.deleteByIdAsync(id);

    // Métodos específicos
    createAsync = async (entity) => {
        console.log(`CursosRepository.createAsync(${JSON.stringify(entity)})`);
        const sql = `INSERT INTO cursos (nombre) VALUES ($1) RETURNING id`;
        const values = [entity?.nombre ?? ''];
        return await this.db.queryReturnId(sql, values);
    }

    updateAsync = async (entity) => {
        console.log(`CursosRepository.updateAsync(${JSON.stringify(entity)})`);
        const sql = `UPDATE cursos SET nombre = $2 WHERE id = $1`;
        const values = [entity.id, entity?.nombre ?? ''];
        return await this.db.queryRowCount(sql, values);
    }
}