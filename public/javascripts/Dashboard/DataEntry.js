var garden = [],
    visitor = [],
    session = [],
    gardenChoice = '',
    facilitatorChoice = '',
    startLocation = '',
    wbsFacilitatorChoice = '',
    wbsStartLocation = '';

$(document).ready(function() {
//WATCH THE GARDEN VOL CHANGE
  $('input#VolunteerChoice').on('change',function(){
    if ($('input#VolunteerChoice').is(":checked")){
      gardenChoice = $('input#VolunteerChoice').val();

    }
  });

  $('input#miniPlotsChoice').on('change',function(){
    if ($('input#miniPlotsChoice').is(":checked")){
      gardenChoice = $('input#miniPlotsChoice').val();

    }
  });
//===========THE SESSIONS==========//
  //Sets Bouldering Options
  $('input#BoulderingSession').on('change',function(){
    if ($('input#BoulderingSession').is(":checked")){
      facilitatorChoice = 'bouldering';
      $('#startOptionsBouldering').show();
        $('#startOptionsRopes').hide();
    }
  });

  //Sets Top Rope Options
  $('input#TopRopeSession').on('change',function(){
    if ($('input#TopRopeSession').is(":checked")){
      facilitatorChoice = 'top roping';
      $('#startOptionsRopes').show();
        $('#startOptionsBouldering').hide();
    }
  });

  //Sets Top Rope Options
  $('select#startOptionsRopes').on('change',function(){
          startLocation = $('#startOptionsRopes').val();
    });

    //Sets Boulder Options
    $('select#startOptionsBouldering').on('change',function(){
            startLocation = $('#startOptionsBouldering').val();
   });

//========== WBS ==========//

//Sets Bouldering Options
$('input#WBSBoulderingSession').on('change',function(){
  if ($('input#WBSBoulderingSession').is(":checked")){
    wbsFacilitatorChoice = 'bouldering';
    $('#WBSstartOptionsBouldering').show();
      $('#WBSstartOptionsRopes').hide();
  }
});

//Sets Top Rope Options
$('input#WBSTopRopeSession').on('change',function(){
  if ($('input#WBSTopRopeSession').is(":checked")){
    wbsFacilitatorChoice = 'top roping';
    $('#WBSstartOptionsRopes').show();
      $('#WBSstartOptionsBouldering').hide();
  }
});

//Sets Top Rope Options
$('select#WBSstartOptionsRopes').on('change',function(){
        wbsStartLocation = $('#WBSstartOptionsRopes').val();
  });

  //Sets Boulder Options
  $('select#WBSstartOptionsBouldering').on('change',function(){
          wbsStartLocation = $('#WBSstartOptionsBouldering').val();
 });
});

$(document).click(function() {

  //TOGGLE FORMS =================//

    if(event.target.id === 'butVisitors'){
      $("#visitorForm").toggle();
    }

    if(event.target.id === 'butnonClimbingChild'){
      $("#nonClimbingChild").toggle();
    }

    if(event.target.id === 'butGardenVolunteer'){
      $("#gardenVolunteer").toggle();
    }

    if(event.target.id === 'butTheSession'){
      $("#theSession").toggle();
    }

    if(event.target.id === 'butWBS'){
      $("#WBS").toggle();
    }


//WATCH SUBMITS FOR EACH FORM ==============//
    //=====Visitor ======= //
    if(event.target.id === 'addVisitor'){
      submitVisitor();
    }

    //=====Child Supoervior ======= //
    if(event.target.id === 'addSupervisor'){
      submitSupervisor();
    }

    //=====Garden Volunteer ======= //
    if(event.target.id === 'addGardeneer'){
      submitSupervisor();
    }

    //=====The Session ======= //
    if(event.target.id === 'addTheSession'){
      submitTheSession();
    }


    //=====WBS ======= //
    if(event.target.id === 'addWBS'){
      submitWBS();
    }
});




