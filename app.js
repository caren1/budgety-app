// BUDGET CONTROLLER
var budgetController = (function () {



    return {


    };

})();


// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn = '.add__btn'
    };

    return {
        getinput: function () {

            return {
                // either inc or exp (income (-) & expense (+))
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
        
    };

})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings;


    var ctrlAddItem = function () {

        // 1. get filled input data 
        var input = UICtrl.getinput();
        
        
        
        // 2. add the item to the budget controller
        // 3. add the new item to the user interface
        // 4. calculate the budget
        // 5. Display the budget on the UI
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

    return {

    }

})(budgetController, UIController);