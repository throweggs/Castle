var teamsNRates = [],
    aStaff = [],
    theData = [];
  //functions ------------
  function showTheTeamPage(){
        // jQuery AJAX call for JSON
        $.getJSON( '/staff/getTeams', function( results, res ) {

          })
          .done(function(results, res) {
              teamsNRates = results;
              $.get('viewTeams').then(function(html) {
                  var theList = document.getElementById('mainPage');
                  theList.id = 'mainPage';
                  theList.innerHTML = html;

                })
                  .done(function(results, res) {
                    insertTeams();

                  });
          });
  }





function insertTeams(){
    var table = document.getElementById("TeamsTableBody");
      var teamsRow = '';

      $.each(teamsNRates, function(i, team){

                teamsRow = table.insertRow(-1);
                teamsRow.id = team._id;
          var ratesToggle = teamsRow.insertCell(0);
                ratesToggle.className = 'toggle-row';
                ratesToggle.id = team._id+'_toggle';
                ratesToggle.innerHTML = '<a href="#" class="fas fa-edit toggle-row" id="'+team._id+'"></i>';
          var teamCell = teamsRow.insertCell(1);
                teamCell.innerHTML = team.Team_Name;
          var mangerCell = teamsRow.insertCell(2);
                mangerCell.innerHTML = team.Team_Manager;
          var ratesCell = teamsRow.insertCell(3);
          var theText = '';
          var theRate = team.Team_Rates;
          $.each(theRate, function(i, rate){
            if (i === 0){
              theText = '£';
            } else if (i < theRate.length-1){
              theText = theText + rate + ', £';
            } else {
              theText = theText + rate;
            }
          });
                ratesCell.innerHTML = theText;
      });



}



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





//DB CALLS  =============================================






//Post request to add Staff Member
function addTeam() {
var rates = ['Not In Team'];

      var theRates = $('input#payRates').val();
      var match = theRates.split(',');
      for (var a in match)
      {
          var rate = match[a].replace('£', '');
              rate = $.trim(rate);

            if(rate.length === 0){
              //blank
            } else if(rate.length > 0){
            rates.push(rate);
            }

      }




    var newTeam = {
      'Created_Date': moment().format('MMMM Do YYYY'),
      'Created_Time' : moment().format('HH:MM:SS'),
      'Team_Name' : $('input#teamName').val(),
      'Team_Manager' : $('input#managerName').val(),
      // 'Team_Staff' : $('input#managerName').val(),

      'Team_Rates' : rates,
    };

  var myJSON = JSON.stringify(newTeam);




    $.ajax({
        type: 'POST',
        data: myJSON,
        url: 'staff/addTeam',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response, results ) {
      console.log(response);
      // Check for successful (blank) response
        if (response.msg === '') {

        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }

    });
}


//DOM WATCH  =============================================

$(document).mouseover(function() {
  //Show Pin
  if(event.target.className === 'hidetext'){
      var theID = event.target.id;
      document.getElementById(theID).classList.remove("hidetext");
      document.getElementById(theID).classList.add("showtext");
  }

});

$(document).mouseout(function() {
  //Hide Pin
  if(event.target.className === 'showtext'){
      var theID = event.target.id;
      document.getElementById(theID).classList.remove("showtext");
      document.getElementById(theID).classList.add("hidetext");
  }




});

$(document).on('click',function() {
//Show teams
//   if(event.target.className === 'fas fa-edit toggle-row'){
//     var theID = '#'+event.target.id+'_team';
//     $(theID).toggle();
// }



});

$(document).ready(function() {



});
