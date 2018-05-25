  var VolunteerArray = {};
  var FoundGardenVolunteer = true;
  var theID = '';


// function getGardenVolunteer(){
//   $.getJSON( '/gardenVolunteer/getGardenVolunteer', {createdDate: DateOnly}, function(results, res) {
//     console.log(results +  "  :  " + DateOnly);
//     })
//       .done(function(results, res) {
//         var theResults = JSON.stringify(results);
//           if (results.length === 0) {
//                 FoundGardenVolunteer = false;
//                 console.log('gotfalse :' + results);
//                 createSession(event);
//
//         } else if (results.length >= 0) {
//             console.log('NOT empty' + ' ' + results);
//                 theID = results[0]._id;
//                 FoundGardenVolunteer = true;
//                 console.log('gotTrue :' + results);
//                 GardenVolunteerArray = theResults[0].Participants;
//
//                 ShowGardenVolunteer();
//         }
//     });
// }

function getGardenVolunteer(){
$.getJSON( '/gardenVolunteer/getGardenVolunteer', {createdDate: DateOnly}, function(results, res) {
})
.done(function(results, res) {
      var theResults = JSON.stringify(results);
        if (theResults === '[]') {
              FoundSession = false;
      } else {
              FoundSession = true;
              VolunteerArray = Volunteers;
              updateGardenVolunteer();
              ShowGardenVolunteer();
      }
  });
}

//List all the stored Participants, and creates a new entry field
function ShowGardenVolunteer(){
      var output = '<hr>';
      $.each(VolunteerArray, function( index, value ) {

        console.log(value);
        VolunteerName = value.VolunteerName;
        timeIn = value.timeIn;
        timeOut = value.timeOut;
        miniPlot = value.miniPlot;
        var i = index +1,
            numParticipants = numParticipants + 1;

        output += '<div class="form-group">';
        output += ' <input id="VolunteerName" type="text" placeholder="'+ VolunteerName +'" class="form-control">';
        output += '  <div class="input-group">';
        output += '   <div class="input-group-addon">Check In Time</div>';
        output += '    <input id="CheckInTimeX" type="text" placeholder="" class="form-control"></div>';
        output += '  <div class="input-group">';
        output += '    <div data-toggle="buttons" class="btn-group">';
        output += '      <label class="btn btn-primary active btn btn-secondary">';
        output += '        <input id="MiniPlotX" type="radio" name="MiniPlot" checked=""> Mini Plot</label>';
        output += '      <label class="btn btn-primary btn btn-secondary">';
        output += '       <input id="GardenVolunteerX" type="radio" name="GardenVolunteer"> Garden Volunteer</label></div></div>';
        output += '   <div class="input-group">';
        output += '    <div class="input-group-addon">Checked Out </div>';
        output += '    <div class="input-group-addon">';
        output += '        <input type="checkbox" aria-label="Checkbox for following text input"></div></div>';
        output += '    <button id="SubmitButton" type="submit" class="btn btn-primary">Submit</button></div>';


      console.log(DateOnly);
        $('#gardenVolunteerDetails').html(output);
});
}

//Post request to create the session
function createSession(event) {
    event.preventDefault();
    console.log('createSession');
    var newSession = {
      createdDate : DateOnly,
      Volunteers : VolunteerArray,
    };

  var myJSON = JSON.stringify(newSession);



    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: myJSON,
        url: 'gardenVolunteer/createSession',
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
  }

//Put request to update to Participants, on  pre made sesion
function updateGardenVolunteer(){
  console.log('DATE: ' + DateOnly);
  var updates = {
      'FindDate': {createdDate: DateOnly},
      'createdDate': DateOnly,
      'Volunteers': VolunteerArray
  };

  $.ajax({
    type: "put",
    url: "gardenVolunteer/updateGardenVolunteer",
    contentType: 'application/json',
    data: JSON.stringify(updates)
  });
}
// this will be called when the DOM is ready
$(function(){

$( document ).ready(function() {
  // $("#CheckInTime").attr("placeholder").val(TimeOnly);
  // $("#CheckOutTime").attr("placeholder").val(TimeOnly);
  getGardenVolunteer(); //GETS Volunteer!
});





// TRIGGER SUBMIT
  $('#submit').click(function() {
    event.preventDefault();
    addVolunteer(event);
          });

// COLLECT INPUTS FROM PARTICIPANTS
  $('#Volunteers').on('change blur click', function(event){
    var targetID = (event.target.id);
    var check = $("#"+targetID).val();
    if (check === ''){}
    var field = (event.target.classList[0]);
    var Row = (field.slice(3,4));
    var ArrayVal = Row-1;

    $('#MiniPlot' + Row).selected(function() {
      var TheReason = 'MiniPlot';
        });

    $('#GardenVolunteer' + Row).selected(function() {
      var TheReason = 'MiniPlot';
        });

    VolunteerArray[ArrayVal]= '';
    // ({ "VolunteerName": $('input#VolunteerName'+Row).val(), "Check In Time": $('#CheckInTime'+Row).val(), "Reason": TheReason });
    updateGardenVolunteer();
    // < ---- AND NOW INSERT IN TO ARRAY
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
