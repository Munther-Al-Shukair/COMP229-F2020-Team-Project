// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        // for each button which has a btn-danger class
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/survey-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();


//my survey - create survey


let textCount = 0;
let ocCount = 0;
let mcCount = 0;


var qContainer = document.getElementById("qContainer");
qContainer.className = "qContainer";
var addText = document.getElementById("addTextInput");
var addOC = document.getElementById("addOCInput");
var addMC = document.getElementById("addMCInput");

//for text question
addText.onclick = function () {

    var container = document.createElement("div");
    container.className = "test-question-container";

    //important
    var textInput = document.createElement("input");
    textInput.className = "test-question-input";
    textInput.name = "textQuestion" + textCount;
    textInput.type = "text";
    textInput.placeholder = "Enter a question";

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.id = "removeItemBtn";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () { qContainer.removeChild(container) };


    qContainer.appendChild(container);
    container.appendChild(textInput);
    container.appendChild(removeBtn);

    textCount++;
};


//for one choice question
addOC.onclick = function () {

    var container = document.createElement("div");
    container.className = "OC-question-container";

    //important
    var textInput = document.createElement("input");

    textInput.name = "ocQuestion" + ocCount;

    textInput.className = "test-question-input";
    textInput.type = "text";
    textInput.placeholder = "Enter the question";

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.id = "removeItemBtn";
    removeBtn.textContent = "Remove";

    removeBtn.onclick = function () { qContainer.removeChild(container) };

    var optionContainer = document.createElement("div");
    optionContainer.className = "option-container";

    var addQuestionOption = document.createElement("button");
    addQuestionOption.type = "button";
    addQuestionOption.id = "addQuestionOption";
    addQuestionOption.textContent = "Add Option";

    var ooContainer = document.createElement("div");
    ooContainer.className = "inner-option-list";

    addQuestionOption.onclick = function () {

        var option = document.createElement("input");
        option.type = "radio";
        option.name = textInput.textContent;

        
        var textLabel = document.createElement("input");
        textLabel.type = "text";
        textLabel.placeholder = "Enter you option";
        //important
        textLabel.name = "ocOption" + (ocCount-1);

        option.id = textLabel.textContent;
        option.value = textLabel.textContent;

        var removeOptBtn = document.createElement("button");
        removeOptBtn.type = "button";
        removeOptBtn.id = "removeOptBtn";
        removeOptBtn.textContent = "Remove Option";

        removeOptBtn.onclick = function () {
            ooContainer.removeChild(option);
            ooContainer.removeChild(textLabel);
            ooContainer.removeChild(removeOptBtn);
        };

        ooContainer.appendChild(option);
        ooContainer.appendChild(textLabel);
        ooContainer.appendChild(removeOptBtn);

        optionContainer.insertBefore(ooContainer, addQuestionOption);
        
    };

    qContainer.appendChild(container);
    container.appendChild(textInput);
    container.appendChild(removeBtn);
    container.appendChild(optionContainer);
    optionContainer.appendChild(addQuestionOption);
    ocCount++;
};

//for multiple choice question
addMC.onclick = function () {

    var container = document.createElement("div");
    container.className = "MC-question-container";

    //important
    var textInput = document.createElement("input");
    textInput.className = "test-question-input";
    textInput.name = "mcQuestion" + mcCount;
    textInput.type = "text";
    textInput.placeholder = "Enter the question";

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.id = "removeItemBtn";
    removeBtn.textContent = "Remove";

    removeBtn.onclick = function () { qContainer.removeChild(container) };

    var optionContainer = document.createElement("div");
    optionContainer.className = "option-container";

    var addQuestionOption = document.createElement("button");
    addQuestionOption.type = "button";
    addQuestionOption.id = "addQuestionOption";
    addQuestionOption.textContent = "Add Option";

    var ooContainer = document.createElement("div");
    ooContainer.className = "inner-option-list";

    addQuestionOption.onclick = function () {

        var option = document.createElement("input");
        option.type = "checkbox";
        
        //important
        var textLabel = document.createElement("input");
        textLabel.type = "text";
        textLabel.name = "mcOption" + (mcCount-1);
        textLabel.placeholder = "Enter you option";

        option.id = textLabel.textContent;
        option.value = textLabel.textContent;
        option.name = textLabel.textContent;

        var removeOptBtn = document.createElement("button");
        removeOptBtn.type = "button";
        removeOptBtn.id = "removeOptBtn";
        removeOptBtn.textContent = "Remove Option";

        removeOptBtn.onclick = function () {
            ooContainer.removeChild(option);
            ooContainer.removeChild(textLabel);
            ooContainer.removeChild(removeOptBtn);
        };

        ooContainer.appendChild(option);
        ooContainer.appendChild(textLabel);
        ooContainer.appendChild(removeOptBtn);

        optionContainer.insertBefore(ooContainer, addQuestionOption);
    };

    qContainer.appendChild(container);
    container.appendChild(textInput);
    container.appendChild(removeBtn);
    container.appendChild(optionContainer);
    optionContainer.appendChild(addQuestionOption);
    mcCount++;
};
