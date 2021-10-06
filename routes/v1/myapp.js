const express = require('express');
const appRoot = require('app-root-path');
const Constants = require('@org/orgutils/common/constants');
const getBackEndToken = require('@org/orgutils/common/get_backend_oauth_token');

const MyappController = require(appRoot + '/app/v1/controllers/myapp_controller');
const myappController = new MyAppController();


const ELKController = require('@org/orgutils/helpers/elk_middleware');
const elkController = new ELKController();

let myappRouter = express.Router();

myappRouter.post('/hello', elkController.start, checkAppVersion, validatePartner.checkPartnerKey, getBackEndToken, myappController.hello);

module.exports = myappRouter;