//You can calculate directions (using a variety of methods of transportation) by using the DirectionsService object.
var directionsService = new google.maps.DirectionsService();
//Define a variable with all map points.
var _mapPoints = new Array();
//Define a DirectionsRenderer variable.
var _directionsRenderer = '';

function caughtPosition(position)
{
  var oldPosition =
  {
    x : position.coords.latitude,
    y : position.coords.longitude
  };

  InitializeMap(oldPosition);
}   

//InitializeMap() function is used to initialize google map on page load.
function InitializeMap(myPos) {
  
  meRef.once('value', function(vMe)
  {
    myTripRef.once('value', function(vMyTrip)
    {
      vMe = vMe.val();
      vMyTrip = vMyTrip.val();

      //DirectionsRenderer() is a used to render the direction
      _directionsRenderer = new google.maps.DirectionsRenderer();

      //Set the your own options for map.
      var myOptions = {
          zoom: 16,
          center: new google.maps.LatLng(myPos.x, myPos.y),
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      //Define the map.
      var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

      //Set the map for directionsRenderer
      _directionsRenderer.setMap(map);
     
      console.log("DirectionsRenderer");

      var friendRef = new Firebase('https://tripapp.firebaseio.com/users/'+vMyTrip.with);

      meRef.once('value',function(pMe)
      {
        friendRef.once('value', function(pFriend)
        {
          pMe = pMe.val();
          pFriend = pFriend.val();

          _mapPoints.push(new google.maps.LatLng(pMe.latitude, pMe.longitude));
          _mapPoints.push(new google.maps.LatLng(pFriend.latitude, pFriend.longitude));

          console.log(_mapPoints);
          getRoutePointsAndWaypoints();

          friendRef.on('value',function(pFriend)
          {
            pFriend = pFriend.val();

            _mapPoints[1].ob = pFriend.latitude;
            _mapPoints[1].pb = pFriend.longitude;
            
            getRoutePointsAndWaypoints();
          });

          navigator.geolocation.watchPosition(function(position)
          {
            meRef.once('value',function(pMe)
            {
              pMe = pMe.val();

              pMe.latitude = position.coords.latitude;
              pMe.longitude = position.coords.longitude;

              meRef.update(pMe,function()
              {
                _mapPoints[0].ob = pMe.latitude;
                _mapPoints[0].pb = pMe.longitude;

                getRoutePointsAndWaypoints();
              });
            });
          });
        });
      });
    });
  }); 
}

function showMap(where) {
  switch(where)
  {
    case "me":
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(caughtPosition);
      } else {
        alert("Not supported");
      }

      break;
  }
}

//getRoutePointsAndWaypoints() will help you to pass points and waypoints to drawRoute() function
function getRoutePointsAndWaypoints() {
    //Define a variable for waypoints.
    var _waypoints = new Array();
 
    if (_mapPoints.length > 2) //Waypoints will be come.
    {
        for (var j = 1; j < _mapPoints.length - 1; j++) {
            var address = _mapPoints[j];
            if (address !== "") {
                _waypoints.push({
                    location: address,
                    stopover: true  //stopover is used to show marker on map for waypoints
                });
            }
        }
        //Call a drawRoute() function
        drawRoute(_mapPoints[0], _mapPoints[_mapPoints.length - 1], _waypoints);
    } else if (_mapPoints.length > 1) {
        //Call a drawRoute() function only for start and end locations
        drawRoute(_mapPoints[_mapPoints.length - 2], _mapPoints[_mapPoints.length - 1], _waypoints);
    } else {
        //Call a drawRoute() function only for one point as start and end locations.
        drawRoute(_mapPoints[_mapPoints.length - 1], _mapPoints[_mapPoints.length - 1], _waypoints);
    }
}

//drawRoute() will help actual draw the route on map.
function drawRoute(originAddress, destinationAddress, _waypoints) {
    //Define a request variable for route .
    var _request = '';
 
    //This is for more then two locatins
    if (_waypoints.length > 0) {
        _request = {
            origin: originAddress,
            destination: destinationAddress,
            waypoints: _waypoints, //an array of waypoints
            optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
    } else {
        //This is for one or two locations. Here noway point is used.
        _request = {
            origin: originAddress,
            destination: destinationAddress,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
    }
 
    //This will take the request and draw the route and return response and status as output
    directionsService.route(_request, function (_response, _status) {
        if (_status == google.maps.DirectionsStatus.OK) {
            _directionsRenderer.setDirections(_response);
        }
    });
}