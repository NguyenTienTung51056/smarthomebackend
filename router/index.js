const deviceRouter = require('./device');

function route(app) {
    app.use('/devices', deviceRouter);
}


module.exports = route;