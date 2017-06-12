# Bamazon

## Overview

Bamazon is Amazon-like CLI application built using Node and mySQL. It utilizes NPM packages mySQL and Inquirer.  The application includes 
three main javascript files with functions related to customers, managers and supervisors. The app will take in orders from customers and 
deplete stock from the store's inventory and update sales figures. Managers can view inventory, check on low inventory items, add inventory 
to existing projucts and add new products. Supervisors can view product sales across the store's departments and then provide a summary of 
the highest-grossing departments in the store.

## Bamazon Files Overview:
The Bamazon application includes a mySQL database named bamazon that contains two tables: products and sales. The database is not included
in the repository. It includes relevant Node NPM packages (mySQL and Inquirer) and package.json file. Bamazon is compried of has 3 javascript
files: bamazonCustom.js, bamazonManager.js, and bamazonSupervisor.js which contain prompts and functions related to customers, managers and
supervisors, respectively. 

## Bamazon Database Overview:
The bamazon database includes two main tables and three views.
The tables are named: products and departments
The views are named: vw_ProductsForSale, vw_LowInventory, and vw_SalesByDepartment

### Tables
1. The products table includes the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores) 

   *product_sales (product revenue to date) 

2. The departments table includes the following columns:

   * department_id (unique id for each department)

   * department_name (Name of department)

   * over_head_costs (Department overhead costs)

   * total_sales (Department total sales to date)


## Instructions for use

### Customer Script (bamazonCustom.js)

1. Running this script will first display all of the items available for sale. Include the ids, names, and prices of products for sale.





2. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.



3. Once the customer has placed the order, the script will check if the store has enough of the product to meet the customer's request.

   * If current inventory is insufficient to meet the requested quantity, the app script will log a message indicating `Insufficient quantity on hand!`, and prevent the order from going through.



4. However, if the store does have enough of the product, customer’s order should be fulfilled, including.
   * Updating the bamazon SQL database to reflect the remaining quantity.
   * Once the update goes through, the total cost of the custmer’s purchase should be displayed and a prompt will appear asking if the customer wants to continue shopping. If customer selects the No option, the script will stop running and console “Goodbye”. Otherwise, the customer can select another item to purchase.

![Insufficient](images/Customer_InsufficientQuantity.png)

### Manager Script (bamazonCustom.js)

1. The `bamazonManager.js` script includes 4 manager related menu options: 

    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

2. If a manager selects `View Products for Sale`, the script list every available item: the item IDs, names, prices, and quantities.

3. If a manager selects `View Low Inventory`, then it should list all items with a inventory count lower than five.

4. If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

5. If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


### Challenge #3: Supervisor View (Final Level)

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

   * total_sales

2. Modify the products table so that theres a product_sales column and modify the `bamazonCustomer.js` app so that this value is updated with each individual products total revenue from each sale.

3. Modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the program will calculate the total sales from each transaction.

   * Add the revenue from each transaction to the `total_sales` column for the related department.
   * Make sure your app still updates the inventory listed in the `products` column.

4. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   * Create New Department

5. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

6. The `total_profit` should be calculated on the fly using the difference between `over_head_costs` and `total_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

7. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.

   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**
