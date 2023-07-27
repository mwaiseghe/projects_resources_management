const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { resourcesRouter } = require('./Routes/resoursesRoutes');

const app = express();

// Settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())
app.use('/api/resource', resourcesRouter);

app.use((err, req, res, next) => {
    res.json({error: err.message});
});
// Starting the server
app.listen(8002, () => {
    console.log('Server on port', 8002);
}
);

