// var tableContent = '',
// table = '',

var teamsNRates = [],
    aStaff = [],
    theData = [],
    teamInfo = [],
    theTeamUpdates = [];


  function showTheStaffPage(){
        // jQuery AJAX call for JSON
        $.getJSON( '/staff/getTeams', function( results, res ) {
        })
          .done(function(results, res) {

          getStaffMembers();

        });

  }



function insertStaff(member) {
  staffID = member._id;
  name = member.First_Name + ' ' + member.Last_Name;
  pin = member.Pin;
  teams = member.Teams;
          var table = document.getElementById("StaffMembersTableBody");

          var staffRow = table.insertRow(-1);
                staffRow.id = staffID;
          var teamsCellToggle = staffRow.insertCell(0);
                teamsCellToggle.className = 'toggle-row';
                teamsCellToggle.id = staffID+'_toggle';
                teamsCellToggle.innerHTML = '<a href="#" id="'+staffID+'" class="fas fa-edit UpdateStaff toggle-row" id="'+staffID+'"></i>';
          var activeCell = staffRow.insertCell(1);
            if(member.Active_Staff_Member === true){
                activeCell.innerHTML = '<i class="far fa-check-square"></i>';
              } else {
                activeCell.innerHTML = '<i class="far fa-square"></i>';
              }
          var adminCell = staffRow.insertCell(2);
            if(member.Super_Admin === true){
                activeCell.innerHTML = '<i class="far fa-check-square"></i>';
              } else {
                activeCell.innerHTML = '<i class="far fa-square"></i>';
              }
          var nameCell = staffRow.insertCell(3);
                nameCell.innerHTML = name;
          var pinCellToggle = staffRow.insertCell(4);
                pinCellToggle.innerHTML = '<a class="hidetext" id="'+staffID+'_Pin">'+pin+'</a>';

          var teamsCell = staffRow.insertCell(5);

            $.each(teams,function(i,team){
              if(team.rate !== 'Not In Team'){
             teamsCell.innerHTML = teamsCell.innerHTML + ' ' + team.team;
           }
         });
         var accessCell = staffRow.insertCell(5);

           $.each(member.Access_Rights,function(i,team){
             console.log(team.Name);
             if(team.Permission === true){
            accessCell.innerHTML = accessCell.innerHTML + ' ' + team.Name;
          }
        });




          var teamsRow = table.insertRow(-1);
              teamsRow.id = staffID+'_team';
              teamsRow.style = 'display:none;';
              teamsRow.className = 'toggle';

          var blankCell = teamsRow.insertCell(0);
          var teamCell = teamsRow.insertCell(1);



              teamCell.id = 'teamRates';

          var theChoice = '';
          var theTeam = '';
          var theTeamID = '';
              teamsNRates.forEach(function(teamNRate){
                  theTeam = teamNRate.Team_Name;
                  theTeamID = teamNRate._id;
                  theChoice +=   '<div class="input-group mb-3">';
                  theChoice +=     '<div class="input-group-prepend">';
                  theChoice +=         '<label class="input-group-text selectedTeamRates" for="'+staffID + '_' + theTeam+'">'+theTeam+'</label>';
                  theChoice +=     '</div>';
                  theChoice +=     '<select class="custom-select selectedTeamRates" id="'+staffID + '_' + theTeam+'">';

                  var rates = teamNRate.Team_Rates;
                  var selectedRate = 0;

                  teams.forEach(function(team){
                        if (team.team == teamNRate.Team_Name){
                          selectedRate = team.rate;
                          }
                  });

                  $.each(rates, function(i, rate){
                            if(i === 0 ){
                            //Blank
                            } else {
                            rate = '£'+rate;
                            }


                            if(i == selectedRate){
                              theChoice +=         '<option value="'+i+'" selected>'+rate+'</option>';
                            } else {

                              theChoice +=         '<option value="'+i+'">'+rate+'</option>';
                            }
                  });

                  theChoice +=     '</select>';
                  theChoice +=     '<div class="input-group-append">';

                  theChoice +=      '<button class="btn btn-outline-secondary updateRate" type="button" id="'+staffID+'_'+theTeam+'_'+theTeamID+'">Update Teams</button>';
                  theChoice +=     '</div>';
                  theChoice +=  '</div>';

              });

  teamCell.innerHTML = theChoice;



}


