var Paticipants = {},
    SessionAreas = '',
    numParticipants = 0,
    FoundSession = false,
    MyArray = [],
    findMe = '',
    DateOnly = '',
    Facilitator = '1',
    theID = '',
    SessionType =  '',
    StartLocation = '',
    FoundSession = true,
    ParticipantsArray = [];

var TopropingAreas = [
    'Auto Belays',
    'Stacks',
    'Quarry',
    'Tall_Walls'
    ];

var BoulderingAreas = [
    'Catacombs',
    'Competition_Wall',
    'Loft',
    'Panels',
    'Pen',
    'Mez',
    'Traverse_Boulders',
    'Outdoor_Boulders'
  ];


// SETTING DATE AND TIME FOR FINDING SESSIONS

var dt = new Date();
var curDate = dt.toString();
var DateOnly = curDate.split(" ", 4);
var output = "";
  $.each(DateOnly, function( index, value ) {
    output += value + " ";
  });
  DateOnly = output;




// COMPARING CHOICE OF SESSION TYPE TO LIST OF STARTING LOCATIONS
function SetSessionAreas(SessionAreas){
    var output = '<select id="sessionStartingArea" class="custom-select mb-2 mr-sm-2 mb-sm-0">';
    $.each(SessionAreas, function( index, value ) {
      var readable = value.replace("_"," ");
      output += '<option value='+ value +' selected="">'+ readable +'</option>';
    });
    output += '</div>';
      $('#SessionStartChoices').html(output);
}
//Get request for Session, if already created
function getSession(){
$.getJSON( '/theSession/getSession', {createdDate: DateOnly}, function(results, res) {
})
.done(function(results, res) {
      var theResults = JSON.stringify(results);
        if (theResults === '[]') {
              FoundSession = false;
      } else {
              Facilitator = results[0].Facilitator;
              theID = results[0]._id;
              SessionType =  results[0].Session_Type;
              StartLocation = results[0].Start_Location;
              FoundSession = true;
              ParticipantsArray = results[0].Participants;

              ShowSession();
              updatetheSession();

      }
  });
}
// Replaces the input feilds with Text field, of the Session
function ShowSession(){
var SessionDetails = '<div class="col-12">';
    SessionDetails += ' <h1>The Session Facilitator: <strong>' + Facilitator +'</strong></h1>';
    SessionDetails += ' <h3>It is a '+ SessionType +' session, starting in the ' + (StartLocation.replace("_"," ")) + '.</h3>';
    SessionDetails += ' <ul>';
    SessionDetails += '   <li><strong>Participants of The Session must be registered roped climbers</strong> and therefore confident putting on a harness correctly, tying in with the correct knot and belaying competently.</li>';
    SessionDetails += '   <li>The Session and the Wednesday mixed bouldering session may be attended by those registered as bouldering only. If you’re not sure about which session you can join, please ask a receptionist who will be happy to help you. <strong>The Session is not suitable for novice climbers.</strong></li>';
    SessionDetails += '   <li>I<strong>MPORTANT INFORMATION: <u>This is not a teaching session</u>, <u>nor is it supervised</u>. Participants are still responsible for their own safety.  It is up to each participant to decide for themselves who they wish to climb with.</strong></li>';
    SessionDetails += '</div>';

$( "#addFacilitator" ).replaceWith( SessionDetails );
ShowParticipants();
  }
//List all the stored Participants, and creates a new entry field
function ShowParticipants(){
    var output = '<hr>';
    $.each(ParticipantsArray, function( index, value ) {
      var PName = value.Participant;
      var Reason = value.Reason;
      var FirstTime = value.First_Time;
      var i = index + 1;
          numParticipants = numParticipants + 1;
      var selectMe0 = '',
          selectMe1 = '',
          selectMe2 = '',
          selectMe3 = '';
      var selectMe00 = '',
          selectMe01 = '',
          selectMe02 = '';

      if (Reason === "") {
        selectMe0 = 'selected=""';
        selectMe1 = '';
        selectMe2 = '';
        selectMe3 = '';
      } else if (Reason === "Staff Input") {
        selectMe0 = '';
        selectMe1 = 'selected=""';
        selectMe2 = '';
        selectMe3 = '';
      } else if (Reason === "Climbing Partner") {
        selectMe0 = '';
        selectMe1 = '';
        selectMe2 = 'selected=""';
        selectMe3 = '';
      } else if (Reason === "New") {
        selectMe0 = '';
        selectMe1 = '';
        selectMe2 = '';
        selectMe3 = 'selected=""';
      }
      if (FirstTime === "Yes") {
        selectMe01 = 'selected=""';
        selectMe02 = '';
      } else if (FirstTime === "No") {
        selectMe01 = '';
        selectMe02 = 'selected=""';
      }

      output += '<div class="input-group">';
      output += '<span id="Participant'+i+'" class="col-2 input-group-addon">Participant '+i+'</span>';
      output += '   <input disabled id="Participant'+i+'" type="text" placeholder="'+PName+'" aria-label="Participant Name" aria-describedby="sizing-addon2" class="row'+i+ ' form-control col-4"/>';
      output += ' <select disabled id="Reason'+i+'" class="custom-select">';
      output += '     <option '+ selectMe0 +' value="">Im joining the session...</option>';
      output += '     <option '+ selectMe1 +' value="Staff Input">for staff input </option>';
      output += '     <option '+ selectMe2 +' value="Climbing Partner">I have no climbing partner</option>';
      output += '     <option '+ selectMe3 +' value="New">I am new to the Centre</option>';
      output += ' </select>';
      output += ' <select disabled id="FirstTime'+i+'" class="custom-select">';
      output += '     <option '+ selectMe00 +' value="">First Time?</option>';
      output += '     <option '+ selectMe01 +'  value="Yes">Yes</option>';
      output += '     <option '+ selectMe02 +'  value="No">No</option>';
      output += ' </select>';
      output += '</div>';
    });
    i = numParticipants+1;

var ActiveLine = output;
    ActiveLine += '<hr>';
    ActiveLine += '<div class="input-group">';
    ActiveLine += '<span id="ParticipantRow'+i+'" class="ActiveLine col-2 input-group-addon">Participant '+i+'</span>';
    ActiveLine += '   <input id="Participant'+i+'" type="text" placeholder="Name" aria-label="Participant Name" aria-describedby="sizing-addon2" class="row'+i+ ' form-control col-4"/>';
    ActiveLine += ' <select id="Reason'+i+'" class="row'+i+ ' custom-select">';
    ActiveLine += '     <option value="">Im joining the session...</option>';
    ActiveLine += '     <option value="Staff Input">for staff input </option>';
    ActiveLine += '     <option value="Climbing Partner">I have no climbing partner</option>';
    ActiveLine += '     <option value="New">I am new to the Centre</option>';
    ActiveLine += ' </select>';
    ActiveLine += ' <select  id="FirstTime'+i+'" class="row'+i+ ' custom-select">';
    ActiveLine += '     <option value="">First Time?</option>';
    ActiveLine += '     <option value="Yes">Yes</option>';
    ActiveLine += '     <option value="No">No</option>';
    ActiveLine += ' </select>';
    ActiveLine += '</div>';
    ActiveLine += '<br>';
    ActiveLine += '<a href="/" onclick="updatetheSession()" id="Done" name="Done" class="btn btn-success" role="button">Done</a>';

      $('#ShowParticipants').html(ActiveLine);
}

