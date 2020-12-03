let express = require('express');
let reouter = express.Router();
let mongoose = require('mongoose');

// let jwt = require('jsonwebtoken');   // implement jwt if we are going to convert to ANGULAR

// create reference to the model
let SurveyRespond = require('../models/surveyRespond');
let userSurvey = require('../models/userSurvey');

module.exports.displaySurveyPage = (req, res, next) => {

    userSurvey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(SurveyList);
            res.render('survey/list',
                {
                    title: 'Survey',
                    surveyList: surveyList,
                    Email: req.user ? req.user.email : '',
                    //username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : '',
                    userID: req.user ? req.user._id : ''
                });
        }
    });
}

module.exports.displayUserSurveyPage = (req, res, next) => {

    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(SurveyList);
            res.render('survey/userSurvey',
                {
                    title: 'Survey',
                    surveyList: surveyList,
                    Email: req.user ? req.user.email : '',
                    //username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    });
}

//important
module.exports.displayAddPage = (req, res, next) => {
    //find matching surey
    let id = req.params.id;

    userSurvey.findById(id, (err, surveyToView) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('survey/add',
                {
                    title:"Take Survey",
                    userSurvey: surveyToView,
                    userID: req.user ? req.user._id : '' ,
                    Email: req.user ? req.user.email : '',
                    displayName: req.user ? req.user.displayName : ''
                })
        }
    });
};

//important - add to survey respond
module.exports.processAddPage = (req, res, next) => {

    let id = req.params.id;


    userSurvey.findById(id, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            let respond = {};
            let surveyTitle;

            surveyTitle = survey.Title;

            console.log(survey.Questions);

            console.log(req.body);

            for (const [key, value] of Object.entries(survey.Questions)){
                let $value = value;
                let $key = key;
                
                console.log(req.body[$key]);
                if(Array.isArray($value)){
                    //respond[$key] = req.body[$key];  
                }   
                else{
                    respond[$value] = req.body[$key];
                } 
                
            }

            console.log(respond);

            let curDate = new Date();

            let newSurvey = SurveyRespond({
                "SurveyId": survey._id,
                "UserId": req.user ? req.user._id : '' ,
                "UserName": req.user ? req.user.displayName : '',
                "SurveyTitle": surveyTitle,
                "RespondDate":curDate,
                "Respond":respond
            });
        
            SurveyRespond.create(newSurvey, (err, SurveyRespond) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }
                else {
                    // refresh the survey list
                    res.redirect('/survey-list');
                }
            });
        }
    });
};


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('survey/edit',
                {
                    title: 'Edit Survey',
                    survey: surveyToEdit,
                    Email: req.user ? req.user.email : '',
                    //username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : ''
                })
        }
    });
};


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "Name": req.body.Name,
        "Gender": req.body.Gender,
        "Answer1": req.body.Answer1,
        "Answer2": req.body.Answer2,
        "Answer3": req.body.Answer3,
        "Email": req.user.email
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};


module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};