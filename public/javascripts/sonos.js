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
    infoHistory = {};

var theCoordinators = [];
var thePlayers = [];
var refreshCheck = [];
var zoneCheck = 0;
var cards = [];
var insertCards = '';
var oldArtWork = [];
var playerInfo = [];
var defaultGrouping = [
  {'coordinator' : 'Café', 'members': ['Engine%20House']},
  {'coordinator' : 'Reception', 'members': ['Mez','Vaults','Wells']}
];
var playerNames = ['Engine House','Café','Reception','Mez','Vaults','Wells'];


//DOM ---------
  $(document).ready(function() {
      $('#cardInsert').html('<img src="loading.gif" alt="Smiley face" height="42" width="42">');
    setInterval(getData,1000);
    // getStatus();
      window.setTimeout(function(){
        setInterval(addCards, 1000);
        setInterval(fieldUpdate, 1000);
      },2000);
    // getPlayerInfo();
    // getZones();

    //Resets modals when hidden
        $('.modal').on('hidden.bs.modal', function() {
          $(this)
          .find("input,textarea,select")
          .val('')
          .end()
          .find("input[type=checkbox], input[type=radio]")
          .prop("checked", "")
          .end();
      });
//Reloads page after TTS,
      $('button#CloseTTS').on('click', function(){
        location.reload();
      });

//Watching Default Group Button, will set the Players to opening groupings
      $("button#defaultsPlayerGroups").on("click", function () {
        setDefaultGroups();
      });

//Watching Closing Time Button, will set the Players to opening groupings
      $("button#playClosingTime").on("click", function () {
        playClosingTimes();
      });

//Watching Set Level BUTTON
      $('#cardInsert').on("click","button#setLevel", function () {
        var roomName = $(this).data('name');
        var playerUUID = $(this).data('id');
        $(".modal-header #roomName").html('<h4>Sonos volumes levels for '+roomName+'</h4>');
        setLevels(playerUUID);
      });

//Watching Volume Lock controls
      $('input#lockVolume').on('change', function(){
        $.getJSON( 'https://localhost:5006/Reception/lockvolumes', function(results, res) {
          })

          .done(function(results, res) {
            $('#successfeedback').html('Levels have been ' + results.status + 'fully locked.');
            $("#successModal").modal();
            theLayout.lockedStatus = true;

            updateLockStatus(true);
          });
      });
//Watching Volume UNLOCK controls
      $('input#unlockVolume').on('change', function(){
        $.getJSON( 'https://localhost:5006/Reception/unlockvolumes', function(results, res) {
          })

          .done(function(results, res) {
            $('#successfeedback').html('Levels have been ' + results.status + 'fully unlocked.');
            $("#successModal").modal();
            theLayout.lockedStatus = false;
            updateLockStatus(false);
          });
      });

//Watch TTS Button
      $('button#SPEEK').on('click', function(){
        var theText = $('textarea#speech').val();
        sonosTTS(theText);
      });
//Watch TTS repeat button
      $('button#RepeatTTS').on('click', function(){
        document.getElementById('textarea#speech').value = theText;
        sonosTTS(theText);
      });


  });



//Waiting to show the Players
function showData(){
  theCount = (theCount+1);
  var theText =theCount +'<br>';
      theText += JSON.stringify(theLayout);

  $('#cardInsert').html(theText);
}


