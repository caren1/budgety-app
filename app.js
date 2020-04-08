// BUDGET CONTROLLER
var budgetController = (() => {

    // constructor function for Expense
    var Expense = function (id, descirption, value) {
        this.id = id;
        this.descirption = descirption;
        this.value = value;
        this.percentage = -1;
    };


    // Calculating the percentage for indiviudal item
    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    // Returning the calcuated percentage
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    // constructor function for Income
    var Income = function (id, descirption, value) {
        this.id = id;
        this.descirption = descirption;
        this.value = value;
    };

    // Sum of all items based on type
    var caluclateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });

        data.totals[type] = sum;
    };

    // Data structure to keep all of our data
    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {

        // Adding a new item
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
        },

        // Deleting the item 
        deleteItem: (type, id) => {
            var ids, index;

            // We are looping over the ids array to find the correct element
            // In comparison to array, map returns a completely new array (in this case with ids only)
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            // Index can be -1 if not found the ID
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        // Calculating total income and expenses
        calculateBudget: function () {
            // Sum of all expenses
            caluclateTotal('exp');
            // Sum of all incomes 
            caluclateTotal('inc');

            // Calculating the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculating the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        // Allowing to access the budget data
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
    };

})();


// UI CONTROLLER
var UIController = (() => {


    // Defining the DOM stirngs in a Object
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    };

    return {
        // Getting the input values from the DOM
        getinput: () => {
            return {
                // either inc or exp (income (-) & expense (+))
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        // Adding a new Objet to the UI
        addListItem: (obj, type) => {
            var html, newHtml, element;
            // Creating HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>'
            }
            // Replacing placholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.descirption);
            newHtml = newHtml.replace('%value%', obj.value);

            // Inserting the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        // Clearing the filled input fields
        clearFields: () => {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();

        },

        // Displaying the budget in the UI
        displayBudget: (obj) => {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;


            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },



        getDOMstrings: () => {
            return DOMstrings;
        }

    };

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    // Setting up the event listeners
    var setupEventListeners = () => {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = () => {

        // Calculating the budget
        budgetCtrl.calculateBudget();

        // Returning the budget
        var budget = budgetCtrl.getBudget();

        // Displaying the budget on the UI
        UICtrl.displayBudget(budget);

    };

    var updatePercentages = function () {
        // 1. Calculating percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with new percentages
        console.log(percentages);

    };

    var ctrlAddItem = () => {
        var input;
        var newItem;

        // 1. Get filled input data 
        input = UICtrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the user interface
            UICtrl.addListItem(newItem, input.type);

            // 3.5 Clearing out input fields 
            UICtrl.clearFields();

            // 4. Calculating and updating the budget
            updateBudget();

            // 5 Calculating and updating percentages
            updatePercentages();

        }
    };


    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            //format for id (inc-1 ; exp-1)
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1 Deleting the item from our data structure 
            budgetCtrl.deleteItem(type, ID);

            //2 delete the item from the UI
            UICtrl.deleteListItem(itemID);

            //3 re-calculate the budget and update the UI
            updateBudget();

            // 4 Calculating and updating percentages
            updatePercentages();

        }
    };

    return {

        init: () => {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }

    };

})(budgetController, UIController);

controller.init();