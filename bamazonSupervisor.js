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


function runSupvBamazon() {
    inquirer.prompt([{
        type: "list",
        name: "questions",
        message: "Menu Option?",
        choices: ["View Product Sales by Department","Create New Department","Exit Bamazon"]
    }]).then(function(answers) {
        switch (answers.questions) {
            case "View Product Sales by Department":
               viewDepartments();
               break;
             case "Create New Department":
               addDepartment();
               break;
             case "Exit Bamazon":  
               exitBamazon();
               break;
            };

    })
}

//run mySQL view to display products for sale then push items into CLI table
function viewDepartments() {
    con.query("SELECT * FROM vw_salesbydepartment", function (err, result) {
        if (err) {
            throw err;
        }
        else {
            var table = new Table({
		        head: ['Department Id', 'Department Name', 'Overhead Costs','Total Sales'],
		        style: {
			        head: ['blue'],
			        compact: false,
			        colAligns: ['center','left','right','right']
		        }
	            });

	        //loops through each item in the mysql database and pushes that information into a new row in the table
	        for(var i = 0; i < result.length; i++) {
		         table.push(
			            [result[i].Department_Id, result[i].Department_Name, result[i].Overhead_Costs, result[i].Total_Sales]
		        );
	        }
        
        console.log(table.toString());
        runSupvBamazon();
        }
        });
    }


//Prompt user the product name, department, price and quantity to add to the products table
function addDepartment() {
    inquirer.prompt([{
            type: "input",
            name: "addDept",
            message: "Enter department name:",
            validate: function(str){
                            return str !== ''; //Department name cannot be blank
                      }
        },
        {
            type: "input",
            name: "addOverhead",
            message: "Enter department overhead costs:",
            validate: function(str){
                            return str !== ''; //Overheader Costs cannot be blank
                      }
        }
    ]).then(function(answers){
            con.query("insert into departments(department_name, over_head_costs) values(?,?)", [answers.addDept, parseFloat(answers.addOverhead)], function(err,result) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("\r\nDepartment Name: " + answers.addDept + " || Overhead Costs: " + answers.addOverHead + " has successfully been added!\r\n");
                    runSupvBamazon();
            } 
        })
      })
    }

function exitBamazon() {
    console.log("Goodbye!");
    con.end();
}
runSupvBamazon();