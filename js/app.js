$("#map-exit").click(function()
{
  myTripRef.once('value', function(trip)
  {
    trip = trip.val();

    var friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+trip.with);
    friendTrip.once('value', function(fTrip)
    {
      fTrip = fTrip.val();

      if(fTrip[me.id] != null)
        delete fTrip[me.id];

      if(trip[trip.with] != null)
        delete trip[trip.with];

      fTrip.invited = true;
      fTrip.trippin = true;
      fTrip.canceled = true;
      fTrip.with    = "none";

      friendTrip.set(fTrip, function()
      {
        trip.invited = false;
        trip.trippin = false;
        trip.canceled = false;
        trip.with    = "none";

        myTripRef.set(trip, function()
        {
          alert("Trip canceled!");

          changeSection("section-map",0);
        });
      });
    });
  });
});

/*//action menu
document.querySelector('#btn-action-menu').addEventListener ('click', function () {
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

function changeSection(target, active)
{
  if(active)
  {
    document.querySelector('#'+target).className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
  }
  else
  {
    document.querySelector('#'+target).className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  }
}

function showOverlay(target, active)
{
  if(active)
  {
    document.querySelector('#'+target).className = 'fade-in';
  }
  else
  {
    document.querySelector('#'+target).className = 'fade-out';
  }
}

//showOverlay("overlay-loading", 1);

var me;
var usersRef   = new Firebase('https://tripapp.firebaseio.com/users');
var tripsRef   = new Firebase('https://tripapp.firebaseio.com/trips');
var friendsRef = new Firebase('https://tripapp.firebaseio.com/friends');
var meRef, myTripRef, myFriendRef;

window.fbAsyncInit = function()
{
  //showOverlay("overlay-loading", 0);

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

      changeSection("section-signin",0);

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
              "id": response.id,
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
                  changeSection("section-map",1);

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
                changeSection("section-map",1);

                showMap("me");
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
 js = d.createElement('script'); js.id = id; js.async = false;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

function getFriendsUsing()
{
  FB.api('/me/friends', {fields: 'name,id'}, function(response)
  {

    usersRef.once('value', function(snapshot)
    {
      var aux, count = 0;

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
            count ++;
          }
        }
        
        var target  = $("#friends");
        target.html("");

        if(count == 0)
        {
          var html = "<li id=\""+i+"\">";
          html += "<p>You haven't any friends using the app.</p>";
          html += "</li>";

          target.append(html);
        }

        myFriendRef.update(friends, function()
        {
          myFriendRef.once('value', function(snapshot)
          {
            var friends = snapshot.val();
            var friend, html;

            for(var i in friends)
            {
              friend = new Firebase('https://tripapp.firebaseio.com/users/'+i);

              friend.once('value', function(snapshot)
              {
                snapshot = snapshot.val();

                html = "<li id=\""+snapshot.id+"\">";
                html += "<aside class=\"pack-start offline\">";
                html += "<img alt=\"photo\" src=\"http://graph.facebook.com/"+snapshot.id+"/picture\">";
                html += "</aside>"
                html += "<p>"+snapshot.name;
                html += "<progress style=\"display:none\" class=\"spin-people\"></progress>";
                html += "</p>";
                html += "</li>";

                target.append(html);

                startTrip();

                myTripRef.once('value', function(ignore)
                {
                  myTripRef.on('value', function(trip)
                  {
                    trip = trip.val();

                    if(trip[snapshot.id].accepted)
                    {
                      if(!trip.trippin)
                      {
                        showOverlay("overlay-accepted-trip", 1);

                        $("#whoAccepted").html(snapshot.name + " accepted your request!");

                        $("#"+snapshot.id+" progress").css({"display":"none"});

                        $("#overlay-accepted-trip button.danger").click(function()
                        {
                          showOverlay("overlay-accepted-trip", 0);

                          if($("section[data-position = current]").attr("class") == "left")
                          {
                            changeSection("section-map",0);
                          }
                          trip.invited = false;
                          trip.trippin = false;
                          trip.with    = "none";
                          
                          $("#"+snapshot.id+" progress").css({"display":"none"});

                          delete trip[snapshot.id];

                          myTripRef.set(trip, function()
                          {
                            friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+snapshot.id);
                            friendTrip.once('value',function(fTrip)
                            {
                              fTrip = fTrip.val();

                              fTrip.invited   = false;
                              fTrip.canceled  = true;
                              fTrip.trippin   = false;
                              fTrip.with      = "none";

                              friendTrip.update(fTrip);
                            });
                          });
                        });
                        $("#overlay-accepted-trip button.recommend").click(function()
                        {
                          showOverlay("overlay-accepted-trip", 0);

                          trip.trippin = true;

                          meRef.once('value', function(vMe)
                          {
                            vMe = vMe.val();

                            trip[snapshot.id].latitude = vMe.latitude;
                            trip[snapshot.id].longitude = vMe.longitude;

                            myTripRef.set(trip);

                            friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+snapshot.id);
                            friendTrip.once('value',function(fTrip)
                            {
                              fTrip = fTrip.val();

                              fTrip.trippin = true;

                              friendTrip.set(fTrip);
                            });
                          });
                        });
                      }
                    }

                    if(trip[snapshot.id].canceled)
                    {
                      trip.invited = false;
                      trip.with    = "none";

                      delete trip[snapshot.id];

                      myTripRef.set(trip, function()
                      {
                        alert("Trip canceled!");

                        if($("#section-map").hasClass("current"))
                          changeSection("section-map",0);
                      });
                    }
                  });
                });
              });

              friend.on('value', function(snapshot)
              {
                if(snapshot.val().online)
                {
                  $("#"+snapshot.val().id+" aside").removeClass("offline");
                  $("#"+snapshot.val().id+" aside").addClass("online");
                }
                else
                {
                  $("#"+snapshot.val().id+" aside").removeClass("online");
                  $("#"+snapshot.val().id+" aside").addClass("offline");
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
            if(!trip.trippin)
            {
              var friendRef = new Firebase('https://tripapp.firebaseio.com/users/'+trip.with);

              friendRef.once('value', function(friend)
              {
                friend = friend.val();

                showOverlay("overlay-confirm-trip", 1);

                $("#whoInvited").html(friend.name + " invited you to a trip!");
                $("#overlay-confirm-trip button.danger").click(function()
                {
                  showOverlay("overlay-confirm-trip", 0);

                  var friendTrip = new Firebase('https://tripapp.firebaseio.com/trips/'+trip.with);
                  friendTrip.once('value', function(fTrip)
                  {
                    fTrip = fTrip.val();

                    fTrip[me.id].canceled = true;

                    friendTrip.update(fTrip, function()
                    {
                      trip.invited = false;
                      trip.trippin = false;
                      trip.with    = "none";

                      myTripRef.update(trip);
                    });
                  });
                });
                $("#overlay-confirm-trip button.recommend").click(function()
                {
                  showOverlay("overlay-confirm-trip", 0);

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
          }

          if(trip.canceled)
          {                
            trip.invited  = false;
            trip.canceled = false;
            trip.trippin  = false;
            trip.with     = "none";

            myTripRef.update(trip, function()
            {
              showOverlay("overlay-confirm-trip", 0);

              alert("Trip canceled!");
              
              if($("#section-map").hasClass("current"))
                changeSection("section-map",0);
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

    $("#"+friend+" progress").css({"display":"inline"});

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