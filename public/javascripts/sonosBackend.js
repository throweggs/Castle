// Objects =============================================================
var theLayout = {
                'info' : [],
                'lockedStatus':'',
                'id':'',
                'currentTrackRef':[],
                'previousTrackRef':[],
                'maxVolume':[],
                'playerSavedInfo':[],
                'playersList':[],
                'zonesList': [],
              },
      theCount = 0,
      theZones = [],
      theTrack = [],
      theCheck = [],
      lastTrack = [],
      playerSettings = [],
      theHistory = [];
var updateSavedInfoCheck = 0;


// DOM Ready ===========================================================
$(document).ready(function() {
  getHistory();
  setInterval(showData,1000);
  setInterval(getSonosInformation,5000);
  setInterval(getSaveInfo,5000);
  // setInterval(updateSavedInfo,2000);
  setInterval(breakoutPlayers,1000);

  // getPlayerInfo();
  // setInterval(getStatus,2000);
  // getStatus();
  // setInterval(getPlayerInfo, 5000);
  setInterval(theWatch, 2000);
  // setInterval(updateSavedInfo, 1000);
  // setInterval(getHistory, 1000);


  promiseGetHistory.then(function(results) {
      theHistory = results;
  });

});

// Functions ===========================================================

//Baisc pull info from server ever second
function showData(){
  theCount = (theCount+1);
  var theText =theCount +'<br>';
      theText += JSON.stringify(theLayout.playersList);
      theText += '<br>';
      theText += 'Volume Locked Status : ' + JSON.stringify(theLayout.lockedStatus);

  $('#theBody').html(theText);
}

function breakoutPlayers(){
    var sonosZones = theLayout.info;
    var theRef = 0;

    $.each(sonosZones, function(iz, theZone){

      var theMembers = theZone.members;
        $.each(theMembers, function(im, theMember){

        var maxVolumes = theLayout.playerSavedInfo;
        var theRoomName = theMember.roomName;
        var memberMaxLevel = 0;
        updateSavedInfoCheck = memberMaxLevel;
           maxVolumes.forEach(function(player){
             if(player.roomName === theMember.roomName){
                memberMaxLevel = player.maxVolume;
                updateSavedInfoCheck = memberMaxLevel;
              }
           });


        var theInfo = {
                      'uuid': theMember.uuid,
                      'roomName': theMember.roomName,
                      'volume': theMember.state.volume,
                      'maxVolume': memberMaxLevel,
                      'coordinator': theMember.coordinator,
                      };

        theLayout.playersList[theRef] = theInfo;
        theRef +=1;

      });
      });
updateSavedInfo();

}

//Watch Volumes and Keeps it below the set maxVolume
function theWatch(){

    //For Each collection of Players
    theLayout.info.forEach( function(zone){
      //Works out which array item it's working with
      var i = theLayout.info.indexOf(zone);
      //runs the function

      getTheTrack(i, zone);

  theLayout.playersList.forEach( function(player){
    if (player.maxVolume < player.volume){
      reduceVolume(player.maxVolume, player.roomName);
      console.log(player.roomName + " volume reduced");
    } else if (player.maxVolume > player.volume){
    } else if (player.maxVolume === player.volume){
    }
  });


    });


}
// Reads the Zone Call and breaks out the current Tracks playing, checks it against the history, adds it to the list and skips if needed.
function getTheTrack(i, zone){

        var currentTrack = zone.coordinator.state.currentTrack;

        var groupMembers = [];
          zone.members.forEach( function(member){
              groupMembers.push(member.roomName);

              });

         theTrack[i] = {'time' : moment().format('MMMM Do YYYY, h:mm:ss a'), 'title' : currentTrack.title, 'artist' : currentTrack.artist, 'album' : currentTrack.album, 'skipCount' : 0, 'roomNames' : groupMembers, 'artwork' : currentTrack.absoluteAlbumArtUri};
         theLayout.currentTrackRef[i] = JSON.stringify(currentTrack.title+currentTrack.artist+groupMembers);


        if(theLayout.currentTrackRef[i]===theLayout.previousTrackRef[i]){
              // Do nothing

        } else if (theLayout.currentTrackRef[i]!==theLayout.previousTrackRef[i]){
          console.log('different');
          //Add First Tracks
            if(theHistory.length === 0){
                  theHistory.push(theTrack[i]);
                  addTrack(theTrack[i]);
            } else if (theHistory.length > 0){
              theHistory.forEach(function(theHTrack){
                  if(theHTrack.title === theTrack[i].title && theHTrack.roomNames === theTrack[i].roomNames){
                  // var ih = theHistory.indexOf(theHTrack);
                  // theHistory[ih].skipCount += 1;
                  //Skip Track as it's played in the last thousady song
                  // skipTrack(zone.coordinator.roomName);
                  //update Track's skip count
                  // updateTrack(  theHistory[ih]);
                  // console.log('updateTheTrack');
                  // console.log(  theHistory[ih]);
                } else {
                  theHistory.push(theTrack[i]);
                  addTrack(theTrack[i]);
                  console.log('updateTHEtrack');
                  console.log(theTrack[i]);
                }
             });
           }
          theLayout.previousTrackRef[i]=theLayout.currentTrackRef[i];
        }




      var theText = JSON.stringify(theTrack);
            $('#theBody').text(theText);

}

