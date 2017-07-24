var inquirer = require("inquirer");
var mysql = require("mysql");

var itemCheck = "",
	itemNumber,
	itemPrice,
	itemQuantity,
	updateQuantity;

//Creating connection to mysql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "TExsmu19",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Welcome to Bamazon!");
	console.log("Our current inventory includes: ")
});

connection.query("SELECT * FROM products",
	function(err, res) {
		if (err) throw err;
		// console.log(res);
		

		for(var i = 0; i < res.length; i++){

	console.log(" " + res[i].item_id + " , " + res[i].product_name + " , " + res[i].price);
	
		}

		bStart();
	});

var bStart = function () {
	inquirer
	.prompt([
	{
		type: "input",
		message: "What item number would you like to purchase?",
		name: "id",
		validate: function(value) {
			if (isNaN(value) == false) {
				return true;
			} else {
				return false;
			}
		}
	}
	
	]).then(function(ticket) {
		connection.query("SELECT * FROM products WHERE ?", {
			item_id: ticket.id
		},
		function(err, res) {
			itemCheck = res[0].product_name,
			itemQuantity = res[0].stock_quantity,
			itemPrice = res[0].price,
			quantityCheck();
		});
	}) 

}

var quantityCheck = function() {
	inquirer
	.prompt ([
	{
		type: "input",
		message: "How many " + itemCheck + " would you like to purchase?",
		name: "much"
		// validate: function(value) {
		// 	if(isNaN(value) == false) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// }
	}

	]).then(function(result) {
		itemQuantity = result.quantity
		var total = result.quantity * itemPrice
		updateQuantity = itemQuantity - result.quantity
		console.log("Your total will be $" + total);
	});

var itemConfirm = function() {
	inquirer
	.prompt ([
	{
		name: "confirm",
		type: "confirm",
		message: "Press enter to confirm your purchase."
	}

	]).then(function(result) {
		if(result.confirm == true) {
			connection.query("UPDATE prouducts SET ? WHERE ?", [{

				stock_quantity: updateQuantity

			},
			{
				product_name:itemCheck
			}
			],
			function(err, res) {})

			console.log("Thank you for choosing us for your shopping needs.");
		}	else {
			console.log("Sorry, we don't have enough of that product in stock");
			quantityCheck();
		}
		
	});
}