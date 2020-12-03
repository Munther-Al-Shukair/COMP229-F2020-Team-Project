let mongoose = require('mongoose');

// create a model class
let SurveyRespondModel = mongoose.Schema({
    SurveyId:String,
    UserId: String,
    UserName: String,
    SurveyTitle: String,
    RespondDate: Date,
    Respond: Object
},
{
    collection: "surveyRespond"
});

module.exports = mongoose.model('SurveyRespond', SurveyRespondModel);