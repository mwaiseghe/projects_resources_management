const {poolPromise, mssql} = require('../Config/Config');
const {v4} = require('uuid');

const createResourceType = async (req, res) => {
    try {
        const {name, description} = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('name', mssql.VarChar(50), name)
            .input('description', mssql.VarChar(255), description)
            .execute('sp_addresourceType', (err, res) => {
                if (err) {
                    console.log(err);
                }
                console.log(res);
            }
            );
            return res.json ({
                message: 'Resource Type added successfully',
                body: {
                    resourceType: {name, description}
                }
            })
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {
    createResourceType
};