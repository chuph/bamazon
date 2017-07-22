var inquirer = require("inquirer");
var mysql = require("mysql");

//Creating connection to mysql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "TExsmu19",
	database: "bamazon"
});

connection.query("SELECT * FROM products",
	function(err, res) {
		if (err) throw err;
		// console.log(res);
		

		for(var i = 0; i < res.length; i++){

	console.log("Our current inventory includes " + res[i].item_id + ", " + res[i].product_name + ", " + res[i].price);
	
		}
	});

inquirer
	.prompt([
	{

	}

	])