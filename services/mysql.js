const getTabla = async(bd, tabla, selects, query, params) => {
    try {
        if (query)
            return await bd.queryConParametros(`SELECT ${selects} FROM ${tabla} WHERE ${query}`, params);
        else
            return await bd.querySinParametros(`SELECT ${selects} FROM ${tabla}`);
    } catch (e) {
        throw new Error(e.message);
    }
}

const postTabla = async(bd, tabla, datos) => {
    try {
        return await bd.queryConParametros(`INSERT INTO ${tabla} SET ?`, [datos]);
    } catch (e) {
        throw new Error(e.message);
    }
}

const putTabla = async(bd, tabla, id, datos) => {
    try {
        return await bd.queryConParametros(`UPDATE ${tabla} SET ? WHERE id = ?`, [datos, id]);
    } catch (e) {
        throw new Error(e.message);
    }
}

const delTabla = async(bd, tabla, id, query, params) => {
    try {
        if(id)
            return await bd.queryConParametros(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
        else
            return await bd.queryConParametros(`DELETE FROM ${tabla} WHERE ${query}`, params);
    } catch (e) {
        throw new Error(e.message);
    }
}

export { getTabla, postTabla, putTabla, delTabla };