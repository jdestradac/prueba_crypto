const express = require('express');
const router = express.Router();

const controller = require('../controllers/Controlller')

router.get('/', controller.list);

module.exports= router