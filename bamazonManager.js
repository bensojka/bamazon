var mysql = require("mysql");
var inquirer = require("inquirer");

// connection information for the sql database

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Username
    user: "root",

    // password
    password: "Welcome@987!",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the begin function
    uno();
});

function uno() {
	inquirer.prompt([
		{
			type: 'list',
			choices: ['View Products for Sale', 'View Low Inventory', 'Modify Inventory', 'Add New Product'],
			name: 'action',
			message: 'Select an option to continue:'
		}
	]).then(function(response) {
		if ( response.action === 'View Products for Sale' )
			readProducts();
        else if ( response.action === 'View Low Inventory' ) 
            lowInventory();
        else if ( response.action === 'Modify Inventory' )
            modifyInventory();
        else if ( response.action === 'Add New Product')
            newProduct();
	});
}

function readProducts() {
    console.log("ITEM ID | PRODUCT NAME | DEPARTMENT NAME | PRICE | STOCK QUANTITY");
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " remaining");
        }
        console.log("-----------------------------------");
        nextMove();
    });
}

function lowInventory() {
    console.log("ITEM ID | PRODUCT NAME | DEPARTMENT NAME | PRICE | STOCK QUANTITY");
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 3) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " remaining");
            }
        }
        console.log("-----------------------------------");
        nextMove();
    });
}

function modifyInventory() {
    // query the database for all items being sold
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // once you have the items, prompt the manager for inventory they'd like to modify
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
              }
              return choiceArray;
            },
            message: "Which product is having it's inventory modified? \n  Select by typing the item id number:"
          },
          {
            name: "quantity",
            type: "input",
            message: "How much product would you like to add/decrease from inventory?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.choice) {
              chosenItem = res[i];
            }
          }
  
          // determine if there is enough inventory
          if ((chosenItem.stock_quantity + parseInt(answer.quantity)) > 0) {
            // there is enough inventory, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: chosenItem.stock_quantity + answer.quantity
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(err) {
                if (err) throw err;
                console.log(answer.choice + " now has " + chosenItem.stock_quantity + " items in inventory.");
                nextMove();
              }
            );
          }
          else if ((chosenItem.stock_quantity + parseInt(answer.quantity)) <= 0) {
            // inventory will be set to zero
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: 0
                  },
                  {
                    item_id: chosenItem.item_id
                  }
                ],
                function(err) {
                  if (err) throw err;
                  console.log(answer.choice + " inventory has been increased");
                  nextMove();
                }
              );
            nextMove();
          }
        });
    });
}

function newProduct() {
    nextMove();
}

function nextMove() {
    inquirer
        .prompt({
            name:"stayOrLeave",
            type: "rawlist",
            message: "Would you like to [CONTINUE MANAGING] or [FINISH/EXIT]?",
            choices: ["CONTINUE MANAGING", "FINISH/EXIT"]
        })
        .then(function(answer) {
            if (answer.stayOrLeave.toUpperCase() === "CONTINUE MANAGING") {
            uno();
        }
        else {
            console.log("See you next time!");
            process.exit();
        }
    });
}