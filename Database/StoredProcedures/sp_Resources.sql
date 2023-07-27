USE construction_resources;
GO

CREATE OR ALTER PROCEDURE sp_addresourceType
    @name VARCHAR(50),
    @description VARCHAR(255)
AS
BEGIN TRY 
    INSERT INTO resources_types(name, description)
    VALUES(@name, @description);
END TRY
BEGIN CATCH
    THROW;
END CATCH;
GO

CREATE OR ALTER PROCEDURE getResourceTypesProcedure
AS
BEGIN TRY 
    SELECT * FROM dbo.resources_types;
END TRY
BEGIN CATCH
    THROW;
END CATCH;
GO



CREATE OR ALTER PROCEDURE sp_addResource
    @id VARCHAR(200),
    @resource_type_id INT,
    @resource_name VARCHAR(255),
    @resource_description VARCHAR(255),
    @resource_cost FLOAT,
    @is_available BIT
AS
BEGIN TRY 
    INSERT INTO resources(id, resource_type_id, resource_name, resource_description, resource_cost, is_available)
    VALUES(@id, @resource_type_id, @resource_name, @resource_description, @resource_cost, @is_available);
END TRY

BEGIN CATCH
    THROW;
END CATCH;
GO

EXEC sp_addResource '1', 1, 'Concrete', 'Concrete is a composite material composed of fine and coarse aggregate bonded together with a fluid cement (cement paste) that hardens (cures) over time.', 100, 1;

SELECT * FROM resources;