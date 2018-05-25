//Gets the information from the instructor for WWA and theSession, to create the session
function createSession(){
  output='form#addFacilitator.container-fluid.SessionDetails(name="addFacilitator", method="post", onlcick="addFacilitator()")';
  output+='  .input-group';
  output+='    span#Facilitator.col-2.input-group-addon Facilitator';
  output+='    input#FacilitatorsName.form-control.col-4(type="text", placeholder="Name", aria-label="Facilitator Name", aria-describedby="sizing-addon2")';

  output+='    select#SessionClimbingType.custom-select';
  output+='      option(selected="", value="Choose") Session Type...';
  output+='      option(value="Bouldering") Top-Roping';
  output+='      option(value="Bouldering") Bouldering';

  output+='    #SessionStartChoices  ';
      //Choose Dynamically picked from SessionClimbingType

  output+='    button#submit.btn.btn-primary(type="submit" value="Start Session") Start Sessions';
  $('#successAlert').jade(output);
}

//An Alert for when part of the form is incorrectly filled out
function failAlert(theText, alertType, removeMe){
  console.log(theText,alertType, removeMe);
  if (removeMe === false){
        output = '<div class="alert '+ alertType +' alert-dismissable">';
        output += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        output += theText;
        output += '</div>';
    $('#failAlert').html(output);
  } else if (removeMe === true){
        output = "";
    $('#failAlert').html(output);
  }
}

//An Alert for when the form is correctly filled out
function successAlert(theText, alertType, removeMe){
  $('#SuccessModal').modal('show');
  $('#TheText').html(theText);
}

//sets the Date

var dt = new Date();
var curDate = dt.toString();
var DateOnly = curDate.split(" ", 4);
var output = "";
  $.each(DateOnly, function( index, value ) {
    output += value + " ";
  });
  DateOnly = $.trim(output);


//Set the Time
var DateRemoved = curDate.replace(DateOnly, '');
var TimeOnly = DateRemoved.split(" ", 2);
var output = "";
  $.each(TimeOnly, function( index, value ) {
    output += value + " ";
  });
  TimeOnly = $.trim(output);
