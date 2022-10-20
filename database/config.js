import * as fs from 'fs';
import * as mysql from 'mysql';
import { promisify } from 'util';
import path from 'path';
import colors from 'colors';

class BD {
    constructor(){
        this.pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USUARIO,
            password: process.env.PASS,
            database: process.env.DB
        });

        this.pool.query = promisify(this.pool.query);
        this.pool.getConnection = promisify(this.pool.getConnection);
    }

    //Comprueba la conexión a la base de datos
    async probarConexion() {
        this.pool.getConnection((err, connection) => {
            if(err)
                console.error(err);
            else
                if(connection){
                    connection.release();
                    console.log("BD conectada".bold.blue);
                }
                else
                    console.error("Error inesperado en BD".red);
        });
    }

    //Comprueba las tablas y si no existen las crea
    async comprobarBD() {
        const __dirname = path.resolve();
        const read = fs.readFileSync(__dirname + '/database/db.sql', 'utf8');
        const queries = read.split(';');
        queries.pop();
        const tablas = await queries.map(async query => {
            return await this.pool.query(query + ';');
        });

        const respuestas = await Promise.all(tablas);
        respuestas.map(resp => {
            if(resp.warningCount === 0)
                console.log('Tabla creada'.green);
            else
                console.log('Tabla ya existente'.yellow);
        })
    }

    //querys que no necesitan parametros (selects *)
    async querySinParametros(query){
        return await this.pool.query(query);
    }

    //querys que necesitan parametros, se pasan como un arreglo
    async queryConParametros(query, parametros){
        return await this.pool.query(query, parametros);
    }

    //Termina la conexión a la base de datos
    close(){
        this.pool.end();
    }
}

export { BD };