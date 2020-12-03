let mongoose = require('mongoose');

// create a model class
let userSurveyModel = mongoose.Schema({
    Title: String,
    CreatorName: String,
    CreateDate: Date ,
    ExpireDate: Date, 
    CompletedPeople: Number,
    Questions: 
    {
        Question: String,
        Type: String,
        Options: Array
    }
},
{
    collection: "userSurvey"
});

module.exports = mongoose.model('UserSurvey', userSurveyModel);