// var tableContent = '',
// table = '',

var teamsNRates = [],
    allStaff = [],
    aStaff = [],
    theData = [],
    teamsList = '';
    staffList = '';



function getTeams(){
    $.each(teamsNRates, function(i, team){
      console.log(team);
      var teamID = team.Team_Name;
      teamsList += '<a class="teams list-group-item list-group-item-action" id="'+teamID+'" onClick="getNames('+i+', '+team.Team_Name+');" data-toggle="list" href="#" role="tab" aria-controls="'+team.Team_Name+'">'+team.Team_Name+'</a>';
    });
    teamsList += '</div>';
      $('#ListTeams').html(teamsList);


}

function getNames(i, theTeamName){
  var theStaff = teamsNRates[i].Team_Staff;

  $.each(theStaff, function(i, staff){
    var staffID = staff._id;
    var staffName = staff.Staff_Name;
    staffList += '<a class="staff list-group-item list-group-item-action" id="'+staffID+'" data-toggle="list" href="#" role="tab" aria-controls="'+staff.Staff_Name+'">'+staff.Staff_Name+'</a>';

  });
  staffList += '</div>';

  $('#ListStaff').html(staffList);


}


function addMe(staffName){

}







//DB CALLS=============================

function  clockIn(direction,staffID,teamID) {
var newClockIn = '';

if(direction === 'ClockIn'){
   newClockIn = {
    'Check_In' : moment().format('HH:MM:SS'),
    'Date' : moment().format('MMMM Do YYYY'),
    'Check_Out': '',
      'Staff_Id' : staffID,
    'Team_Name' : teamID,
  };
  } else if(direction === 'ClockOut'){

    $.getJSON( '/staff/getClockIn', {_id: clockInId }, function(results, res) {
      })
      .done(function(results, res) {
            var theResults = JSON.stringify(results);

            newClockIn = {

             'Check_In': results.Check_In,
             'Date': results.Date,
             'Check_Out': moment().format('MMMM Do YYYY'),
             'Staff_Id' : results.Staff_Id,
             'Team_Name' : results.Last_Name,
           };

        return results;
        });


  }


var myJSON = JSON.stringify(newClockIn);




  $.ajax({
      type: 'POST',
      data: myJSON,
      url: 'staff/addClockIn',
      dataType: 'JSON',
      contentType: 'application/json',
  }).done(function( response, results ) {
    console.log(response);

  var theClockInID = response.msg._id;

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
        // Clock for successful (blank) response
        if (response.msg === '') {

        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }

    });
}

// function toggleShow(theID){
//
//     theID = '#'+theID+'_team';
//     console.log(theID);
//     $(theID).toggle();
//
// }

//Get request for session
function getAStaff(staffID){

  $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
    })
    .done(function(results, res) {
          var theResults = JSON.stringify(results);
            if (theResults === '[]') {

          } else {

          }

      return results;
      });


  }

//Put request to update to Participants, on  pre made sesion
function updateAStaff(theID,theteam){
      console.log('UPDATE: ' + moment().format('MMMM Do YYYY'));


      $.getJSON( '/staff/getAStaff', {_id: theID }, function(results, res) {
        })
        .done(function(results, res) {
              var theResults = JSON.stringify(results);
console.log(results);
              results[0].FindMe = {_id: theID};
              results[0].ClockIns = {'team': theteam, 'time' : moment().format('HH mm ss')};
console.log(results);
                $.ajax({
                  type: "put",
                  url: "staff/updateAStaff",
                  contentType: 'application/json',
                  data: JSON.stringify(results[0])
                });


          });


  }

//Get Staff Members Files
function getStaffMembers() {


    // jQuery AJAX call for JSON
    $.getJSON( '/staff/getStaff', function( data ) {

    })
    .done(function(results, res) {
      theStaff = results;

    });

}

//DB CALLS  =============================================
function getTeamsAndRates() {

    // jQuery AJAX call for JSON
    $.getJSON( '/staff/getTeams', function( results, res ) {

    })
      .done(function(results, res) {
          teamsNRates = results;
            getTeams();
            getStaffMembers();

      });

}

// $('#Department-list-tab').on('click', function (e) {
//   e.preventDefault();
//   $(this).tab('show');
//   console.log(this);
// });

//DOM watch==============================



//DOM ready
$(document).ready(function() {

  var interval = setInterval(function() {
        var momentNow = moment();
        $('#date-part').html(momentNow.format('YYYY MMMM DD') + ' '  + momentNow.format('dddd').substring(0,3).toUpperCase());
        $('#time-part').html(momentNow.format('A hh:mm:ss'));
    }, 1000);
getStaffMembers();
getTeamsAndRates();
getTeams();



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

console.log(event.target.className);
});


  $( document ).ready(function() {





    $(":input[type='password']").keyup(function(event){
        if ($(this).next('[type="password"]').length > 0){
            $(this).next('[type="password"]')[0].focus();
        }else{
            if ($(this).parent().next().find('[type="password"]').length > 0){
                $(this).parent().next().find('[type="password"]')[0].focus();
            }
        }
    });

    $('#PinModal').on('shown.bs.modal', function (e) {
      var direction = e.relatedTarget.classList[0];
      var item = document.getElementsByClassName("list-group-item active");
      var staffID = item[1].id;
      var teamID = item[0].id;

              $.each(theStaff, function(i, staff){
                if(staff._id == staffID){
                  thePin = staff.Pin;

                }
              });

        $("#firstdigit").focus();
        $('button#clockIn').on('click', function(){

        var typedPin = $("#firstdigit").val();
            typedPin += $("#seconddigit").val();
            typedPin += $("#thirddigit").val();
            typedPin += $("#fourthdigit").val();

if(typedPin === thePin){

 clockIn(direction,staffID,teamID);

} else {

    $('.log-status').addClass('wrong-entry');
     $('.alert').fadeIn(500);

  $('#firstdigit').on('focus',function(){
      $('#firstdigit').removeClass('wrong-entry');
      $('#firstdigit').val('');
      $('#seconddigit').removeClass('wrong-entry');
      $('#seconddigit').val('');
      $('#thirddigit').removeClass('wrong-entry');
      $('#thirddigit').val('');
      $('#fourthdigit').removeClass('wrong-entry');
      $('#fourthdigit').val('');

  });



}

        });
    });
});