// ============================================================= //
///----- SONOS GLOBAL CONTROLS --- SAVING ON REPEATS  --------/////
// ============================================================= //


// SONOS CALLS ====================================================

//////// ----- GET ZONES STARTER FOR 10 ----- ///////////
//Retives the data for sonosStucture from Sonos API
function getSonosInformation(){

        $.getJSON( 'https://localhost:5006/zones', function(results, res) {
        })
        .done(function(results, res) {
            theLayout.info = results;
              })
        .fail(function(results, res) {
        });
}

// SONOS CONTROLS =================================================
//Reduce Volume
function reduceVolume(maxVolume, roomName){
        if (maxVolume > 10){
              $.getJSON( 'https://localhost:5006/'+roomName+'/volume/'+maxVolume, function(results, res) {
              })
              .done(function(results, res) {
                })
              .fail(function(results, res) {

              });
            } else {
            //Do nothing
            }
}
  //Skip Track
function skipTrack(roomName){

  $.getJSON( 'http://localhost:5005/'+roomName+'/next', function(results, res) {
  })
  .done(function(results, res) {

  })
  .fail(function(results, res) {

  });
}
//Set default Grouping for sonos
function setDefaultGroups(){
    var theCount = 0;
    defaultGrouping.forEach( function(group){
    theCoordinator = group.coordinator;
    theMembers = group.members;
    theMembers.forEach( function(member){

      $.getJSON( 'https://localhost:5006/'+member+'/join/'+theCoordinator, function(results, res) {
      })
        .done(function(results, res) {
          theCount += 1;
            showAlert(member, ' grouped to '+theCoordinator, 'success');
        })
        .fail(function(results, res) {
          if(results.status === 500){
            showAlert(member, ' already grouped to '+theCoordinator, 'success');
          } else {
            showAlert(results.status, ' : '+responseJSON.error, 'warning');
          }
        });
      });
    if (thePlayers.length === theCount){
    showAlert('Hooray', 'Defaults groups have been set', 'success');
    }
  });

}
//Set play losing Time
function playerClosingTime(){
  setDefaultGroups();
  var theCount = 0;
  defaultGrouping.forEach( function(group){
  theCoordinator = group.coordinator;
    $.getJSON( 'http://localhost:5005/'+theCoordinator+'/playlist/Closing Time – Semisonic', function(results, res) {
      })
    .done(function(results, res) {
      theCount += 1;
        showAlert('Closing Time', ' now playing ', 'success');
        })
    .fail(function(results, res) {
        });
  });

}


// SONOS ANNOCEMENTS ==============================================
// Get Sonos to Talk with TTS service
function sonosTTS(theText){
  $.getJSON( 'https://localhost:5006/sayAll/'+ theText +'/80', function(results, res) {
  })
  .done(function(results, res) {
    $('#TTSmodal').modal('hide');
    $('#TTSsuccessfeedback').html('You words are heard! well, that was ' + results.status + ' would you like to repeat yourself?');
    $("#TTSresponce").modal();


  })
  .fail(function(results, res) {
    $('#TTSmodal').modal('hide');
    showAlert( 'I got a ' + results.status, ' thats no good, please try again', warning );
    $("#TTSresponce").modal();

  });
}



