var GardenChoice = ''; //Choice between Mini Plot or Garden Volunteer
var GardenVisitorListData = []; //Setting up array for GardenVisitors

// DOM Ready =============================================================
$(document).ready(function() {
  $("#dataProtection").modal('show');


    // Populate the user table on initial page load
    populateTable();

    // Visitor name link click
    $('#visitorList table tbody').on('click', 'td button.CheckOut', TiggerCheckOut);

    //SUBMIT

    // Button selected oulining
      $().button('toggle');

      $('#submit').on('click', addPerson);

      $('#timeIn').datetimepicker({
        useCurrent: true,
        format: 'LT'
      });
      $('#timeOut').datetimepicker({
        useCurrent: false,
        format: 'LT'
      });
      $("#timeIn").on("change.datetimepicker", function (e) {
          $('#timeOut').datetimepicker('minDate', e.date);
      });
      $("#timeOut").on("change.datetimepicker", function (e) {
          $('#timeIn').datetimepicker('maxDate', e.date);
      });


      $('input#VolunteerChoice').on('change',function(){
        if ($('input#VolunteerChoice').is(":checked")){
          GardenChoice = $('input#VolunteerChoice').val();
          console.log(GardenChoice);
        }
      });

      $('input#miniPlotsChoice').on('change',function(){
        if ($('input#miniPlotsChoice').is(":checked")){
          GardenChoice = $('input#miniPlotsChoice').val();
          console.log(GardenChoice);
        }
      });

        $('#addPerson.modal').on('keydown keyup change',function(){
          if (($('input#volunteerName').val().length >= 1)){
              $('#disclaimer').prop('disabled', false);
          }
        });

      $('#disclaimer').on('change',function(){
        if ($('#disclaimer').is(':checked')){
              if (($('input#volunteerName').val().length >= 1) && GardenChoice !== "" ){
                $('button#submit').prop('disabled', false);
              }

        } else if ($('#disclaimer').not(':checked')){
            $('button#submit').prop('disabled', true);
        }
      });

});

// Functions =============================================================

function TiggerCheckOut(event) {

        // Prevent Link from Firing
        event.preventDefault();

        // Retrieve fullname from link rel attribute
        var thisFullName = $(this).attr('rel');

        // Get Index of object based on id value
        var arrayPosition = visitorListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisFullName);

        // Get our User Object
       var thisVisitorObject = visitorListData[arrayPosition];

       updatePerson(thisVisitorObject);

    console.log(visitorListData[arrayPosition]);
    console.log("did it work?");
    }

function updatePerson(thisVisitorObject){
    console.log('DATE: ' + DateOnly);

    var updates = {
        'FindPerson': thisVisitorObject._id,
        'createdDate': thisVisitorObject.createdDate,
        'Person' : thisVisitorObject.Person,
        'Reason' : thisVisitorObject.Reason,
        'ArrivalTime' : thisVisitorObject.ArrivalTime,
        'DepartureTime' : TimeOnly,
        'Disclaimer' : thisVisitorObject.Disclaimer,
    };

    $.ajax({
      type: "put",
      url: "gardenVolunteer/updatePerson",
      contentType: 'application/json',
      data: JSON.stringify(updates)
    }).done(function( response, results ) {
      populateTable();
      // location.reload();
        console.log(response);
        // Check for successful (blank) response
        if (response.ok === 1) {

            // Clear the form inputs
            // $('#addPerson input').val('');

            // // Update the table
            // populateTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }

    });
  }



// Fill table with data
function populateTable() {

  console.log("Populate Tab");

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/gardenVolunteer/getDay', {createdDate: DateOnly}, function( data ) {

      // Stick our visitor data array into a visitorlist variable in the visitorlist object
      visitorListData = data;

$('#ListCount').text(visitorListData.length);

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
          var theName = this.person.split(" ");
          console.log(theName);
          var lastName = theName[fruits.length];
          console.log(lastName);
          var newName = theName[0] + ' ' + lastName.charAt(0) + '.';
          console.log(newName);

            tableContent += '<tr>';
            tableContent += '<td>' + newName + '</td>';
            tableContent += '<td>' + this.Reason + '</td>';
            tableContent += '<td>' + this.ArrivalTime + '</td>';

              if (this.DepartureTime === '') {
                console.log(this._id + 'No Depart');

                tableContent += '<td><button type="button" rel="' + this._id + '" class="CheckOut btn btn-warning btn-sm">Check Out</button></td>';
              } else {
                tableContent += '<td>' + this.DepartureTime + '</td>';
              }
            // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#visitorList table tbody').html(tableContent);
    });
  }



//Post request to add the person
function addPerson(event) {
  event.preventDefault();


  var newPerson = {
    'createdDate': DateOnly,
    'Person' : $('input#volunteerName').val(),
    'Reason' : GardenChoice,
    'ArrivalTime' : TimeOnly,
    'DepartureTime' : "",
    'Disclaimer' : $('input#Disclaimer').val(),
  };

var myJSON = JSON.stringify(newPerson);



  // Use AJAX to post the object to our adduser service
  $.ajax({
      type: 'POST',
      data: myJSON,
      url: 'gardenVolunteer/addPerson',
      dataType: 'JSON',
      contentType: 'application/json',
  }).done(function( response, results ) {
    console.log(response);
        populateTable();
      // location.reload(forcedReload);
      // Check for successful (blank) response
      if (response.msg === '') {

      }
      else {
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
      }

  });
}
