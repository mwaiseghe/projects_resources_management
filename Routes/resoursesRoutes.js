const {Router} = require('express');
const { createResourceType, getResourceTypes, getResourceTypeById } = require('../Controllers/resourcesController');
const resourcesRouter = Router();


resourcesRouter.post('/type', createResourceType);
resourcesRouter.get('/type/', getResourceTypes);
resourcesRouter.get('/type/:id', getResourceTypeById);


module.exports = {
    resourcesRouter
}