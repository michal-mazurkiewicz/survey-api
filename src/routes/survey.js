const express = require('express')
const SurveyController = require('../controllers/survey')

const router = express.Router()

router.get('/', SurveyController.getSurveys)
router.get('/:id', SurveyController.getSurvey)
router.post('/', SurveyController.createSurvey)
router.put('/:id', SurveyController.submitResponse)

module.exports = router