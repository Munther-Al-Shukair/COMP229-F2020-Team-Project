let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport-local');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

let surveyController = require('../contrllers/mySurveyController')

// GET Router for the Survey List page - READ - Operation
router.get('/', requireAuth, surveyController.displayMySurveyPage);

// GET Router for displaying the Add page - CREATE Operation
router.get('/create-survey', requireAuth, surveyController.displayCreatePage);

// POST Router for proccing the Add page - CREATE Operation
router.post('/create-survey', requireAuth, surveyController.processCreatePage);

//Get routter for displaying the user survey
router.get('/view/:id', requireAuth, surveyController.displayViewPage);

//GET router for displaying the survey respond
router.get('/view/detail/:id', requireAuth, surveyController.displayViewDetailPage);

// GET Router for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

// POST Router for proccing the Edit page - UPDATE Operation
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

// GET to perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, surveyController.performDeletion);

module.exports = router;