//Post request to create the session
function addSession(event) {
  event.preventDefault();
  createdDate = DateOnly;
  Facilitator = $('input#FacilitatorsName').val();
  SessionType = $('#SessionClimbingType option:selected').val();
  StartLocation = $('#sessionStartingArea option:selected').val();

  var newSession = {
      'createdDate': DateOnly,
      'Facilitator': Facilitator,
      'Session_Type': SessionType,
      'Start_Location': StartLocation,
      'Participants': ParticipantsArray,
  };

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
  ShowSession($('input#FacilitatorsName').val(), $('#SessionClimbingType option:selected').val(), $('#sessionStartingArea option:selected').val());
}
//Put request to update to Participants, on  pre made sesion
function updatetheSession(){
console.log('DATE: ' + DateOnly);
var updates = {
    'FindDate': {createdDate: DateOnly},
    'createdDate': DateOnly,
    'Facilitator': Facilitator,
    'Session_Type': SessionType,
    'Start_Location': StartLocation,
    'Participants': ParticipantsArray
};

$.ajax({
  type: "put",
  url: "theSession/updateSession",
  contentType: 'application/json',
  data: JSON.stringify(updates)
});
}
// this will be called when the DOM is ready
$(function(){

  //Load GDPR statment
    $( document ).ready(function() {
        $("#dataProtection").modal('show');
    });

getSession();//GET SESSION!
// CALL FUNCTION TO CHANGE OPTIONS ACCORDING TO SESSION TYPE CHOICE
$('#SessionClimbingType').change(function(SessionAreas) {
  var SessionClimbingType = $( "#SessionClimbingType option:selected" ).text();
      if (SessionClimbingType === 'Top-Roping'){
          SessionAreas = TopropingAreas;
      } else if (SessionClimbingType === 'Bouldering'){
          SessionAreas = BoulderingAreas;
      }
      SetSessionAreas(SessionAreas);
});

// SET CHOOSEN START AREA TO VARIABLE
$('#SessionStartChoices').change(function(SessionAreas) {
  var StartingArea = $( "#SessionStartChoices option:selected" ).text();
});

// TRIGGER SUBMIT
$('#submit').click(function() {
  event.preventDefault();
  addSession(event);
        });

// COLLECT INPUTS FROM PARTICIPANTS
$('#ShowParticipants').on('change blur click', function(event){
  var targetID = (event.target.id);
  var check = $("#"+targetID).val();
  if (check === ''){}
  var field = (event.target.classList[0]);
  var Row = (field.slice(3,4));
  var ArrayVal = Row-1;
  ParticipantsArray[ArrayVal]=({ "Participant": $('input#Participant'+Row).val(), "Reason": $('#Reason'+Row+' option:selected').val(), "First_Time":$('#FirstTime'+Row+' option:selected').val()});
  updatetheSession();
  // < ---- AND NOW INSERT IN TO ARRAY
    });

// CHANGE INPUT TO TEXT FIELD -- NOT USING JUST USEFUL
$('#ShowParticipants').on('blur', function(){

  var $el = $(this);

  var $input = $('<input />').val( $el.text() );
  $el.replaceWith( $input );

  var save = function(){
    var $p = $('<text contentEditable/>').text( $input.val() );
    $input.replaceWith( $p );
  };

  $input.one('blur', save).focus();

});

$('input[name=ids]').val(function(index, value) {
 return value.replace('54,', '');
  });

$('#ShowParticipants').on('change blur', function(event){
  var targetID = (event.target.id);
  var check = $("#"+targetID).val();
  var $el = $('<input />');
  var $valid = $('<input is-valid />');
  var $invalid = $('<input is-invalid />');

  if (check === ''){
    console.log('invalid');
    $this.$el.replaceWith( $invalid );
  } else if (check !== ''){
    console.log('valid');
  $valid.replaceWith( $invalid );
  }
});

});
