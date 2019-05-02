var teamsNRates = [],
    aStaff = [],
    theData = [];

var options = [ 'Team', 'Manager', 'Rate'];
  //functions ------------
  function showTheTeamPage(searchText){

    var theSearch = {};
    if(searchChoice === 'Team'){
      theSearch = {Team_Name: {  $regex: searchText, $options: 'i' }};
    } else if(searchChoice === 'Manager'){
      theSearch = {Team_Manager: { $regex: searchText, $options: 'i' }};
    } else if(searchChoice === 'Rate'){
      theSearch = { Team_Rates : { $regex: searchText, $options: 'i' } };
    }

      var findIt =  theSearch;
        // jQuery AJAX call for JSON
        $.getJSON( '/staff/getTeams',findIt, function( results, res ) {

          })
          .done(function(results, res) {
              teamsNRates = results;
            insertTeams();

          });
  }






function insertTeams(){
    var table = document.getElementById("TeamsTableBody");
    $(table).empty();
      var teamsRow = '';

      $.each(teamsNRates, function(i, team){

                teamsRow = table.insertRow(-1);
                teamsRow.id = team._id;
          var ratesToggle = teamsRow.insertCell(0);
                ratesToggle.className = 'toggle-row';
                ratesToggle.id = team._id+'_toggle';
                ratesToggle.innerHTML = '<a  class="UpdateTeam far fa-edit" href="#" id="'+team._id+'"><i class="UpdateTeam far fa-edit"></i></a>';
          var teamCell = teamsRow.insertCell(1);
                teamCell.innerHTML = team.Team_Name;
          var mangerCell = teamsRow.insertCell(2);
                mangerCell.innerHTML = team.Team_Manager;
          var ratesCell = teamsRow.insertCell(3);
          var theText = '';
          var theRate = team.Team_Rates;
          $.each(theRate, function(i, rate){
            if (i < theRate.length-1){
              theText = theText +'£' + rate + ',  ';
            } else {
              theText = theText + '£' +rate;
            }
          });
                ratesCell.innerHTML = theText;
      });

}




//DB CALLS  =============================================

function removeTeam(){
alert('this function is to be finished');
}


//Post request to add Staff Member
function addTeam() {

  $.getJSON( '/staff/getATeam', {_id: $('#teamID').text() }, function(results, res) {
    })
    .done(function(results, res) {
      if(results.length === 0){

            var rates = [];

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
                  Created_Date: moment().format('MMMM Do YYYY'),
                  Created_Time : moment().format('HH:MM:SS'),
                  Team_Name : $('input#teamName').val(),
                  Team_ID:  $('input#teamName').val().replace(/\s/g,''),
                  Team_Manager : $('input#managerName').val(),
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
                      location.reload();
                    }
                    else {
                        // If something goes wrong, alert the error message that our service returned
                        alert('Error: ' + response.msg);
                    }

                });
        } else {
          var rates =[];
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
        FindMe: $('#teamID').text(),
        created: moment(),
        Team_Name : $('input#teamName').val(),
        Team_ID:  $('input#teamName').val().replace(/\s/g,''),
        Team_Manager : $('input#managerName').val(),
        // 'Team_Staff' : $('input#managerName').val(),

        Team_Rates : rates,
      };

    var myJSON = JSON.stringify(newTeam);




      $.ajax({
          type: 'PUT',
          data: myJSON,
          url: 'staff/updateATeam',
          dataType: 'JSON',
          contentType: 'application/json',
      }).done(function( response, results ) {
        console.log(results);
        // Check for successful (blank) response
          if (results === 'success') {
            location.reload();
          }
          else {
              // If something goes wrong, alert the error message that our service returned
              alert('Error: ' + response);
          }

      });
        }
});
}







//DOM WATCH  =============================================

$(document).on('keyup',function (e){
  if(e.target.id === 'searchText'){
    searchText = e.target.value;
    showTheTeamPage(searchText);
  }
});


$(document).on('click',function() {
//Show teams


      if ($(event.target).hasClass('UpdateTeam') === true){
        teamID = event.target.id;
          $.getJSON( '/staff/getATeam', {_id: teamID }, function(results, res) {
          })
          .done(function(info, res){
            console.log(info);
            console.log(res);
              $('#addTeamModal').modal('show');
              $('#deleteTeam').modal('show');
              $('#teamID').text(teamID);
              $('#addTimeModalLongTitle').text('Update Team');
              $('input#teamName').val(info[0].Team_Name);
              $('input#managerName').val(info[0].Team_Manager);
              $('input#payRates').val(info[0].Team_Rates);
          });
      }
});


$(document).ready(function() {
  showTheTeamPage();
  var select = document.getElementById('searchOptions');
  $.each(options,function(i, option){
      var opt = document.createElement('option');
      opt.value = option;
      opt.innerHTML = option;
      select.appendChild(opt);
  });

});
