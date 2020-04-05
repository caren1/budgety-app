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

        addItem: (type, desc, val) => {
            var newItem;

            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        }
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
        var input;
        var newItem;

        // 1. get filled input data 
        input = UICtrl.getinput();

        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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