const {mssql, sqlConfig} = require('../Config/Config');
const {v4} = require('uuid');
const { createResourceTable } = require('../Database/Tables/createTables');

const createResourceType = async (req, res) => {
    try {
        const {name, description} = req.body;

        const pool = await (mssql.connect(sqlConfig));
        const result = await (pool.request()
            .input('name', mssql.VarChar, name)
            .input('description', mssql.VarChar, description)
            .execute('sp_addresourceType'))

            if (result.rowsAffected[0] > 0) {
                res.json({
                    message: 'Resource Type created successfully',
                    status: 200
                })
            } else {
                res.json({
                    message: 'Resource Type not created',
                    status: 400
                })
            }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getResourceTypes = async (req, res) => {
    try {
        const pool = await (mssql.connect(sqlConfig));
        const result = await (pool.request().execute('getResourceTypesProcedure'));
        res.json({
            message: 'Resource Types retrieved successfully',
            body: result.recordset,
            status: 200
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getResourceTypeById = async (req, res) => {
    try {
        const {id} = req.params;
        const pool = await (mssql.connect(sqlConfig));
        const result = await (pool.request()
            .input('id', mssql.Int, id)
            .execute('getResourceTypeByIdProcedure'));
        res.json({
            message: 'Resource Type retrieved successfully',
            body: result.recordset,
            status: 200
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const add_resourceController = async (req, res) => {
    try {
        createResourceTable();
        const {resource_type_id, resource_name, resource_description, resource_cost, is_available} = req.body;
        const id = v4();
        const pool = await (mssql.connect(sqlConfig));
        const result = await (pool.request()
            .input('id', mssql.VarChar, id)
            .input('resource_type_id', mssql.Int, resource_type_id)
            .input('resource_name', mssql.VarChar, resource_name)
            .input('resource_description', mssql.VarChar, resource_description)
            .input('resource_cost', mssql.Float, resource_cost)
            .input('is_available', mssql.Bit, is_available)
            .execute('sp_addresource'))

            if (result.rowsAffected[0] > 0) {
                res.json({
                    message: 'Resource created successfully',
                    status: 200
                })
            } else {
                res.json({
                    message: 'Resource not created',
                    status: 400
                })
            }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getResourcesController = async (req, res) => {
    try {
        const pool = await (mssql.connect(sqlConfig));
        const result = await (pool.request().execute('sp_getResources'));
        res.json({
            message: 'Resources retrieved successfully',
            body: result.recordset,
            status: 200
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
};




module.exports = {
    createResourceType,
    getResourceTypes,
    getResourceTypeById,

    add_resourceController,
    getResourcesController
};