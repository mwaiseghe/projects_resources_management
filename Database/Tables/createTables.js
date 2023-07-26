const {poolPromise, mssql} = require('../Config/Config');


const createResourceType = async (req, res) => {
    try {
        const table = `
            
            BEGIN TRY
                CREATE TABLE resources_types(
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    name VARCHAR(50) NOT NULL UNIQUE,
                    description VARCHAR(255) NOT NULL
                );
            END TRY
            BEGIN CATCH
                PRINT 'Table resources_types already exists';
            END CATCH
        `;
        const pool = await poolPromise;
        const result = await pool.request().query(table, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(res);
        }

        );
        res.status(200).json({message: 'Table resources_types created successfully'});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createResourceType
};
