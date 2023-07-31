const { sqlConfig, mssql } = require("../../Config/Config");


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
        const pool = await mssql.connect(sqlConfig);
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

const createResourceTable = async (req, res) => {
    try {
        const table = `
            BEGIN TRY
                CREATE TABLE resources(
                    id VARCHAR(200) PRIMARY KEY,
                    resource_type_id INT NOT NULL,
                    resource_name VARCHAR(255) NOT NULL,
                    resource_description VARCHAR(255) NOT NULL,
                    resource_cost FLOAT NOT NULL,
                    is_available BIT NOT NULL DEFAULT 1,
                    FOREIGN KEY (resource_type_id) REFERENCES resources_types(id)
                );
            END TRY
            BEGIN CATCH
                PRINT 'Table resources already exists';
            END CATCH
            `;
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(table, (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(res);
        }

        );
        res.status(200).json({message: 'Table resources created successfully'});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createResourceType,
    createResourceTable,
};
