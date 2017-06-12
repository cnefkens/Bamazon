var inquirer=require('inquirer');
var mySQL=require('mysql');
var serverName='L5-HEALTH-HP8';
var dbName='bamazon';
var sqlLogin='customer';
var sqlPwd='P@55w0rd';
var Table = require('cli-table');

var con=mySQL.createConnection({
  host: serverName,
  user: sqlLogin,
  password: sqlPwd,
  database: dbName
});


function runManageBamazon() {
    inquirer.prompt([{
        type: "list",
        name: "questions",
        message: "Menu Option?",
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","Exit Bamazon"]
    }]).then(function(answers) {
        switch (answers.questions) {
            case "View Products for Sale":
               viewProducts();
               break;
            case "View Low Inventory":
               viewLowInventory();
               break;
            case "Add to Inventory":
               addInventory();
               break;
             case "Add New Product":
               addProduct();
               break;
             case "Exit Bamazon":  
               exitBamazon();
               break;
            };

})
}

//run mySQL view to display products for sale then push items into CLI table
function viewProducts () {
    con.query("SELECT * from vw_ProductsForSale", function (err, result) {
        if (err) {
            throw err;
        }
        else {
            var table = new Table({
		        head: ['Product Id', 'Product Name', 'Department','Price','Quantity'],
		        style: {
			        head: ['blue'],
			        compact: false,
			        colAligns: ['center','left','left','right','right']
		        }
	            });

	        //loops through each item in the mysql database and pushes that information into a new row in the table
	        for(var i = 0; i < result.length; i++) {
		         table.push(
			            [result[i].Product_Id, result[i].Product_Name, result[i].Department, result[i].Price, result[i].Quantity]
		        );
	        }
        
        console.log(table.toString());
        runManageBamazon();
        }
        });
    };

//run mySQL view to display low inventory then push items into CLI table
function viewLowInventory() {
  con.query("SELECT * from vw_LowInventory", function (err, result) {
        if (err) {
            throw err;
        }
        else {
            var table = new Table({
		        head: ['Product Id', 'Product Name', 'Department','Price', 'Quantity'],
		        style: {
			        head: ['blue'],
			        compact: false,
			        colAligns: ['center','left','left','right', 'right']
		        }
	            });

	        //loops through each item in the mysql database and pushes that information into a new row in the table
	        for(var i = 0; i < result.length; i++) {
		         table.push(
			            [result[i].Product_Id, result[i].Product_Name, result[i].Department, result[i].Price, result[i].Quantity]
		        );
	        }
        
        console.log(table.toString());
        runManageBamazon();
        }
        });
}

//run mySQL view to display current inventory. Prompt user to enter the item number to update and the quantity to add.
// Run update query to update item quantity
function addInventory () {
      con.query("SELECT * FROM vw_ProductsForSale", function (err, result) {
            if (err) {
                throw err;
            }
            else {
                var table = new Table({
                    head: ['Product Id', 'Product Name', 'Department','Price', 'Quantity'],
                    style: {
                        head: ['blue'],
                        compact: false,
                        colAligns: ['center','left','left','right', 'right']
                    }
                    });

                //loops through each item in the mysql database and pushes that information into a new row in the table
                for(var i = 0; i < result.length; i++) {
                    table.push(
                            [result[i].Product_Id, result[i].Product_Name, result[i].Department, result[i].Price, result[i].Quantity]
                    );
                }
            
                console.log(table.toString());
                inquirer.prompt([{
                        type: "input",
                        name: "addItem",
                        message: "Enter product id to increase:"
                    },
                    {
                        type: "input",
                        name: "addQuantity",
                        message: "Enter quantity to add:"
                    }
                    ]).then(function(answers){
                        con.query("update products set stock_quantity=stock_quantity + ? where item_id= ?", [parseInt(answers.addQuantity),parseInt(answers.addItem)], function(err,result) {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log('\r\nQuantity='+answers.addQuantity + ' has been added to Item Id=' + answers.addItem + ".\r\n")
                                runManageBamazon();
                            } 
                        })
                    });
                }
        });
}

//Prompt user the product name, department, price and quantity to add to the products table
function addProduct () {
    inquirer.prompt([{
            type: "input",
            name: "addProduct",
            message: "Enter product name:",
            validate: function(str){
                            return str !== ''; //Product name cannot be blank
                      }
        },
        {
            type: "input",
            name: "addDept",
            message: "Enter product department:",
            validate: function(str){
                            return str !== ''; //Department name cannot be blank
                      }
        },
        {
            type: "input",
            name: "addPrice",
            message: "Enter product price:"
        },
        {
            type: "input",
            name: "addQuantity",
            message: "Enter starting inventory:"
        }
    ]).then(function(answers){
            con.query("insert into products(product_name, department_name, price, stock_quantity) values(?,?,?,?)", [answers.addProduct, answers.addDept, parseFloat(answers.addPrice), parseInt(answers.addQuantity)], function(err,result) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("\r\nProduct Name: " + answers.addProduct + ' || Department: ' + answers.addDept + ' || Price: ' + answers.addPrice + " || Quantity: " + answers.addQuantity + " has successfully been added!\r\n");
                    runManageBamazon();
            } 
        })
      })
    }

function exitBamazon() {
    console.log("Goodbye!");
    con.end();
}
runManageBamazon();