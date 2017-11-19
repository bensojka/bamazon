DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 850.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Clothing", 90.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Maker", "Kitchen", 40.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoyo", "Toys & Games", 10.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis Racket", "Sporting Goods", 80.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 475.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 65.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spatula", "Kitchen", 3.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fidget Spinner", "Toys & Games", 4.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Mat", "Sporting Goods", 25.00, 10);