// DB CALLS =======================================================
//Talks to DB to get presets
function getSaveInfo() {
    // jQuery AJAX call for JSON
    $.getJSON( '/sonosBackend/getStatus', function( results, res ) {
    })
      .done(function(results, res) {

            theLayout.id = results[0]._id;



    });
    $.getJSON( '/sonosBackend/sonosVolumeInfo', function( results, res ) {
    })
      .done(function(results, res) {

            theLayout.playerSavedInfo = results;

            var theDBPos = results.findIndex(x => x.roomName==='Lock Status');
              theLayout.lockedStatus = results[theDBPos].lockStatus;


    });

}


// Talks to DB to get Player preset Info
function getPlayerInfo() {
      // jQuery AJAX call for JSON
      $.getJSON( '/sonos/getPlayers', function( results, res ) {
      })
        .done(function(results, res) {
          playerSettings = results;
      });
  }


//get history ES6 Style
var promiseGetHistory = new Promise(function(resolve, reject) {
  // jQuery AJAX call for JSON
  $.getJSON( '/sonosBackend/getHistory', function( results, res ) {
  })
    .done(function(results, res) {
      theHistory = results;
      resolve(results);
      });

  });


//Get Track History
function getHistory(){

  // jQuery AJAX call for JSON
  $.getJSON( '/sonosBackend/getHistory', function( results, res ) {
  })
    .done(function(results, res) {
      theHistory = results;
      console.log('history Restored');
      console.log(theHistory);
  });
}

// Add User button click
function removeOldTracks() {

    // jQuery AJAX call for JSON
    $.getJSON( '/sonosBackend/removeOldRecords', function( results, res ) {
    })
      .done(function(results, res) {

        console.log(res);
    });
  }


// Add User button click
function addTrack(theInfo) {

  var myJSON = JSON.stringify(theInfo);

      // Use AJAX to post the object to our adduser service
      $.ajax({
          type: 'POST',
          data: myJSON,
          url: '/sonosBackend/addTrack',
          dataType: 'JSON',
          contentType: 'application/json',
      }).done(function( response ) {
          // Check for successful (blank) response
          if (response.msg === '') {

          }
          else {

          }
      });


}
//Talks to DB to update Zone information
function updateSavedInfo(){

  var theUpdate = {
                  'info' : theLayout.info,
                  'lockedStatus': theLayout.lockedStatus,
                  '_id': theLayout.id,
                  'currentTrackRef': theLayout.currentTrackRef,
                  'previousTrackRef': theLayout.previousTrackRef,
                  'maxVolume': theLayout.maxVolume,
                  'playersList' : theLayout.playersList,
                  'playerSavedInfo': theLayout.playerSavedInfo,
                  'timeStamp': moment(),
                };
      if(updateSavedInfoCheck!==0){


              $.ajax({
                type: "put",
                url: "sonosBackend/updateSavedInfo",
                contentType: 'application/json',
                data: JSON.stringify(theUpdate)
              }).done(function( response, results ) {

                // location.reload();

                  // Check for successful (blank) response
                  if (response.ok === 1) {
                  }
                  else {

                      // If something goes wrong, alert the error message that our service returned
                      alert('Error: ' + response.msg);

                  }

                });
          }
}
//Find Track in DB and add a Skip Count to it.
function updateTrack(theTrack){


    var updates = {
        'time' : theTrack.time,
        '_id': theTrack._id,
        'title': theTrack.title,
        'artist' : theTrack.artist,
        'album' : theTrack.album,
        'roomNames' : theTrack.roomNames,
        'artwork' : theTrack.artwork,
        'skipCount' : theTrack.skipCount,
    };

    $.ajax({
      type: "put",
      url: "sonosBackend/updateTrack",
      contentType: 'application/json',
      data: JSON.stringify(updates)
    }).done(function( response, results ) {

        // Check for successful (blank) response
        if (response.ok === 1) {


        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }

    });

  }
//Takes to DB to set new Player DB information
function updateSpeaker(theUpdate){

    var updates = {
        '_id': theUpdate.id,
        'roomName': theUpdate.roomName,
        'maxVolume' : theUpdate.maxVolume,
        };

    $.ajax({
      type: "put",
      url: "sonos/updatePlayer",
      contentType: 'application/json',
      data: JSON.stringify(updates)
    }).done(function( response, results ) {
        updates = {};

        // Check for successful (blank) response
        if (response.ok === 1) {
          location.reload();


        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }

    });
}
