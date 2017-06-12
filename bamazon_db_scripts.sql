CREATE DATABASE `bamazon` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `bamazon`.`departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(75) NOT NULL,
  `over_head_costs` decimal(11,2) DEFAULT '0.00',
  `total_sales` decimal(11,2) DEFAULT '0.00',
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

CREATE TABLE `bamazon`.`products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `department_name` varchar(50) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `product_sales` decimal(11,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bamazon`.`vw_lowinventory` AS 
select `bamazon`.`products`.`item_id` AS `Product_Id`,`bamazon`.`products`.`product_name` AS `Product_Name`
,`bamazon`.`products`.`department_name` AS `Department`,`bamazon`.`products`.`price` AS `Price`
,`bamazon`.`products`.`stock_quantity` AS `Quantity` 
from `bamazon`.`products` 
where ((`bamazon`.`products`.`stock_quantity` > 0) and (`bamazon`.`products`.`stock_quantity` < 5)) 
order by `bamazon`.`products`.`department_name`,`bamazon`.`products`.`product_name`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bamazon`.`vw_productsforsale` AS 
select `bamazon`.`products`.`item_id` AS `Product_Id`,`bamazon`.`products`.`product_name` AS `Product_Name`
,`bamazon`.`products`.`department_name` AS `Department`,`bamazon`.`products`.`price` AS `Price`
,`bamazon`.`products`.`stock_quantity` AS `Quantity` 
from `bamazon`.`products` where (`bamazon`.`products`.`stock_quantity` > 0) 
order by `bamazon`.`products`.`department_name`,`bamazon`.`products`.`product_name`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bamazon`.`vw_salesbydepartment` AS 
select `bamazon`.`departments`.`department_id` AS `Department_Id`,`bamazon`.`departments`.`department_name` AS `Department_Name`
,`bamazon`.`departments`.`over_head_costs` AS `Overhead_Costs`,`bamazon`.`departments`.`total_sales` AS `Total_Sales`
,(`bamazon`.`departments`.`total_sales` - `bamazon`.`departments`.`over_head_costs`) AS `Total_Profits` 
from `bamazon`.`departments` order by `bamazon`.`departments`.`department_name`;