//=====Visitor ======= //
//Visitor Date Picker
$(function() {
  $('input#visitorTime').daterangepicker({

    locale: {
      format: 'M/DD/YY hh:mm A'
    },
    singleDatePicker: true,
    timePicker: true,
    timePickerSeconds: false,
    showDropdowns: true,
    minYear: 2017,
    maxYear: 2020,
    }, function(start, end, label) {
      visitor[0] = start;

    var years = moment().diff(start, 'years');

  });
});
//Submit Visitor
function submitVisitor(){
if($('#firstName').val().length + $('#lastName').val().length >=2 ){
  if( $('#NewReason').val().length >1) {

    var visitor = {
                        fullName : $('#firstName').val() + ' ' + $('#lastName').val(),
                        firstName : $('#firstName').val(),
                        lastName : $('#lastName').val(),
                        reasonForVisit : $('#NewReason').val(),
                        otherReason : $('#otherReason').val(),
                        ChildNames : [
                                      {name : $('#child1').val()},
                                      {name : $('#child2').val()}
                                    ],
                        PhotographyWaverAgreement : $('#photoWaiver').val(),

                        created : $('#visitorTime').val(),
                        iPad : 'RetroDataEntry'
    };

    console.log(visitor);
    visitor = JSON.stringify(visitor);
    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: visitor,
        url: '/visitor/addVisitor',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

            // Clear the form inputs
            if(checksOut === true){
            resetPage();
            // $('#addVisitor input').val('');
            }
        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });

  }
}



}


//=====Child Supoervior ======= //
//Child Supervisor Date Picker
$(function() {
  $('input#nonClimbingChildDate').daterangepicker({

    locale: {
      format: 'M/DD/YY hh:mm A'
    },
    singleDatePicker: true,
    timePicker: true,
    timePickerSeconds: false,
    showDropdowns: true,
    minYear: 2017,
    maxYear: 2020,
    }, function(start, end, label) {
      visitor[0] = start;

    var years = moment().diff(start, 'years');

  });
});
//  Submit Child Suoervisor
function submitSupervisor() {
  if($('#childName').val().length >1 ){
    if( $('#designatedAdult').val().length >1) {
      console.log('HIt');




    // If it is, compile all user info into one object
    var newSupervisor = {
        'childName': $('#childName').val(),
        'designatedAdult': $('#designatedAdult').val(),
        'iPad' : 'RetroDataEntry',
        'createdDate': $('#nonClimbingChildDate').val(),

    };
    console.log(newSupervisor);

var myJSON = JSON.stringify(newSupervisor);
  console.log(myJSON);


    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: myJSON,
        url: '/childSupervisor/addSupervisor',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

            // Clear the form inputs
          resetPage();

            // // Update the table
            // populateTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });
  }
  }
}


//=====Garden Volunteer ======= //
//Garden Date Picker Start
$(function() {
  $('input#gardenRangeStart').daterangepicker({

    locale: {
      format: 'M/DD/YY hh:mm A'
    },
    singleDatePicker: true,
    timePicker: true,
    showDropdowns: true,
    minYear: 2017,
    maxYear: 2020,
    }, function(start, end, label) {
        garden[0] = start;
        $('#gardenRangeEnd').data('daterangepicker').setStartDate(start);
    var years = moment().diff(start, 'years');

  });
});

//Garden Date Picker End
$(function() {
  $('input#gardenRangeEnd').daterangepicker({
    startDate: $('input#gardenRangeStart').val(),
    locale: {
      format: 'M/DD/YY hh:mm A'
    },
    singleDatePicker: true,
    timePicker: true,
    timePickerSeconds: false,
    showDropdowns: true,
    minYear: 2017,
    maxYear: 2020,
    }, function(start, end, label) {
      garden[1] = start;

    var years = moment().diff(start, 'years');

  });
});

