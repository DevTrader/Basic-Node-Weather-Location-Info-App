let getUser = (id, callback) => {
	let user = {
		id: id,
		name: "Nick"
	};

	setTimeout( () => {
		callback(user);
	}, 2000);
	
};

getUser(12, (userObj) => {
	console.log(userObj);
});