const {Router} = require('express');
const { 
    createResourceType, 
    getResourceTypes, 
    getResourceTypeById, 
    add_resourceController, 
    getResourcesController 
} = require('../Controllers/resourcesController');
const resourcesRouter = Router();


resourcesRouter.post('/type', createResourceType);
resourcesRouter.get('/type/', getResourceTypes);
resourcesRouter.get('/type/:id', getResourceTypeById);

resourcesRouter.post('/resource', add_resourceController);
resourcesRouter.get('/resource', getResourcesController);


module.exports = {
    resourcesRouter
}