//All required modules
const express = require("express");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
	apiKey: "3a76fbcb545a66117f924d4b04966a66-us17",
	server: "us17",
});
const app = express();

//Pushing all static files to the local server
app.use(express.static("public"));

//Using the express parse to fetch data from the website
app.use(express.urlencoded({ extended: true }));

//Post and fetch data
app.post("/contact.html", function (req, res) {
	var fName = req.body.firstName;
	var firstName =
		fName.slice(0, 1).toUpperCase() + fName.slice(1).toLowerCase();
	var lName = req.body.lastName;
	var lastName = lName.slice(0, 1).toUpperCase() + lName.slice(1).toLowerCase();
	var email = req.body.email;
	var phoneNumber = req.body.phoneNumber;
	const subscribingUser = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		phoneNumber: phoneNumber,
	};
	const run = async () => {
		const response = await client.lists.addListMember("9efa3bb455", {
			email_address: subscribingUser.email,
			phone_number: subscribingUser.phoneNumber,
			status: "subscribed",
			merge_fields: {
				FNAME: subscribingUser.firstName,
				LNAME: subscribingUser.lastName,
			},
		});
		console.log(response);
	};

	run();
	res.sendFile(__dirname + "/public/success.html");
});

//Starting the server
app.listen(3000, function (req, res) {
	console.log("Server was started on port 3000.");
});

//Mailchimp API Key
//3a76fbcb545a66117f924d4b04966a66-us17

// Mailchimp list/audience id
// 9efa3bb455