//Submit Supervisor
function submitSupervisor() {

  var newPerson = {
    'createdDate': moment($('#gardenRangeStart').val()).format('DD/MM/YYYY'),
    'Person' : $('#person').val(),
    'Reason' : gardenChoice,
    'ArrivalTime' : moment($('#gardenRangeStart').val()).format('hh:mm:ss'),
    'DepartureTime' :moment($('#gardenRangeEnd').val()).format('hh:mm:ss'),
    'iPadIn' : 'RetroDataEntry',
  };

var myJSON = JSON.stringify(newPerson);
console.log(newPerson);


  // Use AJAX to post the object to our adduser service
  $.ajax({
      type: 'POST',
      data: myJSON,
      url: 'gardenVolunteer/addPerson',
      dataType: 'JSON',
      contentType: 'application/json',
  }).done(function( response, results ) {
    console.log(response);

      // location.reload(forcedReload);
      // Check for successful (blank) response
      if (response.msg === '') {
          resetPage();
      }
      else {
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
      }

  });
}


//=====The Session ======= //
//The Session Date Picker
$(function() {
  $('input#theSessionDate').daterangepicker({

    locale: {
      format: 'M/DD/YY hh:mm A'
    },
    singleDatePicker: true,
    timePicker: true,
    timePickerSeconds: false,
    showDropdowns: true,
    minYear: 2017,
    maxYear: 2020,
    }, function(start, end, label) {
      session[0] = start;

    var years = moment().diff(start, 'years');

  });
});

