// var tableContent = '',
// table = '',

var teamsNRates = [],
    aStaff = [],
    theData = [],
    teamInfo = [],
    theTeamUpdates = [],
    staffID = '';



  function showTheStaffPage(){
        // jQuery AJAX call for JSON
        $.getJSON( '/staff/getTeams', function( results, res ) {
        })
          .done(function(results, res) {

          getStaffMembers();

        });

  }

function addHeaders(){
  $.getJSON( '/staff/getTeams', {}, function(results, res) {
  })
    .done(function(results, res) {

      $.each(results,function(i,team){
      $('#StaffMembersTable >thead tr').append('<th> '+team.Team_Name+'</th>');
      });

    });
}



function insertStaff(member) {

  staffID = member._id;
  name = member.Full_Name;
  pin = member.Pin;
  teams = member.Teams;
          var table = document.getElementById("StaffMembersTableBody");



          var staffRow = table.insertRow(-1);
                staffRow.id = staffID;
          var teamsCellToggle = staffRow.insertCell(-1);
                teamsCellToggle.className = 'toggle-row';
                teamsCellToggle.id = staffID+'_toggle';
                teamsCellToggle.innerHTML = '<a  class="UpdateStaff" href="#" id="'+staffID+'"><i class="UpdateStaff fas fa-edit fa-1x"id="'+staffID+'"></i></a>';
          var activeCell = staffRow.insertCell(-1);
            if(member.Active_Staff_Member === true){
                activeCell.innerHTML = '<i class="far fa-check-square"></i>';
              } else {
                activeCell.innerHTML = '<i class="far fa-square"></i>';
              }
          var adminCell = staffRow.insertCell(-1);
            if(member.Super_Admin === true){
                adminCell.innerHTML = '<i class="far fa-check-square"></i>';
              } else {
                adminCell.innerHTML = '<i class="far fa-square"></i>';
              }
          var nameCell = staffRow.insertCell(-1);
                nameCell.innerHTML = name;
          var pinCellToggle = staffRow.insertCell(-1);
                pinCellToggle.innerHTML = '<a class="hidetext" id="'+staffID+'_Pin">'+pin+'</a>';



            $.each(teams,function(i,team){
              var teamsCell = staffRow.insertCell(-1);
                 if(team.pay === 'Hourly'){
                 teamsCell.innerHTML = '<i class="fas fa-money-bill-wave"></i>&ensp; £<b>' + team.rate + '</b>';
                 } else if(team.pay === 'Contracted'){
                   teamsCell.innerHTML = '<i class="fas fa-file-contract"></i>';
                 } else {
                    teamsCell.innerHTML = '<i class="fas fa-times"></i>';
                 }

              if(team.admin === true){
                if(teamsCell.innerHTML === '-'){
                teamsCell.innerHTML = '<i class="fas fa-user-cog"></i>';
                } else {
                  teamsCell.innerHTML = teamsCell.innerHTML + '&ensp;<i class="fas fa-user-cog"></i>';
                }
              }
         });





}


//DB CALLS=============================


