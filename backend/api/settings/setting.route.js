const router = require('express').Router();

const { getSettings, updateSetting } = require('./setting.controller');

router.get('/', getSettings);
router.put('/', updateSetting);

module.exports = router;