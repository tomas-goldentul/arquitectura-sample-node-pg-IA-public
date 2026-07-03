import Db from './db-pg.js';

export default class GenericRepository {
    constructor(tabla, contextName) {
        this.tabla = tabla;
        this.contextName = contextName; // Para mantener el formato exacto de los logs
        this.db = new Db();
    }

    getAllAsync = async () => {
        console.log(`${this.contextName}.getAllAsync()`);
        const sql = `SELECT * FROM ${this.tabla}`;
        return await this.db.queryAll(sql);
    }

    getByIdAsync = async (id) => {
        console.log(`${this.contextName}.getByIdAsync(${id})`);
        const sql = `SELECT * FROM ${this.tabla} WHERE id=$1`;
        return await this.db.queryOne(sql, [id]);
    }

    deleteByIdAsync = async (id) => {
        console.log(`${this.contextName}.deleteByIdAsync(${id})`);
        const sql = `DELETE FROM ${this.tabla} WHERE id=$1`;
        return await this.db.queryRowCount(sql, [id]);
    }
}