let express = require('express');
const { type } = require('jquery');
let reouter = express.Router();
let mongoose = require('mongoose');
const { aggregate } = require('../models/userSurvey');

const  mySurvey = require('../models/userSurvey');

// /my-survey
module.exports.displayMySurveyPage = (req, res, next) => {
    //find all user survey
    mySurvey.find({CreatorID: req.user._id},
        (err, userSurvey) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('UserSurvey/mySurvey',
                {   
                    title: "My Survey",
                    userSurveyList: userSurvey,
                    userID: req.user._id,
                    Email: req.user ? req.user.email : '',
                    //username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : ''
                }
            );
        }
    }
    );
}


// /my-survey/view
module.exports.displayViewPage = (req, res, next) => {
    //find matching surey
    let id = req.params.id;

    mySurvey.findById(id, (err, surveyToView) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('UserSurvey/viewSurvey',
                {
                    title:"My Survey",
                    userSurvey: surveyToView,
                    userID: req.user._id,
                    Email: req.user ? req.user.email : '',
                    displayName: req.user ? req.user.displayName : ''
                })
        }
    });
    
}


// /my-survey/create-survey
//display create page
module.exports.displayCreatePage = (req, res, next) => {
    res.render('UserSurvey/createSurvey',
        {
            title:"Create a Survey",
            Email: req.user ? req.user.email : '',
            username: req.user ? req.user.username : '',
            displayName: req.user ? req.user.displayName : ''
        });
}

//process create page
module.exports.processCreatePage = (req,res,next)=>{
    let currentDate = new Date();
    let questions = Object.assign({},req.body);
    delete questions.surveyTitle;
    delete questions.exipireDate;
    //var question = document.getElementById("question");
    let newUserSurvey = mySurvey({
        "Title": req.body.surveyTitle,
        "CreatorID":req.user._id,
        "CreatorName": req.user.displayName,
        "CreateDate": currentDate,
        "ExpireDate": currentDate,
        "CompletedPeople": 0,
        "Questions": questions
    });

    mySurvey.create(newUserSurvey, (err, Survey) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/my-survey');
        }
    });

    console.log(req.body);

}


// my-survey/edit
//display edit page
module.exports.displayEditPage = (req, res, next) => {
    //find matching surey
    let id = req.params.id;

    mySurvey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('UserSurvey/editSurvey',
                {
                    title:"Edit a Survey",
                    userSurvey: surveyToEdit,
                    userID: req.user._id,
                    Email: req.user ? req.user.email : '',
                    displayName: req.user ? req.user.displayName : ''
                })
        }
    });
}


//process edit page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = mySurvey({
        "Title": req.user.surveyTitle,
        "CreatorName": req.user.displayName,
        //"CreateDate": currentDate,
        "ExpireDate": req.user.exipireDate,
        //"CompletedPeople": 0,
        "Questions": req.body.qContainer
    });

    mySurvey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/my-survey');
        }
    });
};


//perform deletion
module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    mySurvey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/my-survey');
        }
    });
};