//Reconstructs data for queries about Sonos Players
// function sortPlayers(){
//       thePlayers = [];
//       var theZones = theLayout.info;
//
//       theZones.forEach(function(theZone){
//         theCoordinators.push(theZone.coordinator);
//         theZone.members.forEach(function(theMember){
//           thePlayers.push(theMember);
//           var maxVolume = theLayout.maxVolume;
//           var theDBPos = theLayout.maxVolume.findIndex(x => x.roomName===theMember.roomName);
//           var thePlayerPos = thePlayers.findIndex(x => x.roomName===theMember.roomName);
//           thePlayers[thePlayerPos].maxVolume = maxVolume[theDBPos].maxLevel;
//           thePlayers[thePlayerPos].id = theMember.uuid;
//
//               if (thePlayerPos === -1){
//                 thePlayers[thePlayerPos].dbFound = false;
//             } else if( thePlayerPos >= 0){
//               thePlayers[thePlayerPos].dbFound = true;
//             }
//         });
//     });
//     var presentAndCorrect = 0;
// thePlayers.forEach( function(thePlayer){
//   if (thePlayer.dbFound === true){
//     presentAndCorrect += 1;
//   } else {
//       showAlert('Holy guacamole!',   thePlayer.roomName + ' player has not been foundon the database', 'warning');
//       getPlayerInfo();
//   }
// });
// if (presentAndCorrect === thePlayers.length){
//     $('.alert').alert('close');
//       addCards();
//       fieldUpdate();
//       setLockStatus();
//     }
// }

//Write HTML for each Sonos Player
function addCards(){
if(infoHistory.length!==theLayout.info.length){
    cards = [];
    oldArtWork = [];
      infoHistory = theLayout.info;
    $.each(theLayout.info, function(i, theZone){
      var theIDs = [];
        $.each(theZone.members, function (i, member){
          theIDs.push(member.uuid);
        });
//ADD Cards
            zoneCard = '<div class="w-100 d-none d-md-block d-lg-none"></div>';
            zoneCard += '<div class="card">';
            zoneCard += '  <div class="card-body">';

            zoneCard += '   <div class = "card-group nopadding">';
                        // zoneCard += '   <div class = "card col-4">';
            zoneCard += '     <div id="'+theZone.coordinator.uuid+'_artWork"  class="nopadding nomargin card col-5" "></div>';
            // zoneCard += '   </div>';
            zoneCard += '   <div class = "nomargin card col-7">';
            zoneCard += '     <div id="'+theZone.coordinator.uuid+'_trackInfo"></div>';
            zoneCard += '  </div>';
            zoneCard += ' </div>';

            zoneCard += '   <div class = "card-deck">';
      // ADD Group Members

            $.each(theZone.members, function(i, theMember){
            zoneCard += '       <div class="card">';
            zoneCard += '         <div class="card-header">';
            zoneCard +=            '<h4>'+ theMember.roomName + '</h4>';
            zoneCard += '         </div>';
            zoneCard += '         <div class="card-body">';
            zoneCard += '           <div id="'+theMember.uuid+'_Volume"></div>';
            zoneCard += '             <br>';
            zoneCard += '              <button href="#levelModal" type="button" data-target="#levelModal" data-toggle="modal" data-id="'+theMember.uuid+'"data-name="'+theMember.roomName+'" id="setLevel" class="btn btn-primary maxBtn">Set Levels</button>';
            // zoneCard += '              <button type="button"  data-id="'+theMember.roomName+'" id="setLevel" class="btn btn-primary maxBtn">Set Levels</button>';
            zoneCard += '         </div>';
            zoneCard += '       </div>';
            });

            zoneCard += '  </div>';
            zoneCard += '</div>';
            zoneCard += '</div>';
            zoneCard += '';
            //insert Card into cards
            cards[i] = zoneCard;


            insertCards = '<div class="card-deck">';
            $.each(cards, function(i, card){
              insertCards += card;
            });
            insertCards += '</div>';
          $('#cardInsert').html(insertCards);

    });
  infoHistory = theLayout.info;

  console.log(infoHistory);
}


//Layout Players with details
  function layoutPlayers (theZone, i){

      }

  }

