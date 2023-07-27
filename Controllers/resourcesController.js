const {sqlConfig, mssql} = require('../Config/Config');
const {v4} = require('uuid');

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


module.exports = {
    createResourceType,
    getResourceTypes
};