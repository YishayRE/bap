import { response, request } from 'express';
import colors from 'colors';
import { BD } from '../database/config.js';
import * as services from '../services/index.js';

// ruta: /api/tareas/:usuario/:id
const obtenerTarea = async(req = request, res = response) => {
    try {
        const usuario = req.params.usuario;
        const tarea = req.params.tarea;
        const bd = new BD();

        const tareas = await services.mysql.getTabla(bd, 'Tarea', '*', `usuarioId = ? AND id = ?`, [usuario, tarea]);
        const tags = services.mysql.getTabla(bd, 'Tag', '*', `tareaId = ?`, [tarea]);
        const comentarios = services.mysql.getTabla(bd, 'Comentario', '*', `tareaId = ?`, [tarea]);
        const contentTags = await tags;
        const contentComentarios = await comentarios;

        bd.close();

        return res.status(200).json({
            ...tareas[0],
            tags: contentTags,
            comentarios: contentComentarios.sort(function(a, b) {
                // Ordenar por fecha de creación
                const fechaA = new Date(a.fecha);
                const fechaB = new Date(b.fecha);

                if(fechaA > fechaB)
                    return -1;
                else 
                    if(fechaA < fechaB)
                        return 1;
                    else
                        return 0;
            })
        });
    } catch (error) {
        console.log(colors.red(error));

        return res.status(406).json({ msg: error.message });
    }
};

// ruta: /api/tareas/:usuario
const obtenerTareas = async(req = request, res = response) => {
    try {
        const usuario = req.params.usuario;
        const bd = new BD();

        const tareas = await services.mysql.getTabla(bd, 'Tarea', '*', `usuarioId = ?`, [usuario]);

        bd.close();

        return res.status(200).json(tareas);
    } catch (error) {
        console.log(colors.red(error));

        return res.status(406).json({ msg: error.message });
    }
};

// ruta: /api/tareas/
const crearTarea = async(req = request, res = response) => {
    let idTarea;

    try {
        const { titulo, descripcion, estatusComplecion, fechaEntrega, usuario, tags, comentario, responsable } = req.body;
        const bd = new BD();

        let tagsNuevos;
        let comentariosNuevos;

        const tarea = await services.mysql.postTabla(bd, 'Tarea', { titulo, descripcion, estatusComplecion, fechaEntrega, usuarioId: usuario, responsable });

        if(tarea.msg){
            bd.close();

            throw new Error(tarea.msg);
        }

        //id de la tarea creada
        idTarea = tarea.insertId;

        // Crear los nuevos tags
        if(tags && tags.length > 0) {
            const tagsTarea = tags.map(async tag => {
                const tagNuevo = { tag: tag, tareaId: tarea.insertId };
                
                try {
                    return await services.mysql.postTabla(bd, 'Tag', tagNuevo);
                } catch (error) {
                    console.log(colors.red(error));

                    return error;                    
                }
            });

            tagsNuevos = await Promise.all(tagsTarea);
        }

        // Crear el comentario
        if(comentario) {
            const comentarioNuevo = { comentario, usuarioId: usuario, tareaId: tarea.insertId };
            
            comentariosNuevos = await services.mysql.postTabla(bd, 'Comentario', comentarioNuevo);
        }

        bd.close();

        return res.status(200).json({
            tarea: tarea.insertId,
            tags: (tags && tags.length > 0) ? tagsNuevos.map(tag => {
                if(tag.insertId)
                    return tag.insertId
                else
                    return tag;
            }) : [],
            comentarios: (comentario) 
                ? (comentariosNuevos.insertId)
                    ? comentariosNuevos.insertId
                    : comentariosNuevos
                : ""
        });
    } catch (error) {
        console.log(colors.red(error));

        //Eliminar la tarea creada en caso de algún error
        const bd = new BD();
        await services.mysql.delTabla(bd, 'Tarea', idTarea);
        console.log(colors.magenta('Tarea con id: ' + idTarea + ' eliminada'));
        bd.close();

        return res.status(406).json({ msg: error.message });
    }
};

// ruta: /api/tareas/
const actualizarTarea = async(req = request, res = response) => {
    try {
        const { titulo, descripcion, estatusComplecion, fechaEntrega, tags, comentario, responsable, usuario, id } = req.body;
        const bd = new BD();

        let tagsNuevos;
        let comentariosNuevos;

        const perteneceTarea = await services.mysql.getTabla(bd, 'Tarea', '*', `usuarioId = ? AND id = ?`, [usuario, id]);

        if(perteneceTarea.length === 0){
            bd.close();

            throw new Error('La tarea no pertenece al usuario');
        }

        const tarea = await services.mysql.putTabla(bd, 'Tarea', id, { 
            titulo, 
            descripcion, 
            estatusComplecion, 
            fechaEntrega, 
            responsable
        });

        if(tarea.msg){
            bd.close();

            throw new Error(tarea.msg);
        }

        // Eliminar tags y crear los nuevos tags
        if(tags && tags.length > 0) {
            await services.mysql.delTabla(bd, 'Tag', null, `tareaId = ?`, [id]);

            const tagsTarea = tags.map(async tag => {
                const tagNuevo = { tag: tag, tareaId: id };
                
                try {
                    return await services.mysql.postTabla(bd, 'Tag', tagNuevo);
                } catch (error) {
                    console.log(colors.red(error));

                    return error;                    
                }
            });

            tagsNuevos = await Promise.all(tagsTarea);
        }

        // Agregar otro comentario nuevo
        if(comentario) {
            const comentarioNuevo = { comentario, usuarioId: usuario, tareaId: id };
            
            comentariosNuevos = await services.mysql.postTabla(bd, 'Comentario', comentarioNuevo);
        }

        bd.close();

        return res.status(200).json({
            tarea: id,
            tags: (tags && tags.length > 0) ? tagsNuevos.map(tag => {
                if(tag.insertId)
                    return tag.insertId
                else
                    return tag;
            }) : [],
            comentarios: (comentario) 
                ? (comentariosNuevos.insertId)
                    ? comentariosNuevos.insertId
                    : comentariosNuevos
                : ""
        });
    } catch (error) {
        console.log(colors.red(error));

        return res.status(406).json({ msg: error.message });
    }
};

// ruta: /api/tareas/
const eliminarTarea = async(req = request, res = response) => {
    try {
        const {tarea, usuario} = req.headers;

        const bd = new BD();

        const eliminada = await services.mysql.delTabla(bd, 'Tarea', null, `id = ? and usuarioId = ?`, [tarea, usuario]);
        
        bd.close();

        if(eliminada.msg)
            throw new Error(eliminada.msg);
        else 
            if(eliminada.affectedRows === 0)
                throw new Error('La tarea no existe');
            else
                return res.status(200).json({ msg: 'Tarea eliminada' });
    } catch (error) {
        console.log(colors.red(error));

        return res.status(406).json({ msg: error.message });
    }
}

export {
    obtenerTarea,
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea
}