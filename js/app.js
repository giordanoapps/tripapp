$("#teste").click(function()
{
  document.querySelector('#map-areas').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
$("#map-areas-back").click(function()
{
  document.querySelector('#map-areas').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

/*//action menu
document.querySelector('#btn-action-menu').addEventListener ('click', function () {
  document.querySelector('#action-menu').className = 'fade-in';
});
document.querySelector('#action-menu').addEventListener ('click', function () {
  this.className = 'fade-out';
});

//buttons
document.querySelector('#btn-buttons').addEventListener ('click', function () {
  document.querySelector('#buttons').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-buttons-back').addEventListener ('click', function () {
  document.querySelector('#buttons').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//confirm
document.querySelector('#btn-confirm').addEventListener ('click', function () {
  document.querySelector('#confirm').className = 'fade-in';
});
document.querySelector('#confirm').addEventListener ('click', function () {
  this.className = 'fade-out';
});

//edit mode
document.querySelector('#btn-edit-mode').addEventListener ('click', function () {
  document.querySelector('#edit-mode').className = 'edit';
});
document.querySelector('#edit-mode').addEventListener ('click', function () {
  this.className = '';
});

//headers
document.querySelector('#btn-headers').addEventListener ('click', function () {
  document.querySelector('#headers').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-headers-back').addEventListener ('click', function () {
  document.querySelector('#headers').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//input areas
document.querySelector('#btn-input-areas').addEventListener ('click', function () {
  document.querySelector('#input-areas').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-input-areas-back').addEventListener ('click', function () {
  document.querySelector('#input-areas').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//status
document.querySelector('#btn-status').addEventListener ('click', function () {
  utils.status.show('The Alarm is set for 7 hours and 14 minutes from now');    
});

//switches
document.querySelector('#btn-switches').addEventListener ('click', function () {
  document.querySelector('#switches').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-switches-back').addEventListener ('click', function () {
  document.querySelector('#switches').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//lists
document.querySelector('#btn-lists').addEventListener ('click', function () {
  document.querySelector('#lists').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-lists-back').addEventListener ('click', function () {
  document.querySelector('#lists').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//progress
document.querySelector('#btn-progress').addEventListener ('click', function () {
  document.querySelector('#progress').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-progress-back').addEventListener ('click', function () {
  document.querySelector('#progress').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//scrolling
document.querySelector('#btn-scrolling').addEventListener ('click', function () {
  document.querySelector('#scrolling').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-scrolling-back').addEventListener ('click', function () {
  document.querySelector('#scrolling').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//seek bars
document.querySelector('#btn-seek-bars').addEventListener ('click', function () {
  document.querySelector('#seek-bars').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
  var animend = (/webkit/i).test(navigator.appVersion) ? 'webkitAnimationEnd' : 'animationend';

  document.addEventListener(animend, function animationend() {
    document.removeEventListener(animend, animationend);
    utils.seekbars.init();
  });
});
document.querySelector('#btn-seek-bars-back').addEventListener ('click', function () {
  document.querySelector('#seek-bars').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//tabs
document.querySelector('#btn-tabs').addEventListener ('click', function () {
  document.querySelector('#tabs').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-tabs-back').addEventListener ('click', function () {
  document.querySelector('#tabs').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//filters
document.querySelector('#btn-filters').addEventListener ('click', function () {
  document.querySelector('#filters').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-filters-back').addEventListener ('click', function () {
  document.querySelector('#filters').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

//toolbars
document.querySelector('#btn-toolbars').addEventListener ('click', function () {
  document.querySelector('#toolbars').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-toolbars-back').addEventListener ('click', function () {
  document.querySelector('#toolbars').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
*/
var me;
var usersRef   = new Firebase('https://tripapp.firebaseio.com/users');
var tripsRef   = new Firebase('https://tripapp.firebaseio.com/trips');
var friendsRef = new Firebase('https://tripapp.firebaseio.com/friends');
var meRef, myTripRef, myFriendRef;

window.fbAsyncInit = function()
{
  FB.init(
  {
    appId      : '640821362635753',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response)
  {

    if (response.status === 'connected')
    {

      $("#loginButton").hide();
      FB.api('/me', function(response)
      {
        var data, aux;

        me = response;

        meRef = new Firebase('https://tripapp.firebaseio.com/users/'+me.id);
        meRef.once('value', function(snapshot)
        {
          if(snapshot.val() == null) //CHECK IF USER IS REGISTERED
          {
            //ADD USER FIREBASE
            data =
            {
              "name": response.name,
              "online": true,
              "latitude": 0,
              "longitude": 0
            }

            aux = {};
            aux[response.id] = data;

            usersRef.update(aux);
          }
          else // MARK HIM AS ONLINE
          {
            aux =
            {
              "online": true
            }
            meRef.update(aux);
          }
        });

        myTripRef = new Firebase('https://tripapp.firebaseio.com/trips/'+me.id);
        myTripRef.once('value', function(snapshot)
        {
          if(snapshot.val() == null) //CHECK IF TRIP IS CREATED
          {
            data =
            {
              "trippin" : false,
              "invited" : false,
              "canceled": false,
              "with"    : "none"
            }

            aux = {};
            aux[response.id] = data;
            tripsRef.update(aux, function()
            {
              myTripRef = new Firebase('https://tripapp.firebaseio.com/trips/'+me.id);
              myTripRef.on('value', function(snapshot)
              {
                snapshot = snapshot.val();

                if(snapshot.trippin)
                {
                  document.querySelector('#map-areas').className = 'current';
                  document.querySelector('[data-position="current"]').className = 'left';
                  showMap("me");
                }
                else
                {
                  hideMap();
                }
              });
            });
          }
          else
          {
            myTripRef.on('value', function(snapshot)
            {
              snapshot = snapshot.val();

              if(snapshot.trippin)
              {
                document.querySelector('#map-areas').className = 'current';
                document.querySelector('[data-position="current"]').className = 'left';
                showMap("me");
              }
              else
              {
                hideMap();
              }
            });
          }
        });

        myFriendRef = new Firebase('https://tripapp.firebaseio.com/friends/'+me.id);
        myFriendRef.once('value', function(snapshot)
        {
          if(snapshot.val() == null) //CHECK IF FRIENDS IS CREATED
          {
            aux = {};
            aux[response.id] = "empty";
            friendsRef.update(aux, function()
            {
              myFriendRef = new Firebase('https://tripapp.firebaseio.com/friends/'+me.id);
            });
          }
        });

        meRef.onDisconnect().update({"online": false});

        getFriendsUsing();
      });
    }
    else if (response.status === 'not_authorized')
    {
    }
    else
    {
    }
  });
};

// Load the SDK asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

function getFriendsUsing()
{
  FB.api('/me/friends', {fields: 'name,id'}, function(response)
  {

    usersRef.once('value', function(snapshot)
    {
      var aux;

      myFriendRef.once('value', function(friends)
      {

        if(friends.val() == "empty")
        {
          friends = {};
        }
        else
        {
          friends = friends.val();
        }

        for(var i in response.data)
        {
          if(snapshot.hasChild(response.data[i].id))
          {
            friends[response.data[i].id] = true;
          }
        }

        myFriendRef.update(friends, function()
        {
          myFriendRef.once('value', function(snapshot)
          {
            var target  = $("#friends");
            var friends = snapshot.val();
            var friend, html;

            target.html("");

            for(var i in friends)
            {
              friend = new Firebase('https://tripapp.firebaseio.com/users/'+i);

              friend.once('value', function(snapshot)
              {
                snapshot = snapshot.val();

                html = "<li id=\""+i+"\">";
                html += snapshot.name;
                html += "</li>";

                target.append(html);

                startTrip();

                myTripRef.once('value', function(ignore)
                {
                  myTripRef.on('value', function(trip)
                  {
                    trip = trip.val();

                    if(trip[i].accepted)
                    {
                      $("#acceptedTrip").addClass("fade-in");
                      $("#whoAccepted").html(snapshot.name + " accepted your request!");
                      $("#acceptedTrip button.danger").click(function()
                      {
                        $('#acceptedTrip').hide();
                        $('#acceptedTrip').addClass('fade-out');

                        trip.invited = false;
                        trip.with      = "none";

                        delete trip[i];

                        myTripRef.set(trip, function()
                        {
                          friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+i);
                          friendTrip.once('value',function(fTrip)
                          {
                            fTrip = fTrip.val();

                            fTrip.invited   = false;
                            fTrip.canceled  = true;
                            fTrip.with      = "none";

                            friendTrip.update(fTrip);
                          });
                        });
                      });
                      $("#acceptedTrip button.recommend").click(function()
                      {
                        $('#acceptedTrip').hide();
                        $('#acceptedTrip').addClass('fade-out');

                        trip.trippin = true;

                        myTripRef.set(trip);

                        friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+i);
                        friendTrip.once('value',function(fTrip)
                        {
                          fTrip = fTrip.val();

                          fTrip.trippin = true;

                          friendTrip.set(fTrip);
                        });
                      });
                    }

                    if(trip[i].canceled)
                    {
                      trip.invited = false;
                      trip.with    = "none";

                      delete trip[i];

                      myTripRef.set(trip, function()
                      {
                        alert("Trip canceled!");
                      });
                    }
                  });
                });
              });

              friend.on('value', function(snapshot)
              {
                if(snapshot.val().online)
                {
                  myTripRef.once('value', function(trip)
                  {
                    trip = trip.val();

                    if(trip.trippin)
                    {
                      alert("Your friend is back!")
                    }
                  });
                  $("#"+i).removeClass("offline");
                  $("#"+i).addClass("online");
                }
                else
                {
                  myTripRef.once('value', function(trip)
                  {
                    trip = trip.val();

                    if(trip.trippin)
                    {
                      alert("Your friend has been disconnected!")
                    }
                  });
                  $("#"+i).removeClass("online");
                  $("#"+i).addClass("offline");
                }
              });
            }
          });
        });

        myTripRef.on('value', function(trip)
        {
          trip = trip.val();

          if(trip.invited)
          {
            var friendRef = new Firebase('https://tripapp.firebaseio.com/users/'+trip.with);

            friendRef.once('value', function(friend)
            {
              friend = friend.val();

              $("#confirmTrip").addClass("fade-in");
              $("#whoInvited").html(friend.name + " invited you to a trip!");
              $("#confirmTrip button.danger").click(function()
              {
                $('#confirmTrip').hide();
                $('#confirmTrip').addClass('fade-out');

                var friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+trip.with);
                friendTrip.once('value', function(fTrip)
                {
                  fTrip = fTrip.val();

                  console.log(fTrip);
                  fTrip[me.id].canceled = true;

                  friendTrip.update(fTrip, function()
                  {
                    trip.invited = false;
                    trip.with      = "none";

                    myTripRef.update(trip);
                  });
                });
              });
              $("#confirmTrip button.recommend").click(function()
              {
                $('#confirmTrip').hide();
                $('#confirmTrip').addClass('fade-out');

                var friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+trip.with);
                friendTrip.once('value', function(fTrip)
                {
                  fTrip = fTrip.val();

                  fTrip[me.id].accepted = true;

                  friendTrip.update(fTrip);
                });
              });
            });
          }

          if(trip.canceled)
          {                
            trip.invited  = false;
            trip.canceled = false;
            trip.with       = "none";

            myTripRef.update(trip, function()
            {
              $('#confirmTrip').hide();
              $('#confirmTrip').addClass('fade-out');

              alert("Trip canceled!");
            });
          }
        });
      });
    });
  });
}

function startTrip()
{
  $("#friends li").click(function()
  {
    var friend = $(this).attr("id");
    myTripRef.once('value', function(trip)
    {
      trip = trip.val();

      trip[friend] =
      {
        start : false,
        stop  : false,
        accepted : false,
        canceled : false
      }

      trip.with = friend;

      myTripRef.update(trip, function()
      {
        var friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+friend);

        friendTrip.once('value', function(fTrip)
        {
          fTrip = fTrip.val();

          fTrip.invited = true;
          fTrip.with = me.id;

          friendTrip.update(fTrip);
        });
      });
    });
  });
}