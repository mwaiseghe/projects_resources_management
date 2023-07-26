const {Router} = require('express');
const { createResourceType } = require('../Controllers/resourcesController');
const resourcesRouter = Router();


resourcesRouter.post('/type', createResourceType);

module.exports = {
    resourcesRouter
}