//Updates each Player's info every 5 seconds
function fieldUpdate(){
        setLockStatus();

      var theZones = theLayout.info;
      $.each(theZones, function(i, theZone){

        if (oldArtWork.length === 0){

          oldArtWork[i] = theZone.coordinator.state.currentTrack.absoluteAlbumArtUri;
          addTrackInfo();
        }
      if (theZone.coordinator.state.currentTrack.absoluteAlbumArtUri !== oldArtWork[i]){

        oldArtWork[i] = theZone.coordinator.state.currentTrack.absoluteAlbumArtUri;
        addTrackInfo();
      }
  function addTrackInfo(){
           // theHTML  = '<div>';
          var theHTML = '  <img class="card-img-top" src="'+oldArtWork[i]+'" alt="Card image cap">';
              // theHTML += '</div>';
          $('#'+theZone.coordinator.uuid+'_artWork').html(theHTML);
          // console.log(theHTML)
          trackInfo = '      <ul class="list-group list-group-flush">';
          trackInfo += '         <li class="list-group-item"><b>Title : </b>'+theZone.coordinator.state.currentTrack.title+'</li>';
          trackInfo += '         <li class="list-group-item"><b>Artist : </b>'+theZone.coordinator.state.currentTrack.artist+'</li>';
          trackInfo += '         <li class="list-group-item"><b>Album : </b>'+theZone.coordinator.state.currentTrack.album+'</li>';
          trackInfo += '         <li class="list-group-item"><div id="'+i+'_Position"></div></li>';
          trackInfo += '       </ul>';

          $('#'+theZone.coordinator.uuid+'_trackInfo').html(trackInfo);
        }

        var thePlayersList = theLayout.playersList;
        theZone.members.forEach( function(theMember){
            var thePlayer = thePlayersList.find(function(element) {
            return element.roomName === theMember.roomName;
          });

          maxVolume = thePlayer.maxVolume;

          theVolHTML = '<p> <b>Volume : </b>'+theMember.state.volume+'<br>';
          theVolHTML += '<b>Maximum : </b>'+maxVolume+'</p>';
          theVolHTML += '<div class="progress">';
          theVolHTML += '<div class="progress-bar bg-success" role="progressbar" style="width: '+theMember.state.volume+'%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>';
          theVolHTML += '<div class="progress-bar bg-danger" role="progressbar" style="width: '+(maxVolume - theMember.state.volume)+'%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>';
          theVolHTML += '</div>';
          $('#'+theMember.uuid+'_Volume').html(theVolHTML);
        });

          var theDuration = theZone.coordinator.state.currentTrack.duration;
          var elpTime = theZone.coordinator.state.elapsedTime;

          var thePos = (elpTime / theDuration) *100;
          trackPosHTML = '<p> <b>Elapsed Time : </b>  '+theZone.coordinator.state.elapsedTimeFormatted+' </p>';
          trackPosHTML += '<div class="progress">';
          trackPosHTML += '<div class="progress-bar bg-info" role="progressbar" style="width: '+thePos+'%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>';
          trackPosHTML += '</div>';
          $('#'+i+'_Position').html(trackPosHTML);


        });

}

//If lock status is change this changes the graphic
function setLockStatus(){
      lockRadiobtn = document.getElementById("btnLockVolume");
      unlockRadiobtn = document.getElementById("btnUnlockVolume");

        if (theLayout.lockedStatus === true){
          lockRadiobtn.classList.add("active");
          unlockRadiobtn.classList.remove("active");
  } else if (theLayout.lockedStatus === false){
          unlockRadiobtn.classList.add("active");
          lockRadiobtn.classList.remove("active");
  } else  {
          unlockRadiobtn.classList.remove("active");
          lockRadiobtn.classList.remove("active");
  }

}