//Post request to create the session
function submitTheSession() {

    var newSession = {
        'Created_Date': moment($('#theSessionDate').val()).format('DD/MM/YYYY'),
        'created': moment().format(),
        'Facilitator': toTitleCase($('#facilitator').val()),
        'Session_Type': facilitatorChoice,
        'Start_Location': startLocation,
        'Participants': [
                {First_Name : $('#NewParticipantFirstName').val(), Last_Name : $('#NewParticipantLastName').val(), Reason : $('#NewReason0 option:selected').val(),First_Time : $('#NewFirstTime option:selected').val() },
                {First_Name : $('#NewParticipantFirstName1').val(), Last_Name : $('#NewParticipantLastName1').val(), Reason : $('#NewReason1 option:selected').val(),First_Time : $('#NewFirstTime1 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName2').val(), Last_Name : $('#NewParticipantLastName2').val(), Reason : $('#NewReason2 option:selected').val(),First_Time : $('#NewFirstTime2 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName3').val(), Last_Name : $('#NewParticipantLastName3').val(), Reason : $('#NewReason3 option:selected').val(),First_Time : $('#NewFirstTime3 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName4').val(), Last_Name : $('#NewParticipantLastName4').val(), Reason : $('#NewReason4 option:selected').val(),First_Time : $('#NewFirstTime4 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName5').val(), Last_Name : $('#NewParticipantLastName5').val(), Reason : $('#NewReason5 option:selected').val(),First_Time : $('#NewFirstTime5 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName6').val(), Last_Name : $('#NewParticipantLastName6').val(), Reason : $('#NewReason6 option:selected').val(),First_Time : $('#NewFirstTime6 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName7').val(), Last_Name : $('#NewParticipantLastName7').val(), Reason : $('#NewReason7 option:selected').val(),First_Time : $('#NewFirstTime7 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName8').val(), Last_Name : $('#NewParticipantLastName8').val(), Reason : $('#NewReason8 option:selected').val(),First_Time : $('#NewFirstTime8 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName9').val(), Last_Name : $('#NewParticipantLastName9').val(), Reason : $('#NewReason9 option:selected').val(),First_Time : $('#NewFirstTime9 option:selected').val() },
                {First_Name : $('#NewParticipantFirstName10').val(), Last_Name : $('#NewParticipantLastName10').val(), Reason : $('#NewReason10 option:selected').val(),First_Time : $('#NewFirstTime10 option:selected').val() },
                        ],
        'iPadin' : 'RetroDataEntry',
    };
    console.log(newSession);
  var myJSON = JSON.stringify(newSession);


      // Use AJAX to post the object to our adduser service
      $.ajax({
          type: 'POST',
          data: myJSON,
          url: 'theSession/addSession',
          dataType: 'JSON',
          contentType: 'application/json',
      }).done(function( response, results ) {
          // Check for successful (blank) response
          if (response.msg === '') {
              // resetPage();
              // Clear the form inputs
              // $('#addSession input').val('');

              // // Update the table
              // populateTable();

          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert('Error: ' + response.msg);

          }
      });

      foundSession = true;
  }


  //=====WBS ======= //
  //The WBS Picker
  $(function() {
    $('input#WBSDate').daterangepicker({

      locale: {
        format: 'M/DD/YY hh:mm A'
      },
      singleDatePicker: true,
      timePicker: true,
      timePickerSeconds: false,
      showDropdowns: true,
      minYear: 2017,
      maxYear: 2020,
      }, function(start, end, label) {
        session[0] = start;

      var years = moment().diff(start, 'years');

    });
  });

  //Post request to create the session
  function submitWBS() {

      var newSession = {
          'Created_Date': moment($('#WBSDate').val()).format('DD/MM/YYYY'),
          'created': moment('#WBSDate').format(),
          'Facilitator': toTitleCase($('#WBSfacilitator').val()),
          'Session_Type': facilitatorChoice,
          'Start_Location': startLocation,
          'Participants': [
                  {First_Name : $('#WBSNewParticipantFirstName').val(), Last_Name : $('#WBSNewParticipantLastName').val(), Reason : $('#WBSNewReason option:selected').val(),First_Time : $('#WBSNewFirstTime option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName1').val(), Last_Name : $('#WBSNewParticipantLastName1').val(), Reason : $('#WBSNewReason1 option:selected').val(),First_Time : $('#WBSNewFirstTime1 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName2').val(), Last_Name : $('#WBSNewParticipantLastName2').val(), Reason : $('#WBSNewReason2 option:selected').val(),First_Time : $('#WBSNewFirstTime2 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName3').val(), Last_Name : $('#WBSNewParticipantLastName3').val(), Reason : $('#WBSNewReason3 option:selected').val(),First_Time : $('#WBSNewFirstTime3 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName4').val(), Last_Name : $('#WBSNewParticipantLastName4').val(), Reason : $('#WBSNewReason4 option:selected').val(),First_Time : $('#WBSNewFirstTime4 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName5').val(), Last_Name : $('#WBSNewParticipantLastName5').val(), Reason : $('#WBSNewReason5 option:selected').val(),First_Time : $('#WBSNewFirstTime5 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName6').val(), Last_Name : $('#WBSNewParticipantLastName6').val(), Reason : $('#WBSNewReason6 option:selected').val(),First_Time : $('#WBSNewFirstTime6 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName7').val(), Last_Name : $('#WBSNewParticipantLastName7').val(), Reason : $('#WBSNewReason7 option:selected').val(),First_Time : $('#WBSNewFirstTime7 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName8').val(), Last_Name : $('#WBSNewParticipantLastName8').val(), Reason : $('#WBSNewReason8 option:selected').val(),First_Time : $('#WBSNewFirstTime8 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName9').val(), Last_Name : $('#WBSNewParticipantLastName9').val(), Reason : $('#WBSNewReason9 option:selected').val(),First_Time : $('#WBSNewFirstTime9 option:selected').val() },
                  {First_Name : $('#WBSNewParticipantFirstName10').val(), Last_Name : $('#WBSNewParticipantLastName10').val(), Reason : $('#WBSNewReason10 option:selected').val(),First_Time : $('#WBSNewFirstTime10 option:selected').val() },
                          ],
          'iPadin' : 'RetroDataEntry',
      };
      console.log(newSession);
    var myJSON = JSON.stringify(newSession);


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: myJSON,
            url: 'theSession/addSession',
            dataType: 'JSON',
            contentType: 'application/json',
        }).done(function( response, results ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                resetPage();
                // Clear the form inputs
                // $('#addSession input').val('');

                // // Update the table
                // populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });

        foundSession = true;
    }
