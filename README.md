# BAMAZON

RUN ON THE COMMAND LINE 

two different indexes (bamazonCustomer & bamazonManager)

bamazonCustomer
--- purchase items from inventory

bamazonManager
--- add/subtract items from inventory and more features

Running this application will first display all of the items available for sale.
The app will then prompt users with two messages.

The first asks them the ID of the product they would like to buy.
The second message asks how many units of the product they would like to buy.

Once the customer has placed an order, the application checks if the store has enough of the product to meet the customer's request.

If not, the app will log an error phrase and then prevent the order from going through.

However, if the store does have enough of the product, it will fulfill the customer's order.


This means the SQL database gets updated to reflect the remaining quantity.
Once the update goes through, the customer is shown the total cost of their purchase.