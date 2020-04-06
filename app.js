// BUDGET CONTROLLER
var budgetController = (() => {

    var Expense = function (id, descirption, value) {
        this.id = id;
        this.descirption = descirption;
        this.value = value;
    };

    var Income = function (id, descirption, value) {
        this.id = id;
        this.descirption = descirption;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {

        addItem: (type, des, val) => {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
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

        addListItem: (obj, type) => {
            var html, newHtml, element;
            // create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
            }
            // replace placholder text with actual date
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.descirption);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: () => {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
            
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
        UICtrl.addListItem(newItem, input.type);
        // 3.5 clearing out input fields 
        UICtrl.clearFields();
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