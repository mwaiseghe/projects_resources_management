const express = require('express');
const bodyParser = require('body-parser');
const { resourcesRouter } = require('./Routes/resoursesRoutes');

const app = express();

// Settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('api/resources', resourcesRouter);

app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});
// Starting the server
app.listen(8002, () => {
    console.log('Server on port', 8002);
}
);

