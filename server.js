const appRoot = require('app-root-path');
const app = require('@org/orgutils/server');
const port = 4000;
const splunk = require('@org/orgutils/common/elk_log');
const Constants = require('@org/orgutils/common/constants');
const routeUtil = require('@org/orgutils/utils/routes');
const v1appRouter = require(appRoot + '/routes/v1/userRouter');
const v2appRouter = require(appRoot + '/routes/v2/userRouter');

process.on('unhandledRejection', function (reason, p) {
  let logMessage = 'App Unhandled Rejection at: ' + p + ' and reason: ' + reason;
  elklogger.log(logMessage, null, null, 0, null, null, Constants.TRACE_POINT.PRINT);
});

process.on('uncaughtException', function (error) {
  let logMessage = 'App Uncaught Exception error:' + error;
  elklogger.log(logMessage, null, null, 0, null, null, Constants.TRACE_POINT.PRINT);
});

app.use('/api/v1/', v1appRouter);
app.use('/api/v2/', v2appRouter);


routeUtil.printRoutes(app);

app.use(function (req, res, next) {
  if (res.headersSent) {
    //return next(err);
  } else {
    elklogger.error('Node API request Error', req, res, 0, req.method + Constants.COLON + req.baseUrl + req.url, null, Constants.TRACE_POINT.EXCEPTION);
    res.status(404).json({
      message: 'Route not found: ' + req.url
    });
  }
});

app.listen(port, console.log('Mainak app listening on port: ' + port));