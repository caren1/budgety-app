// BUDGET CONTROLLER
var budgetController = (() => {

    var Expense = (id, descirption, value) => {
        this.id = id;
        this.descirption = descirption;
        this.value = value;
    };

    var Income = (id, descirption, value) => {
        this.id = id;
        this.descirption = descirption;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            incomes: []
        },

        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {

    };

})();


// UI CONTROLLER
var UIController = (() => {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getinput: () => {
            return {
                // either inc or exp (income (-) & expense (+))
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: () => {
            return DOMstrings;
        }

    };

})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = () => {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = () => {

        // 1. get filled input data 
        var input = UICtrl.getinput();
        console.log(input);


        // 2. add the item to the budget controller
        // 3. add the new item to the user interface
        // 4. calculate the budget
        // 5. Display the budget on the UI
    };

    return {

        init: () => {
            console.log('Application has started.');
            setupEventListeners();
        }

    };

})(budgetController, UIController);

controller.init();