//DB CALLS=============================


//Post request to add Staff Member
function addStaff() {
  var selectedTeam = [];
$.each(teamInfo, function(i, team){
  selectedTeam[i] = {
    team: team.Team_Name,
    rate: $('#rates_'+team.Team_Name).val(),
    pay: $('input[name=inlineRadioOptions_'+team.Team_Name+']:checked').val(),
    admin: $('#admin_'+team.Team_Name).prop('checked')
                  };
});
console.log(selectedTeam);

    var newStaffMember = {
      Created_Date: moment().format('MMMM Do YYYY'),
      Created_Time : moment().format('HH:MM:SS'),
      First_Name : $('input#firstNameInput').val(),
      Last_Name : $('input#lastNameInput').val(),
      Pin : $('input#pinInput').val(),
      Super_Admin : $('input[id=superAdmin]').prop('checked'),
      Active_Staff_Member : $('input[id=activeStaff]').prop('checked'),
      Teams : selectedTeam,
      Access_Rights : [
        {Name :  'Visitors', Permission : $('input[id=visitorFormAccess]').prop('checked')},
        {Name :  'NonClimbingChild', Permission : $('input[id=nonClimbingChildAccess]').prop('checked')},
        {Name :  'WBS', Permission : $('input[id=wbsAccess]').prop('checked')},
        {Name :  'TheSession', Permission : $('input[id=theSessionAccess]').prop('checked')},
        {Name :  'ThamesWater', Permission :  $('input[id=thamesWaterAccess]').prop('checked')},
        {Name :  'Gardeners', Permission : $('input[id=gardenerAndMiniPlotterAccess]').prop('checked')},
      ]
    };

  var myJSON = JSON.stringify(newStaffMember);

console.log(newStaffMember);


    $.ajax({
        type: 'POST',
        data: myJSON,
        url: 'staff/addStaff',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response, results ) {
      console.log(results);

        // Check for successful (blank) response
        if (response.msg === '') {

        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }

    });
}

function toggleShow(staffID){





    // theID = '#'+theID+'_team';
    // console.log(theID);
    // $(theID).toggle();

}

//Get request for session
function getAStaff(staffID){

  $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
    })
    .done(function(results, res) {
          var theResults = JSON.stringify(results);
            if (theResults === '[]') {
                console.log(theResults);
          } else {
              console.log(theResults);
          }

      aStaff = results;
      });


  }

//Put request to update to Participants, on  pre made sesion

function updateAStaff(staffID, optSel,theTeam,theTeamID){
      console.log('UPDATE: ' + moment().format('MMMM Do YYYY'));


      $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
        })
        .done(function(results, res) {

            var theTeams = results[0].Teams;
            theTeams.forEach(function(aTeam){
              aTeamsName = aTeam.team;
              if(aTeamsName === theTeam){
                aTeam.rate = optSel;
              }
            });


                $.ajax({
                  type: "put",
                  url: "staff/updateAStaff",
                  contentType: 'application/json',
                  data: JSON.stringify(results[0])
                });

                $.getJSON( '/staff/getATeam', {_id: theTeamID }, function(results, res) {
                  })
                  .done(function(results, res) {
                      console.log(results[0]);
                      var theTeamStaff = [];


                      var isFound = false;
                      theTeamStaff = results[0].Team_Staff;
                      var theTeamStaffLength = theTeamStaff.length;
                      console.log(theTeamStaffLength);
                      console.log(theTeamStaff);
                      if(theTeamStaff.length === 0){
                            if(optSel == 0){
                              console.log('l0 0 selected');
                              //Do nothing
                            } else {
                              console.log('l0 not 0 selected');
                            theTeamStaff[theTeamStaffLength] = {"_id" : staffID, "rate" : optSel};
                            results[0].Team_Staff = theTeamStaff;
                            }
                      } else {
                          $.each(theTeamStaff,function(ai,aStaff){
                            console.log(aStaff);
                            var aStaffsID = aStaff._id;
                            if(aStaffsID == staffID){
                              isFound = true;
                              if(optSel == 0){
                                console.log('to remove');
                                theTeamStaff.splice(i,1);
                                results[0].Team_Staff = theTeamStaff;
                              } else {
                                console.log('l0+ not 0 selected');
                              aStaff.rate = optSel;
                              theTeamStaff.Team_Staff = theTeamStaff;
                              results[0].Team_Staff = theTeamStaff;
                              }
                            }
                          });
                          if(isFound === false){
                            theTeamStaff[theTeamStaffLength+1] = {"_id" : staffID, "rate" : optSel};
                            results[0].Team_Staff = theTeamStaff;
                          }
                      }

                          console.log(results);
                          $.ajax({
                            type: "put",
                            url: "staff/updateATeam",
                            contentType: 'application/json',
                            data: JSON.stringify(results[0])
                          });


                    });

                    getStaffMembers();

          });


  }

