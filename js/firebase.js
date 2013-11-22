function teste() {
	var myDataRef = new Firebase('https://tripapp.firebaseio.com/');

	FB.api('/me', function(response) {

		var me = {};
		var aux = {};

		aux[response.id] = response;

		me["users"] = aux;

		console.log(me);

		myDataRef.update(me);
	});

	FB.api('/me/friends', {fields: 'name,id'}, function(response) {
		var usersRef = new Firebase('https://tripapp.firebaseio.com/users');

		var fbUsers, friends;

		friends = new Array();

		usersRef.on('value', function(snapshot) {
			fbUsers = snapshot;

			console.log(snapshot);

			for(var friend in response.data)
			{
				if(jQuery.inArray(response.data[friend].id, fbUsers) != -1)
				{
					friends.push(friend);
				}
				console.log(response.data[friend].id);
			}

			console.log(friends);
		});
	});
}

function online(id)
{
	
}