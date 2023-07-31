DROP DATABASE IF EXISTS construction_resources;

CREATE DATABASE construction_resources;

USE construction_resources;

DROP TABLE IF EXISTS resources_types;

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

DROP TABLE IF EXISTS resources;

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


DROP TABLE IF EXISTS projects;

CREATE TABLE projects(
    id VARCHAR(200) PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL, 
    project_description VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    is_completed BIT NOT NULL
)

DROP TABLE IF EXISTS project_resources;

CREATE TABLE project_resources(
    id INT IDENTITY(1,1) PRIMARY KEY,
    project_id VARCHAR(200) NOT NULL,
    resource_id VARCHAR(200) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (resource_id) REFERENCES resources(id)
);