//Post request to add Staff Member
function addStaff() {
  var selectedTeam = [];
  var payVal = '';
  var payRate = '';
$.each(teamInfo, function(i, team){
    payVal = $('input[name=inlineRadioOptions_'+team.Team_Name+']:checked').val();
    if(payVal === 'Hourly'){
      payRate = $('#rates_'+team.Team_Name).val();
    } else {
      payRate = 'NA';
    }
  selectedTeam[i] = {
    team: team.Team_Name,
    pay: payVal,
    rate: payRate,
    admin: $('#admin_'+team.Team_Name).prop('checked')
                  };
});
console.log(selectedTeam);

    var staffMember = {
      Created: moment(),
      Created_Date: moment().format('L'),
      Created_Time : moment().format('LT'),
      Full_Name: $('input#firstNameInput').val() + ' ' + $('input#lastNameInput').val(),
      Name: {
          First: $('input#firstNameInput').val(),
          Last : $('input#lastNameInput').val()
            },
      Pin : $('input#pinInput').val(),
      Super_Admin : $('input[id=superAdmin]').prop('checked'),
      Active_Staff_Member : $('input[id=activeStaff]').prop('checked'),
      Teams : selectedTeam,
      Access_Rights : [
        {Name :  'Visitors', Permission : $('input[id=Visitors]').prop('checked')},
        {Name :  'NonClimbingChild', Permission : $('input[id=NonClimbingChild]').prop('checked')},
        {Name :  'WBS', Permission : $('input[id=WBS]').prop('checked')},
        {Name :  'TheSession', Permission : $('input[id=TheSession]').prop('checked')},
        {Name :  'ThamesWater', Permission :  $('input[id=ThamesWater]').prop('checked')},
        {Name :  'Gardeners', Permission : $('input[id=Gardeners]').prop('checked')},
        {Name :  'PersonalTrainer', Permission : $('input[id=PersonalTrainer]').prop('checked')},
      ]
    };

  var myJSON = '';

console.log(staffMember);

if(staffID === ''){
console.log('new');
    $.ajax({
      type: "Post",
      url: "staff/addStaff",
      contentType: 'application/json',
      data: JSON.stringify(staffMember),
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

} else {
  console.log('staffID');
  staffMember.FindMe = staffID;
    $.ajax({
        type: 'put',
        data: JSON.stringify(staffMember),
        url: 'staff/updateAStaff',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response, results ) {
      console.log(results);

        // Check for successful (blank) response
        if (response.msg === 'success') {

        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }

    });

  }
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
  addHeaders();
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


      if ($(event.target).hasClass('UpdateStaff') === true){
        staffID = event.target.id;
console.log(staffID)
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
                    staffMember = results;
                    console.log(results);
                staffsTeams = results[0].Teams;
                $('#firstNameInput').val(results[0].Name.First);
                $('#lastNameInput').val(results[0].Name.Last);
                $('#pinInput').val(results[0].Pin);
                document.getElementById("superAdmin").checked = results[0].admin;

                var accessName = '';
                $.each(results[0].Access_Rights, function(i,area){
                  accessName = area.Name;
                  document.getElementById(accessName).checked = area.Permission;
                });


            $.getJSON( '/staff/getTeams', {}, function(results, res) {
              teamInfo = results;

              })
              .done(function(teamInfo, res) {
                    teamInfo = teamInfo;
                    $.each(teamInfo,function(i, team){
                        var checkNIT = '',
                            checkHourly = '',
                            checkContracted = '',
                            checkAdmin = '',
                            hourlyRate = '';
                        var theRate = '',
                            isSelected = '';

                      $.each(results[0].Teams,function(ii, staffTeam){

                        if(team.Team_Name === staffTeam.team){
                        theRate = staffTeam.rate;
                          if(staffTeam.pay === 'Not In Team'){
                             checkNIT = 'checked';
                          } else if(staffTeam.pay === 'Hourly'){
                             checkHourly = 'checked';
                          } else if(staffTeam.pay === 'Contracted'){
                             checkContracted = 'checked';
                          }
                          if(staffTeam.admin === true){
                            checkAdmin = 'checked';
                          }

                        }
                      });

                          theTeams +=   '<span><h5>'+team.Team_Name+':  &ensp; ('+team.Team_Manager+')</h5></span>';
                          theTeams += '<div class="input-group">';
                          theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                          theTeams +=   '  <input type="radio" class="custom-control-input" id="pay1_'+team.Team_Name+'" name="inlineRadioOptions_'+team.Team_Name+'" value="Not In Team" '+checkNIT+'>';
                          theTeams +=   '  <label class="custom-control-label" for="pay1_'+team.Team_Name+'">Not In Team</label>';
                          theTeams +=   '</div>';

                          theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                          theTeams +=   '  <input type="radio" class="custom-control-input" id="pay2_'+team.Team_Name+'" name="inlineRadioOptions_'+team.Team_Name+'" value="Hourly" '+checkHourly+'>';
                          theTeams +=   '  <label class="custom-control-label" for="pay2_'+team.Team_Name+'">Hourly</label>';
                          theTeams +=   '</div>';

                          theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                          theTeams +=   '  <input type="radio" class="custom-control-input" id="pay3_'+team.Team_Name+'" name="inlineRadioOptions_'+team.Team_Name+'" value="Contracted" '+checkContracted+'>';
                          theTeams +=   '  <label class="custom-control-label" for="pay3_'+team.Team_Name+'">Contracted &ensp; &ensp;</label>';
                          theTeams +=   '</div>';

                          theTeams +=   '<div class="custom-control custom-checkbox">';
                          theTeams +=   '  <input type="checkbox" class="custom-control-input" name="admin_'+team.Team_Name+'" id="admin_'+team.Team_Name+'" value="Admin" '+checkAdmin+'>';
                          theTeams +=   '  <label class="custom-control-label" for="admin_'+team.Team_Name+'"> Team Admin</label>';
                          theTeams +=   '</div>';
                          theTeams +=   '</div>';

                          theTeams +=   '<select class="custom-select custom-control-inline" id="rates_'+team.Team_Name+'" required>';
                          theTeams +=   '  <option disabled selected>Choose Hourly Rate</option>';

                                        $.each(team.Team_Rates, function(i,rate){

                                          if(rate === theRate){
                                            console.log('matched Rate');
                                                isSelected = 'selected';

                                          } else {
                                            console.log('unmatched Rate');
                                          isSelected = '';
                                          }
                                          if(rate === 'Not In Team' || rate === 'NA'){
                                          } else {
                                          rate = '£' + rate;
                                          }
                                            theTeams += '<option '+ isSelected+'>'+rate+'</option>';
                                        });
                          theTeams +=   '</select>';
                          theTeams +=   '<hr>';

                        });

                    $('#TeamList').html(theTeams);

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


                    theTeams +=   '<span><h5>'+results[i].Team_Name+':  &ensp; ('+results[i].Team_Manager+')</h5></span>';
                    theTeams += '<div class="input-group">';
                    theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                    theTeams +=   '  <input type="radio" class="custom-control-input" id="pay1_'+results[i].Team_Name+'" name="inlineRadioOptions_'+results[i].Team_Name+'" value="Not In Team" checked>';
                    theTeams +=   '  <label class="custom-control-label" for="pay1_'+results[i].Team_Name+'">Not In Team</label>';
                    theTeams +=   '</div>';

                    theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                    theTeams +=   '  <input type="radio" class="custom-control-input" id="pay2_'+results[i].Team_Name+'" name="inlineRadioOptions_'+results[i].Team_Name+'" value="Hourly">';
                    theTeams +=   '  <label class="custom-control-label" for="pay2_'+results[i].Team_Name+'">Hourly</label>';
                    theTeams +=   '</div>';

                    theTeams +=   '<div class="custom-control custom-radio custom-control-inline">';
                    theTeams +=   '  <input type="radio" class="custom-control-input" id="pay3_'+results[i].Team_Name+'" name="inlineRadioOptions_'+results[i].Team_Name+'" value="Contracted">';
                    theTeams +=   '  <label class="custom-control-label" for="pay3_'+results[i].Team_Name+'">Contracted &ensp; &ensp;</label>';
                    theTeams +=   '</div>';

                    theTeams +=   '<div class="custom-control custom-checkbox">';
                    theTeams +=   '  <input type="checkbox" class="custom-control-input" name="admin_'+results[i].Team_Name+'" id="admin_'+results[i].Team_Name+'" value="Admin">';
                    theTeams +=   '  <label class="custom-control-label" for="admin_'+results[i].Team_Name+'"> Team Admin</label>';
                    theTeams +=   '</div>';
                    theTeams +=   '</div>';

                    theTeams +=   '<select class="custom-select custom-control-inline" id="rates_'+results[i].Team_Name+'" required>';
                    theTeams +=   '  <option disabled selected>Choose Hourly Rate</option>';
                                            $.each(team.Team_Rates, function(i,rate){
                                                theTeams += '<option>'+rate+'</option>';
                                            });
                    theTeams +=   '</select>';
                    theTeams +=   '<hr>';




                  });

                  $('#TeamList').html(theTeams);

                  $.each(staffsTeams, function(i, team){
                      document.getElementById('rates_'+team.team).selectedIndex = team.rate;
                  });


            });


    }


});
