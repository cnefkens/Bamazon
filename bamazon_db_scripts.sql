-- Create database bamazon;

-- CREATE TABLE `products` (
--   `item_id` int(11) NOT NULL AUTO_INCREMENT,
--   `product_name` varchar(50) NOT NULL,
--   `department_name` varchar(50) NOT NULL,
--   `price` decimal(11,2) NOT NULL,
--   `stock_quantity` int(11) NOT NULL,
--   PRIMARY KEY (`item_id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- insert into bamazon.products (product_name, department_name, price, stock_quantity)
-- values('Prince Greatest Hits','Music',13.89, 20),
-- ('Nirvana Greatest Hits Vinyl','Music',19.99, 10),
-- ('Ballast Point Grapefruit Sculpin 6pbk','Beverage',13.99, 24),
-- ('Kona Brewing Pipeline Porter 6 pack','Beverage',7.99, 12),
-- ('Kingsford Charcoal','Outdoors',8.99, 25),
-- ('Weber Original Kettle Grill','Outdoors',149.99, 10),
-- ('Grassfed Ribeye Steaks 10oz 6pbk','Food',94.99, 20),
-- ('Sweet Potato Medley 11 lbs','Food',49.99, 15),
-- ('Banana Boat Sport 50SPF Sunscreen 8oz','Beauty',6.99, 50),
-- ('Bocce Ball Gameset','Toys',30.49, 10);

use bamazon;

CREATE VIEW `vw_ProductsForSale` AS
select item_Id as Product_Id, product_name as Product_Name, department_Name as Department, price as Price
from bamazon.products
where stock_quantity>0
order by department_name, product_name;

CREATE VIEW `vw_LowInventory` AS
select item_Id as Product_Id, product_name as Product_Name, department_Name as Department, price as Price
from bamazon.products
where stock_quantity>0 and stock_quantity<5
order by department_name, product_name;



