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


function showInventory(){
    con.query("SELECT * FROM vw_ProductsForSale", function (err, result) {
        if (err) {
            throw err;
        }
        else {
        var table = new Table({
		    head: ['Product Id', 'Product Name', 'Department','Price'],
		    style: {
			head: ['blue'],
			compact: false,
			colAligns: ['center','left','left','right']
		        }
	        });

	//loops through each item in the mysql database and pushes that information into a new row in the table
	    for(var i = 0; i < result.length; i++) {
		    table.push(
			    [result[i].Product_Id, result[i].Product_Name, result[i].Department, result[i].Price]
		    );
	    }
    console.log(table.toString());
    buyItems();
        }
        });
    }


function buyItems () {
    inquirer.prompt([
        {
            type: "input"
            ,name: "itemId"
            ,message: "Please enter the Product Id of the item you would like to purchase:"
        },
         {
            type: "input"
            ,name: "quantity"
            ,message: "Please enter the number of the units you would like to purchase:"
        }]).then(function(answers) {
            con.query("select price, stock_quantity, department_name from products where ?",{item_id: parseInt(answers.itemId)},function(err,result) {
                //console.log(result);
                if (result[0].stock_quantity < parseInt(answers.quantity)) {
                    console.log("Insufficient quantity on hand!");
                    buyItems();
                }
                else {
                    //console.log(parseInt(answers.quantity));
                    console.log("The cost of your purchase was " + (result[0].price*parseInt(answers.quantity)));
                    con.query("Update products set stock_quantity= ?, product_sales=product_sales + ? where item_id= ?",[result[0].stock_quantity-parseInt(answers.quantity),result[0].price*parseInt(answers.quantity)
                                ,parseInt(answers.itemId)],function(err,result) {
                                                                if (err) throw err;});
                    con.query("Update departments set total_sales=total_sales+ ? where department_name= ?",[result[0].price*parseInt(answers.quantity)
                                ,result[0].department_name],function(err,result) {
                                                                if (err) throw err;
                                                                promptContinue();
                                                            
                    });
                }
            });
    });
}

function promptContinue() {
    inquirer.prompt([{
        type: "list",
        name: "continue",
        message: "Do you want to continue shopping?",
        choices: ["Yes","No"]
    }]).then(function(answers) {
        if (answers.continue === "Yes") {
            showInventory();
        }
        else {
            con.destroy();
            console.log('Goodbye!');
        }
    });
}

showInventory();
