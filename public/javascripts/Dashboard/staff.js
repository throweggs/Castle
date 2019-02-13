// var tableContent = '',
// table = '',

var teamsNRates = [],
    aStaff = [],
    theData = [];


  function showTheStaffPage(){
        getTeamsAndRates();

      $.get('viewStaff').then(function(html) {
        var theList = document.getElementById('mainPage');
        theList.id = 'mainPage';
        theList.innerHTML = html;

      })
        .done(function(results, res) {
          getStaffMembers();

        });
  }



function insertStaff(i,created,name,pin,teams) {
          var table = document.getElementById("StaffMembersTableBody");

          var staffRow = table.insertRow(-1);
                staffRow.id = staffID;
          var teamsCellToggle = staffRow.insertCell(0);
                teamsCellToggle.className = 'toggle-row';
                teamsCellToggle.id = staffID+'_toggle';
                teamsCellToggle.innerHTML = '<a href="#" onClick="toggleShow('+staffID+');" class="fas fa-edit toggle-row" id="'+staffID+'"></i>';
          var nameCell = staffRow.insertCell(1);
                nameCell.innerHTML = name;
          var pinCellToggle = staffRow.insertCell(2);
                pinCellToggle.innerHTML = '<a class="hidetext" id="'+staffID+'_Pin">'+pin+'</a>';

          var createdCell = staffRow.insertCell(3);
                createdCell.innerHTML = created;




          var teamsRow = table.insertRow(-1);
              teamsRow.id = staffID+'_team';
              teamsRow.style = 'display:none;';
              teamsRow.className = 'toggle';

          var blankCell = teamsRow.insertCell(0);
          var teamCell = teamsRow.insertCell(1);

          var buttonCell = teamsRow.insertCell(2);
              buttonCell.innerHTML = '<button type="button" id= '+staffID+' class="updateStaffMember btn btn-primary">Update Teams</button>';

              teamCell.id = 'teamRates';

          var theChoice = '';

              teamsNRates.forEach(function(teamNRate){

                  theChoice +=   '<div class="input-group mb-3">';
                  theChoice +=     '<div class="input-group-prepend">';
                  theChoice +=         '<label class="input-group-text selectedTeamRates" for="'+staffID + '_' + teamNRate.teamName+'">'+teamNRate.Team_Name+'</label>';
                  theChoice +=     '</div>';
                  theChoice +=     '<select class="custom-select selectedTeamRates" id="'+staffID + '_' + teamNRate.Team_Name+'">';

                  var rates = teamNRate.Team_Rates;
                  var selectedRate = 0;

                  teams.forEach(function(team){
                        if (team.team == teamNRate.Team_Name){
                          selectedRate = team.rate;
                          console.log(selectedRate);
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
                  theChoice +=  '</div>';

              });





            // });
  teamCell.innerHTML = theChoice;



}








//DB CALLS=============================


//Post request to add Staff Member
function addStaff() {

    var newStaffMember = {
      'Created_Date': moment().format('MMMM Do YYYY'),
      'Created_Time' : moment().format('HH:MM:SS'),
      'First_Name' : $('input#firstName').val(),
      'Last_Name' : $('input#lastName').val(),
      'Pin' : $('input#pin').val(),
      'Teams' : [],
    };

  var myJSON = JSON.stringify(newStaffMember);




    $.ajax({
        type: 'POST',
        data: myJSON,
        url: 'staff/addStaff',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response, results ) {
      console.log(response);
        location.reload();
        // Check for successful (blank) response
        if (response.msg === '') {

        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }

    });
}

function toggleShow(theID){

    theID = '#'+theID+'_team';
    console.log(theID);
    $(theID).toggle();

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
function updateAStaff(staffID, teamsArray){
      console.log('UPDATE: ' + moment().format('MMMM Do YYYY'));


      $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
        })
        .done(function(results, res) {
              var theResults = JSON.stringify(results);
console.log(results);
              results[0].FindMe = {_id: staffID};
              results[0].Teams = teamsArray;
console.log(results);
                $.ajax({
                  type: "put",
                  url: "staff/updateAStaff",
                  contentType: 'application/json',
                  data: JSON.stringify(results[0])
                });

            showThePage();
          });


  }

//Get Staff Members Files
function getStaffMembers() {


    // jQuery AJAX call for JSON
    $.getJSON( '/staff/getStaff', function( data ) {
theData = data;

    $.each(data, function(i, member){
      console.log(member);
        staffID = member._id;
        created = member.Created_Date + ' ' + member.Created_Time;
        name = member.First_Name + ' ' + member.Last_Name;
        pin = member.Pin;
        teams = member.Teams;

        insertStaff(i,created,name,pin,teams);

    });
  });
}

//Get teams and Rates DB files
function getTeamsAndRates() {

    // jQuery AJAX call for JSON
    $.getJSON( '/staff/getTeams', function( results, res ) {

    })
      .done(function(results, res) {
          teamsNRates = results;

      });

}

//DOM watch==============================

//DOM ready
$(document).ready(function() {

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


//Update Staff Member
if(event.target.className === 'updateStaffMember btn btn-primary'){

  var staffID = event.target.id;
  var staffid = '#'+event.target.id;


  var teamsArray = [];
  $.each(teamsNRates, function(i, teamNRates){
  teamsArray[i] = {"team" : teamNRates.Team_Name, 'rate' : $(staffid+'_'+teamNRates.Team_Name+' option:selected').val()};

  });

  updateAStaff(staffID,teamsArray);
}


});
