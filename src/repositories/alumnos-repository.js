import Db from './db-pg.js';
import GenericRepository from './generic-repository.js';

export default class AlumnosRepository {
    constructor() {
        console.log('Estoy en: AlumnosRepository-new.constructor()');
        this.db = new Db();
        this.base = new GenericRepository('alumnos', 'AlumnosRepository-new');
    }

    // Métodos delegados a la composición
    getAllAsync = async () => await this.base.getAllAsync();
    getByIdAsync = async (id) => await this.base.getByIdAsync(id);
    deleteByIdAsync = async (id) => await this.base.deleteByIdAsync(id);

    // Métodos específicos
    createAsync = async (entity) => {
        console.log(`AlumnosRepository-new.createAsync(${JSON.stringify(entity)})`);
        const sql = ` INSERT INTO alumnos (
                            nombre              ,
                            apellido            ,
                            id_curso            ,
                            fecha_nacimiento    ,
                            hace_deportes
                        ) VALUES (
                            $1,
                            $2,
                            $3,
                            $4,
                            $5
                        ) RETURNING id`;
        const values = [
            entity?.nombre ?? '',
            entity?.apellido ?? '',
            entity?.id_curso ?? 0,
            entity?.fecha_nacimiento ?? null,
            entity?.hace_deportes ?? 0
        ];
        return await this.db.queryReturnId(sql, values);
    }

    updateAsync = async (entity) => {
        console.log(`AlumnosRepository-new.updateAsync(${JSON.stringify(entity)})`);

    //[YO: ELIMINE ESTO YA QUE CONSIDERE QUE NO HACIA FALTA VERIFICICAR SI EL ID EXISTE LLAMANDO AL METODO GET ID  YA QUE EL METODO RETORNA QUERYROWCOUNT, asi que si no encontro el id retorna 0] let id = entity.id; const previousEntity = await this.getByIdAsync(id);if (previousEntity == null) return 0;

        const sql = `UPDATE alumnos SET
                    nombre              = $2,
                    apellido            = $3,
                    id_curso            = $4,
                    fecha_nacimiento    = $5,
                    hace_deportes       = $6
                WHERE id = $1`;

        const values = [
            entity.id,
            entity?.nombre ?? '',
            entity?.apellido ?? '',
            entity?.id_curso ?? 0,
            entity?.fecha_nacimiento ?? null,
            entity?.hace_deportes ?? 0
        ];
        return await this.base.db.queryRowCount(sql, values);
    }
}