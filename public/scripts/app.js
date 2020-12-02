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
var qContainer = document.getElementById("qContainer");
var addText = document.getElementById("addTextInput");
var addOC = document.getElementById("addOCInput");
var addMC = document.getElementById("addMCInput");

//for text question
addText.onclick = function () {

    var container = document.createElement("div");
    container.className = "test-question-container";

    var textInput = document.createElement("input");
    textInput.className = "test-question-input";
    textInput.id = "text-question";
    textInput.type = "text";
    textInput.placeholder = "Enter a question";

    var removeBtn = document.createElement("button");
    removeBtn.id = "removeItemBtn";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function () { qContainer.removeChild(container) };


    qContainer.appendChild(container);
    container.appendChild(textInput);
    container.appendChild(removeBtn);
};


//for one choice question
addOC.onclick = function () {

    var container = document.createElement("div");
    container.className = "OC-question-container";

    var textInput = document.createElement("input");
    textInput.className = "test-question-input";
    textInput.id = "text-question";
    textInput.type = "text";
    textInput.placeholder = "Enter the question";

    var removeBtn = document.createElement("button");
    removeBtn.id = "removeItemBtn";
    removeBtn.textContent = "Remove";

    removeBtn.onclick = function () { qContainer.removeChild(container) };

    var optionContainer = document.createElement("div");
    optionContainer.className = "option-container";

    var addQuestionOption = document.createElement("button");
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
        option.id = textLabel.textContent;
        option.value = textLabel.textContent;

        var removeOptBtn = document.createElement("button");
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
};

//for multiple choice question
addMC.onclick = function () {

    var container = document.createElement("div");
    container.className = "MC-question-container";

    var textInput = document.createElement("input");
    textInput.className = "test-question-input";
    textInput.id = "text-question";
    textInput.type = "text";
    textInput.placeholder = "Enter the question";

    var removeBtn = document.createElement("button");
    removeBtn.id = "removeItemBtn";
    removeBtn.textContent = "Remove";

    removeBtn.onclick = function () { qContainer.removeChild(container) };

    var optionContainer = document.createElement("div");
    optionContainer.className = "option-container";

    var addQuestionOption = document.createElement("button");
    addQuestionOption.id = "addQuestionOption";
    addQuestionOption.textContent = "Add Option";

    var ooContainer = document.createElement("div");
    ooContainer.className = "inner-option-list";

    addQuestionOption.onclick = function () {

        var option = document.createElement("input");
        option.type = "checkbox";
        
        var textLabel = document.createElement("input");
        textLabel.type = "text";
        textLabel.placeholder = "Enter you option";

        option.id = textLabel.textContent;
        option.value = textLabel.textContent;
        option.name = textLabel.textContent;

        var removeOptBtn = document.createElement("button");
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
};
