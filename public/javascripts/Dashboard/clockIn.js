// var tableContent = '',
// table = '',

var teamsNRates = [],
    allStaff = [],
    aStaff = [],
    theData = [],
    teamsList = '',
    teamList = '',
    theTeamMembers = [],
    passInfo = '';

//GET TEAMS LIST
function getTeams(){
      $('#ListTeams').html('<img src="/loading.gif" alt="loading" height="42" width="42">');
    $.each(teamsNRates, function(i, team){
      // console.log(team);
      var teamName = team.Team_Name;


      teamsList += '<a class="teams list-group-item list-group-item-orange list-group-item-orange-action" id="'+teamName+'" onClick="getNames('+i+');" data-toggle="list" href="#" role="tab" aria-controls="'+teamName+'">'+teamName+'</a>';
    });
    teamsList += '</div>';
      $('#ListTeams').html(teamsList);


}

//GET NAMES LIST
function getNames(i){
    $('#ListStaff').html('<img src="/loading.gif" alt="loading" height="42" width="42">');
var theStaff = [],
    staffList = '',
    presence = '',
    colour = '';
    // $('#ListStaff').html('<img src="/loading.gif" alt="loading" height="42" width="42">');

      getTeamName = teamsNRates[i].FindMe;
      console.log(getTeamName);

          $.getJSON( '/staff/findStaffInTeam', {
                                                Teams: {$elemMatch: {
                                                                    team: getTeamName,
                                                                     pay: {$ne: "Not In Team" }
                                                                   }
                                                        }
                                                }, function(results, res) {
            })
            .done(function(results, res) {
              theStaff = results;
              console.log(theStaff);

              $.each(theStaff, function(i, staff){

                var theTeams = staff.Teams;

                console.log(staff);
                    if (staff.Present === true){
                      presence = ' <i class="fas fa-sign-in-alt"></i>';
                      colour = ' list-group-item-success';
                  } else if (staff.Present === false){
                      presence = ' <i class="fas fa-sign-out-alt"></i>';
                      colour = ' list-group-item-danger';
                    }


                var staffID = staff._id;

                var staffName = staff.Full_Name;

                staffList += '<a class="staff list-group-item list-group-item-orange-action '+colour+'" id="'+staffID+'" data-toggle="list" href="#" role="tab" aria-controls="'+staff+'">'+presence+'&nbsp  '+staffName+'</a>';

              });
              staffList += '</div>';

              $('#ListStaff').html(staffList);
          });


}

//CLOCK IN AND OUT
function  clockIn(direction,staffID,teamID) {
      $('#ListStaff').html('<img src="/loading.gif" alt="loading" height="42" width="42">');
      $('#ListTeam').html('<img src="/loading.gif" alt="loading" height="42" width="42">');
var newClockIn = '';

if(direction === 'ClockIn'){
   newClockIn = {
    'Clocked_In' : moment().format('LT'),
    'Date' : moment().format('L'),
    'Staff_Id' : staffID,
    'Team_Name' : teamID,

  };
    console.log(direction);
  var myJSON = JSON.stringify(newClockIn);

    $.ajax({
        type: 'POST',
        data: myJSON,
        url: 'staff/addClockIn',
        dataType: 'JSON',
        contentType: 'application/json',
      }).done(function( response, results ) {
        console.log(response);

          // Check for successful (blank) response
          if (response.msg === '') {
            // var objID = { _id : 'ObjectId('+staffID+')'};

            $.getJSON( '/staff/StaffPresent',{ _id: staffID } , function(results, res) {
              })
              .done(function(results, res) {
              });


          location.reload();
          }
          else {
              // If something goes wrong, alert the error message that our service returned
              alert('Error: ' + response.msg);
          }

      });


  } else if(direction === 'ClockOut'){
    $('#ListStaff').html('<img src="/loading.gif" alt="loading" height="42" width="42">');
    $('#ListTeam').html('<img src="/loading.gif" alt="loading" height="42" width="42">');

          console.log('UPDATE: ' + moment().format('L'));

                var newClockOut  = [{Staff_Id : staffID},
                                    {Clocked_Out: moment().format('LT')}];


    console.log(newClockOut);
                    $.ajax({
                      type: "put",
                      url: "staff/ClockOut",
                      contentType: 'application/json',
                      data: JSON.stringify(newClockOut)
                    }).done(function( response, results ) {
                      console.log(response);
                      console.log(results);
                        // Check for successful (blank) response
                        if (results === 'success') {
                          // var objID = { _id : 'ObjectId('+staffID+')'};

                          $.getJSON( '/staff/StaffNotPresent',{ _id: staffID } , function(results, res) {
                            })
                            .done(function(results, res) {
                            });


                        location.reload();
                        }
                        else {
                            // If something goes wrong, alert the error message that our service returned
                            alert('Error: ' + response.msg);
                        }

                    });
}

}


//Get request for Staff
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

//Put request to update a Staff
function updateAStaff(theID,theteam){
      console.log('UPDATE: ' + moment().format('L'));


      $.getJSON( '/staff/getAStaff', {_id: theID }, function(results, res) {
        })
        .done(function(results, res) {
              var theResults = JSON.stringify(results);

              results[0].FindMe = {_id: theID};
              results[0].ClockIns = {'team': theteam, 'time' : moment().format('LT')};

                $.ajax({
                  type: "put",
                  url: "staff/updateAStaff",
                  contentType: 'application/json',
                  data: JSON.stringify(results[0])
                });


          });


  }

//DB CALLS  =============================================
function getTeamsAndRates() {

    // jQuery AJAX call for JSON
    $.getJSON( '/staff/getTeams', function( results, res ) {

    })
      .done(function(results, res) {
        teamsNRates = results;
        console.log('teamsNRates');
        console.log(teamsNRates);
        getTeams();

      });

}



//DOM watch==============================


//DOM ready
$(document).ready(function() {

  var interval = setInterval(function() {
        var momentNow = moment();
        $('#date-part').html(momentNow.format('YYYY MMMM DD') + ' '  + momentNow.format('dddd').substring(0,3).toUpperCase());
        $('#time-part').html(momentNow.format('A hh:mm:ss'));
    }, 1000);

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

  if ($(event.target).hasClass('staff') === true){
if ($(event.target).hasClass('list-group-item-success') === true){
document.getElementById("ClockOut").disabled = false;
document.getElementById("ClockIn").disabled = true;
}
if ($(event.target).hasClass('list-group-item-primary') === true){
document.getElementById("ClockOut").disabled = true;
document.getElementById("ClockIn").disabled = false;
}
  }


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
      var thePin = '';

      $.getJSON( '/staff/getAStaff', {_id: staffID }, function(results, res) {
        })
        .done(function(results, res) {

          thePin = results[0].Pin;
          console.log(thePin);

          });


        $("#firstdigit").focus();
        $('button#clockIn').on('click', function(){

        var typedPin = $("#firstdigit").val();
            typedPin += $("#seconddigit").val();
            typedPin += $("#thirddigit").val();
            typedPin += $("#fourthdigit").val();

if(typedPin === thePin){
  $('button#clockIn').hide().after('<img src="/loading.gif" />');
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
