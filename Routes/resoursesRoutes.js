const {Router} = require('express');
const { createResourceType, getResourceTypes } = require('../Controllers/resourcesController');
const resourcesRouter = Router();


resourcesRouter.post('/type', createResourceType);
resourcesRouter.get('/type/', getResourceTypes);


module.exports = {
    resourcesRouter
}