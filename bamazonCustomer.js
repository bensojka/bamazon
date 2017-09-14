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
    // run the readProducts function
    readProducts();
});

function readProducts() {
  console.log("ITEM ID | PRODUCT NAME | DEPARTMENT NAME | PRICE | STOCK QUANTITY")
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity + " remaining");
    }
    console.log("-----------------------------------");
    whatProduct();
  });
}

function whatProduct() {
    // query the database for all items being sold
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to buy
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
            message: "What product would you like to buy? \n  Select by typing the item id number:"
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
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
          if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
            // there is enough inventory, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: chosenItem.stock_quantity - answer.quantity
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(err) {
                if (err) throw err;
                console.log("Your purchase was successful! You were charged $" + (chosenItem.price * answer.quantity) + ".");
                nextMove();
              }
            );
          }
          else {
            // not enough product, so apologize and start over
            console.log("You requested to purchase more product than we have in stock. There are only " + chosenItem.stock_quantity + " items remaining...");
            nextMove();
          }
        });
    });
}

function nextMove() {
  inquirer
    .prompt({
      name:"stayOrLeave",
      type: "rawlist",
      message: "Would you like to [CONTINUE SHOPPING] or [LEAVE STORE]?",
      choices: ["CONTINUE SHOPPING", "LEAVE STORE"]
    })
    .then(function(answer) {
      if (answer.stayOrLeave.toUpperCase() === "CONTINUE SHOPPING") {
        readProducts();
      }
      else {
        console.log("Thanks for shopping with Bamazon!");
        process.exit();
      }
    });
}

