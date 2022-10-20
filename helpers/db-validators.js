import { BD } from '../database/config.js';
import * as services from '../services/index.js';

// Verificar si el usuario existe
const existeUsuarioPorId = async( id ) => {
    const bd = new BD();
    const existeUsuario = await services.mysql.getTabla(bd, 'Usuario', '*', `id = ?`, [id]);

    if (existeUsuario.length === 0)
        throw new Error(`El usuario con id: ${ id }, no existe`);
}

// Verificar si la tarea existe
const existeTareaPorId = async( id ) => {
    const bd = new BD();
    const existeTarea = await services.mysql.getTabla(bd, 'Tarea', '*', `id = ?`, [id]);

    if (existeTarea.length === 0)
        throw new Error(`La tarea con id: ${ id }, no existe`);
}

export { 
    existeUsuarioPorId,
    existeTareaPorId
};