//Shows Modal for adjust single Platyer Volume and Max Level
function setLevels(playerUUID){
  var thePlayers = theLayout.playersList;
  var thePlayer = thePlayers.find(function(element) {
    return element.uuid === playerUUID;
    });


  var   volHTML = '<p> <b>Current Volume : </b>'+thePlayer.volume+'</p>';
        volHTML += '<div class="progress">';
        volHTML += '<div class="progress-bar bg-success" style="width:'+thePlayer.volume+'%"></div>';
        volHTML += '</div>';
  var   maxVolHTML = '<p><b>Max Volume : </b> '+thePlayer.maxVolume+'</p>';
        maxVolHTML += '<div class="progress">';
        maxVolHTML += '<div class="progress-bar bg-danger" style="width:'+thePlayer.maxVolume+'%"></div>';
        maxVolHTML += '</div>';
    $('.modal-body #currentVolume').html(volHTML);
    $('.modal-body #maxVolume').html(maxVolHTML);

    $('button#setCurLevel').on('click',function(){
        var newLevel = $('input#NewCurrentLevel').val();
      if(0 <= newLevel && newLevel <= 100){
        $.getJSON( 'https://localhost:5006/'+thePlayer.roomName+'/volume/'+ newLevel, function(results, res) {
        })
        .fail(function(results, res) {
          console.log(results);
        })
            .done(function(results, res) {
              console.log(results);
              $('#successfeedback').html('Levels have been ' + results.status + 'fully changed to '+ newLevel +'.');
              $(".modal#levelModal").modal('hide');
              $("#successModal").modal();
          });

      } else {
        alert("you've not entered a number between 0 -100");
      }
    });

    $('button#setMaxLevel').on('click',function(){

        var theUpdate = {};
        var newMaxLevel = $('input#NewMaxLevel').val();
        console.log(newMaxLevel);
      if(0 <= newMaxLevel && newMaxLevel <= 100){
        var pSI = theLayout.playerSavedInfo;
        var theDBPos = pSI.findIndex(x => x.roomName===thePlayer.roomName);
        var theInfo = pSI[theDBPos];
            theInfo.maxVolume = newMaxLevel;
            theInfo.updated = moment();

          // var theNewData = {'updated': moment(),'_id' : theInfo._id, 'uuid': theInfo.uuid, 'roomName': theInfo.roomName, 'maxVolume' : newMaxLevel, 'volume': thePlayer.volume, 'coordinator' : thePlayer.coordinator, 'lockStatus' : theLayout.lockedStatus};
// console.log(theNewData);

            updateData(theInfo);


    fieldUpdate();
      } else {
        alert("you've not entered a number between 0 -100");
      }
      theUpdate = '';
      $(".modal#levelModal").modal('hide');
    });

    $('button#close').on('click',function(){
      $(".modal#levelModal").modal('hide');
    });

    $("#setLevel").on('click', function(){
      console.log('clicked');
      // var playerUUID = (this.getAttribute('data-typeID'));
      // setLevels(playerUUID);
      });
}

function updateLockStatus(booleanVal){
  var pSI = theLayout.playerSavedInfo;
  var theDBPos = pSI.findIndex(x => x.roomName==='Lock Status');
  var theInfo = pSI[theDBPos];
  theInfo.lockStatus = booleanVal;
  updateData(theInfo);
}

//Shows alert on found issues
function showAlert(opener, theMessage, level){
  console.log(opener, +' : '+ theMessage + ' : ' + level);
  theAlert =  '<div id="theAlerts" class="alert alert-'+level+' alert-dismissible fade show" role="alert">';
  theAlert += '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">';
  theAlert += '   <span aria-hidden="true">&times;</span>';
  theAlert += '  </button>';
  theAlert += ' <strong>'+opener+'</strong> '+theMessage+'.';
  theAlert += '</div>';
  $('#alerts').html(theAlert);
}


// DB CALLS =======================================================
//Talks to DB to get presets
function getData() {
    // jQuery AJAX call for JSON
    $.getJSON( '/sonosBackend/getStatus', function( results, res ) {
    })
      .done(function(results, res) {
          theLayout = results[0];
          theLayout.id = theLayout._id;
          // showData();
    });

}

//Talks to DB to update Zone information
function updateData(theUpdate){
console.log(theUpdate);
    $.ajax({
      type: "put",
      url: "sonosBackend/updateMaxVolume",
      contentType: 'application/json',
      data: JSON.stringify(theUpdate)
    }).done(function( response, results ) {

      // location.reload();

        // Check for successful (blank) response
        if (results=== 'success') {
        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response);

        }

      });
                  resetPage();
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
    console.log('YAY');

  })
  .fail(function(results, res) {
    $('#TTSmodal').modal('hide');
    showAlert( 'I got a ' + results.status, ' thats no good, please try again', warning );
    $("#TTSresponce").modal();
    console.log('NA');
  });
}


