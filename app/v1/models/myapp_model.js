const queryString = require('querystring');
const axios = require('@org/orgutils/utils/axios_instance');
const rclient = require('@org/orgutils/utils/redis_client')();
const splunk = require('@veloewb/vnmutils/common/splunk_log');
const errorHandler = require('@org/orgutils/common/error_handler');
const Constants = require('@org/orgutils/common/constants');

async function hello(req, res, next) {
  const startTime = new Date().getTime();
  
  //const result = await someFunction(req, something);

  
  //const endpoint = baseUrl + process.env.ROUTES_XYZ;

  // adding for into body from header
  //req.body.bodyData.abcType = req.headers.something;

  const options = {
    method: 'post',
    url: endpoint,
    data: {
      ...req.body
    },
    headers: {
      ...req.headers,
    }
  };

  try {
    //let response = await axios(options);
    // elk.log('hello API response', req, {
    //   body: response.data,
    //   headers: {
    //     ...response.headers
    //   }
    // }, new Date().getTime() - startTime, Constants.CALL_TYPE.POST + process.env.ROUTES_HELLO_API, null, Constants.TRACE_POINT.AFTER_REQUEST, response.status);

    res.status(200).json({
        data: "Hello " + req.body.name;
    });
  } catch (err) {
    //something
  }
}


function getBackendMetadata(req, res, next) {
  req.END_POINT = process.env.ROUTES_END_POINT.replace("{abcNumber}", req.ABC_NUM);
  backendHelpers.makeBackEndGetCall(req, res, next);
}


module.exports = {
  hello
}