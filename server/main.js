import { Meteor } from 'meteor/meteor';
var superserviceID = "57a5aa32f6915e0097cd100c";
var superserviceKey = '22374';

var N = require('./nuve.js');
N.API.init(superserviceID, superserviceKey, "https://licmcu.instavc.com/");

Meteor.methods({
	createToken: function (username, role) {
		try {
			var token = Meteor.wrapAsync(getToken);
			return token(username, role);
		} catch (e) {
			console.log("error in createToken method ", e);
			return new Meteor.Error("LicodeServer-Error", e);
		}
	}
});

function getToken(username, role, callback) {
	N.API.createToken("57a5ad20fe645f07d5a688b5", username, role, function(token) {
	  callback(null, token)
	}, errorCallback);
};

function errorCallback (error) {
	console.log("error is ", error);
};