// SONOS CONTROLS =================================================
//Set default Grouping for sonos
function setDefaultGroups(){
  var theCount = 0;
  defaultGrouping.forEach( function(group){
  theCoordinator = group.coordinator;
  theMembers = group.members;


  console.log('Now ungrouping players');
  playerNames.forEach( function(member){
    setTimeout(removeMember(member), 5000);
  });

  console.log('Now grouping players');
  theMembers.forEach( function(member){
      setTimeout(joinMember(member, theCoordinator), 5000);
  });


function removeMember(member){
      console.log(member);
  $.getJSON( 'https://localhost:5006/'+member+'/leave', function(results, res) {
  })
  .done(function(results, res) {
      showAlert(member, ' ungrouped', 'success');
      })
  .fail(function(results, res) {
    if(results.status === 500){
      showAlert(member, ' not ungrouped', 'success');
    } else {
      showAlert(results.status, ' : '+responseJSON.error, 'warning');
    }
    });
}

function joinMember(member,theCoordinator){
    console.log(member);
    $.getJSON( 'https://localhost:5006/'+member+'/join/'+theCoordinator, function(results, res) {
    })
    .done(function(results, res) {
        showAlert(member, ' grouped to '+theCoordinator, 'success');
                theCount += 1;
        })
    .fail(function(results, res) {
      if(results.status === 500){
        showAlert(member, ' already grouped to '+theCoordinator, 'success');
      } else {
        showAlert(results.status, ' : '+responseJSON.error, 'warning');
      }
      });
}



  if (thePlayers.length === theCount){
  showAlert('Hooray', 'Defaults groups have been set', 'success');
  }
});



}

