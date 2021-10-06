const appRoot = require('app-root-path');
const splunk = require('@veloewb/vnmutils/common/splunk_log');
const myappModel = require(appRoot + '/app/v1/models/myapp_model');
//const Constants = require('@org/orgutils/common/constants');

class MyAppController {

  /**
   * @swagger
   * /api/v1/myapp/hello:
   *   post:
   *     tags:
   *       - Auth
   *     description: hello with name and age
   *
   *     parameters:
   *      - name: body
   *        in: body
   *        required: true
   *        schema:
   *           type: object
   *           properties:
   *             authRequest:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                   example: mainak
   *                 age:
   *                   type: string
   *                   example: 22
   *
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: returns hello with name
   */
  hello(req, res, next) {
    try {
      myappModel.hello(req, res, next);
    } catch (e) {
      splunk.error(e);
      //res.status(Constants.INT_SRV_CODE).json({
      res.status(500).json({
        msg: 'Error - /myapp/hello Failed!'
      });
    }
  }

}

module.exports = MyappController;