//Get Staff Members Files
function getStaffMembers() {
$("#StaffMembersTableBody").empty();
    // jQuery AJAX call for JSON
    $.getJSON( '/staff/getStaff', function( data ) {
theData = data;

    $.each(data, function(i, member){


        insertStaff(member);

    });
  });
}






//DOM watch==============================

//DOM ready
$(document).ready(function() {


  showTheStaffPage();
});

//DOM mouse over
$(document).mouseover(function() {
  //Show Pin
  if(event.target.className === 'hidetext'){
      var theID = event.target.id;
      document.getElementById(theID).classList.remove("hidetext");
      document.getElementById(theID).classList.add("showtext");
  }

});

//DOM mouse out
$(document).mouseout(function() {
  //Hide Pin
  if(event.target.className === 'showtext'){
      var theID = event.target.id;
      document.getElementById(theID).classList.remove("showtext");
      document.getElementById(theID).classList.add("hidetext");
  }




});

//DOM click
$(document).on('click',function() {
//Show teams
      console.log(event.target.id);

      if ($(event.target).hasClass('UpdateStaff') === true){
        var staffID = event.target.id;
        var staffMemeber = [];
        var theTeams = '';
        var staffsTeams = [];

        $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
          $('#addStaffModal').modal('show');
          $('#TeamList').html('<img src="/loading.gif" alt="loading" height="42" width="42">');
          $('#addStaffModal').on('shown.bs.modal', function () {
            $('#firstNameInput').trigger('focus');
          });
          })
          .done(function(results, res) {
                var theResults = JSON.stringify(results);
                    staffMemeber = results;
                  if (theResults === '[]') {
                      console.log(theResults);
                } else {
                    console.log(theResults);
                }
                staffsTeams = results[0].Teams;
                $('#firstNameInput').val(results[0].First_Name);
                $('#lastNameInput').val(results[0].Last_Name);
                $('#pinInput').val(results[0].Pin);
                document.getElementById("adminCheckBox").checked = results[0].admin;


            $.getJSON( '/staff/getTeams', {}, function(results, res) {


              })
              .done(function(results, res) {
                var teamInfo = results;

                    $.each(results,function(i, team){
                      theTeams +=   '<div class="input-group">';
                      theTeams +=     '<div class="input-group-prepend">';
                      theTeams +=         '<label class="input-group-text input-group-addon primary selectedTeamRates" for="'+results[i].Team_Name+'_rates">'+results[i].Team_Name+'</label>';
                      theTeams +=     '</div>';
                      theTeams +=     '<select class="custom-select .input-group-outline-addon.primary selectedTeamRates" id="'+results[i].Team_Name+'_rates">';
                      $.each(team.Team_Rates, function(i,rate){
                          theTeams += '<option>'+rate+'</option>';
                      });
                      theTeams +=   '</select>';
                      theTeams +=  '</div>';
                    });
                    $('#TeamList').html(theTeams);

                    $.each(staffsTeams, function(i, team){
                        document.getElementById(team.team+'_rates').selectedIndex = team.rate;
                    });


              });



            });
      }
    //Update Staff Member
    if ($(event.target).hasClass('updateRate') === true){
      console.log(event.target.id);
      var theID = event.target.id.split("_");

      var staffID = theID[0];
      var staffid = '#'+theID[0];
      var theTeam = theID[1];
      var theTeamID = theID[2];

      var optSel =  $(staffid+'_'+theTeam+' option:selected').val();


      updateAStaff(staffID,optSel,theTeam,theTeamID);


    }

    if (event.target.id === 'staffModal'){



          $.getJSON( '/staff/getTeams', {}, function(results, res) {


            })
            .done(function(results, res) {
                theTeams = '';
                teamInfo = results;
                  $.each(results,function(i, team){

                    theTeams +=   '<span >'+results[i].Team_Name+'</span>';
                    theTeams +=   '<div class="input-group">';
                    theTeams +=   '  <div class="input-group-prepend">';
                    theTeams +=   '    <div class="input-group-text">';
                    theTeams +=   '      <input type="radio" name="inlineRadioOptions_'+results[i].Team_Name+'" id="pay_'+results[i].Team_Name+'" value="Not In Team" checked>';
                    theTeams +=   '    </div>';
                    theTeams +=   '  </div>';
                    theTeams +=   '  <div class="input-group-append">';
                    theTeams +=   '    <div class="input-group-text">';
                    theTeams +=   '      <label class=" form-check-label" for="inlineRadioOptions_'+results[i].Team_Name+'"> Not In Team</label>';
                    theTeams +=   '    </div>';
                    theTeams +=   '  </div>';


                    theTeams +=   '  <div class="input-group-prepend">';
                    theTeams +=   '    <div class="input-group-text">';
                    theTeams +=   '      <input type="radio" name="inlineRadioOptions_'+results[i].Team_Name+'" id="pay_'+results[i].Team_Name+'" value="Hourly">';
                    theTeams +=   '    </div>';
                    theTeams +=   '    <label class="input-group-text form-check-label" for="inlineRadioOptions_'+results[i].Team_Name+'"> Hourly</label>';
                    theTeams +=   '  </div>';
                    theTeams +=   '  <div class="input-group-append">';
                    theTeams +=   '      <select class="custom-select" id="rates_'+results[i].Team_Name+'" required>';
                    theTeams +=   '        <option></option>';
                                            $.each(team.Team_Rates, function(i,rate){
                                                theTeams += '<option>'+rate+'</option>';
                                            });
                    theTeams +=   '      </select>';
                    theTeams +=   '  </div>';

                    theTeams +=   '  <div class="input-group-prepend">';
                    theTeams +=   '    <div class="input-group-text">';
                    theTeams +=   '      <input type="radio" name="inlineRadioOptions_'+results[i].Team_Name+'" id="pay_'+results[i].Team_Name+'" value="Contracted">';
                    theTeams +=   '    </div>';
                    theTeams +=   '  </div>';
                    theTeams +=   '  <div class="input-group-append">';
                    theTeams +=   '    <div class="input-group-text">';
                    theTeams +=   '      <label class=" form-check-label" for="inlineRadioOptions_'+results[i].Team_Name+'"> Contracted</label>';
                    theTeams +=   '    </div>';
                    theTeams +=   '  </div>';


                    theTeams +=   '  <div class="input-group-prepend">';
                    theTeams +=   '    <div class="input-group-text">';
                    theTeams +=   '      <input type="checkbox" name="admin_'+results[i].Team_Name+'" id="admin_'+results[i].Team_Name+'" value="Admin">';
                    theTeams +=   '    </div>';
                    theTeams +=   '  </div>';
                    theTeams +=   '  <div class="input-group-append">';
                    theTeams +=   '    <div class="input-group-text">';
                    theTeams +=   '      <label class=" form-check-label" for="admin_'+results[i].Team_Name+'"> Team Admin</label>';
                    theTeams +=   '    </div>';
                    theTeams +=   '  </div>';

                    theTeams +=   '</div>';

                  });

                  $('#TeamList').html(theTeams);

                  $.each(staffsTeams, function(i, team){
                      document.getElementById('rates_'+team.team).selectedIndex = team.rate;
                  });


            });


    }


});