// var playerData = {};
//
// function insertCards(){
//
//   $.getJSON( '/sonos/getPlayers', function( results, res ) {
//     })
//     .done(function(results, res) {
//     playerData = results;
//
//
//         var playerNum = 0;
//         var cardInsert = '<div class="card-deck">';
//         $.each(playerData, function (index, value){
//             var playerNum = index;
//
//
//
//               cardInsert += '<div id="'+playerData[index]._id+'_Card" class="card">';
//               cardInsert += ' <div class="card-header">';
//               cardInsert += ' <img class="card-img-top" id="'+playerData[index]._id+'_Img" src="/loading.gif" alt="" style="width:100%">';
//               cardInsert += ' </div>';
//
//               cardInsert += ' <div class="card-body">';
//               cardInsert += '   <h3 class="card-title">'+playerData[index].name+'</h3>';
//               cardInsert += '   <div id="'+playerData[index]._id+'_Info"></div>';
//               cardInsert += ' </div>';
//
//               cardInsert += ' <div class="card-footer">';
//               cardInsert += '   <h5 class="card-title">Volume</h5>';
//               cardInsert += '     <div id="'+playerData[playerNum]._id+'_Volume"></div>';
//               cardInsert += '   <br>';
//
//               cardInsert += '   <a href="#" data-typeId="'+playerData[index]._id+'" id="changeLimit" class="btn btn-light">Change</a>';
//               cardInsert += ' </div>';
//               cardInsert += '</div>';
//
//         });
//               cardInsert +='</div>';
//
//
//           $('#cardInsert').html(cardInsert);
// //first time run of updateInformation
//           $.each(playerData, function (index, value){
//             updateInformation(index);
//           });
//
//     });
//     }
//
// function updateInformation(player){
//
//     var cardInsert = '';
//
//     $('#'+player._id+'_Card' ).removeClass( "bg-primary", "bg-success", "bg-warning", "bg-secondary", "bg-danger", "bg-light" ).addClass( "bg-"+player.zone.colour );
//
//       cardInsert += '   <div class="card-text"> <b>Artist:</b>' + player.currentTrack.artist + '</div>';
//       cardInsert += '   <div class="card-text"> <b>Title:</b>' + player.currentTrack.title + '</div>';
//       cardInsert += '   <div class="card-text"> <b>Album:</b>' + player.currentTrack.album + '</div>';
//     $('#'+player._id+'_Info').html(cardInsert);
//
//     var volumeInsert = '';
//     volumeInsert += '   <div class="progress">';
//     volumeInsert += '<div class="progress-bar bg-dark" style="width:'+player.volume+'%">'+player.volume+'%</div>';
//     volumeInsert += '<div class="progress-bar bg-danger" style="width:'+(player.maxVolume-player.volume)+'%">'+player.maxVolume+'</div>';
//     volumeInsert += '   </div>';
//     $('#'+player._id+'_Volume').html(volumeInsert);
// }
//
// function updateSpeaker(theUpdate){
//       console.log('DATE: ' + DateOnly);
//
//       var updates = {
//           '_id': theUpdate.id,
//           'Speaker': theUpdate.speaker,
//           'History' : [],
//           'Ref' : theUpdate.ref,
//           'MaxLevel' : theUpdate.level,
//           };
//
//       $.ajax({
//         type: "put",
//         url: "sonos/updateSpeaker",
//         contentType: 'application/json',
//         data: JSON.stringify(updates)
//       }).done(function( response, results ) {
//
//         // location.reload();
//           console.log(response);
//           // Check for successful (blank) response
//           if (response.ok === 1) {
//
//               // Clear the form inputs
//               // $('#addPerson input').val('');
//
//               // // Update the table
//               // populateTable();
//
//           }
//           else {
//
//               // If something goes wrong, alert the error message that our service returned
//               alert('Error: ' + response.msg);
//
//           }
//
//       });
//     }
//
// function populatePlayers() {
//       // jQuery AJAX call for JSON
//       $.getJSON( '/sonos/getPlayers', function( results, res ) {
//       })
//         .done(function(results, res) {
//         var newData = results;
//         playerData = results;
//           $.each(newData, function(index, value){
//
//             updateInformation(newData[index]);
//
//           $('#'+playerData[index]._id+'_Img').attr("src",playerData[index].currentTrack.absoluteAlbumArtUri);
//           });
//
//
//       });
//
//     }
//
// function watchLevels(currentArea, currentLevel, maxLevel){
//     if(currentLevel > maxLevel){
//       console.log(currentArea + ' : '+currentLevel);
//         $.getJSON( 'https://localhost:5006/'+currentArea+'/volume/'+maxLevel+'', function(results, res) {
//       })
//           .done(function(results, res) {
//             console.log(results);
//     });
//   }
//
// }
//
// // THIS MOTHER FUCKER WITH SWITCH THE LINEINPUT  BACK TO THE QUEUE
// //'https://localhost:5006/shed/SetAVTransportURI/x-rincon-queue:RINCON_000E583EF7E201400%230'
// function sonosTTS(theText){
//   $.getJSON( 'https://localhost:5006/sayAll/'+ theText +'/70', function(results, res) {
//   })
//   .done(function(results, res) {
//     $('#TTSmodal').modal('hide');
//     $('#TTSsuccessfeedback').html('You words are heard! well, that was ' + results.status + ' would you like to repeat yourself?');
//     $("#TTSresponce").modal();
//     console.log('YAY');
//   })
//   .fail(function(results, res) {
//     $('#TTSmodal').modal('hide');
//     $('#TTSsuccessfeedback').html( 'I got a ' + results.status + ' thats no good, please try again' );
//     $("#TTSresponce").modal();
//     console.log('NA');
//   });
// }
//
//
//
// function sonosAnnoncement(){
//     $.each(areas,function(index,value){
//
//       $.getJSON( 'https://localhost:5006/'+ areas[index].name +'/lineIn/Reception', function(results, res) {
//       })
//       .done(function(results, res) {
//         console.log(areas[index].name + ' switched');
//       });
// });
// }
// function sonosGroup(){
// $.each(zones,function(index,value){
//   if (zones[index].members.length > 0){
//     var theMembers = zones[index].members;
//     var zoneCoordinator = zones[index].coordinator;
//     $.each(theMembers, function(i,v){
//       if (theMembers[i] !== zoneCoordinator){
//         console.log('a centance ' +v);
//         v = [v];
//         $.getJSON( 'https://localhost:5006/'+ (v) +'/join/'+ zoneCoordinator, function(results, res) {
//         })
//         .done(function(results, res) {
//           console.log(theMembers[i] + ' grouped');
//         })
//         .fail(function(results, res) {
//           alert('well that went wrong - face slap emoji :' + results.error);
//           console.log(results);
//         });
//       }
//   });
// }
// });
// }
// function sonosResume(){
// $.each(areas,function(index,value){
//       $.getJSON( 'https://localhost:5006/'+ areas[index].name +'/SetAVTransportURI/x-rincon-queue:'+ areas[index].uuid+'%230', function(results, res) {
//     })
//       .done(function(results, res) {
//         console.log(areas[index].name + ' switched back');
//       });
// });
// }
//
// function setLevels(playerNum, player){
//
//        var theArea = '<p> Sonos volumes levels for '+ player + '</p>';
//
//        $(".modal-title").html( theArea );
//       $('#levelModal').modal('show');
//       $('#currentVolume').html('<div class="progress-bar bg-primary" style="width:'+areas[playerNum].results.volume+'%">Volume '+areas[playerNum].results.volume+'% </div>');
//       $('#maxVolume').html('<div class="progress-bar bg-danger" style="width:'+speakerData[playerNum].MaxLevel+'%">Volume '+speakerData[playerNum].MaxLevel+'% </div>');
//
//       $('input#NewCurrentLevel').on('blur',function(){
//           var newLevel = $('input#NewCurrentLevel').val();
//         if(0 <= newLevel && newLevel <= 100){
//       console.log(player + newLevel);
//           $.getJSON( 'https://localhost:5006/'+areas[playerNum].name+'/volume/'+ newLevel, function(results, res) {
//           })
//           .fail(function(results, res) {
//             console.log(results);
//           })
//               .done(function(results, res) {
//                 console.log(results);
//                 $('#successfeedback').html('Levels have been ' + results.status + 'fully changed to '+ newLevel +'%.');
//                 $(".modal#levelModal").modal('hide');
//                 $("#successModal").modal();
//             });
//
//         } else {
//           alert("you've not entered a number between 0 -100");
//         }
//       });
//
//       $('input#NewMaxLevel').on('blur',function(){
//           var newMaxLevel = $('input#NewMaxLevel').val();
//         if(0 <= newMaxLevel && newMaxLevel <= 100){
//
//           theUpdate = {'speaker' : player, 'level' : newMaxLevel, 'ref': playerNum, 'id' : areas[playerNum]._id };
//       updateSpeaker(theUpdate);
//
//         } else {
//           alert("you've not entered a number between 0 -100");
//         }
//       });
// }
//
//
//
//   $(document).ready(function() {
//     insertCards();
//     // populatePlayers();
//     // insertCards();
//     // watchLevels();
//     // createList();
//     setInterval(populatePlayers, 1000);
//     // setInterval(watchLevels, 5000);
//
//     $('.modal').on('hidden.bs.modal', function() {
//       $(this)
//       .find("input,textarea,select")
//       .val('')
//       .end()
//       .find("input[type=checkbox], input[type=radio]")
//       .prop("checked", "")
//       .end();
//   });
//
//     $('button#SPEEK').on('click', function(){
//       theText = $('textarea#speech').val();
//       sonosTTS(theText);
//     });
//
//     $('button#RepeatTTS').on('click', function(){
//       document.getElementById("textarea#speech").value = theText;
//       sonosTTS(theText);
//     });
//

//
//
//
//   $(document).on("click", "#changeLimit", function () {
//     var playerNum = (this.getAttribute('data-typeID'));
//     var player = areas[playerNum].name;
//     setLevels(playerNum, player);
//
//
//   });
