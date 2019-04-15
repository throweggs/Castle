var GardenChoice = ''; //Choice between Mini Plot or Garden Volunteer
var GardenVisitorListData = []; //Setting up array for GardenVisitors
var iPadIn = ''; //Records iPad infomation
var trainer = '';


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

      $(".PT.card").on("click", function(e){
        trainer = event.target.id;
        $(".PT.card").removeClass('text-white bg-primary');
        $("#" + trainer + ".PT.card").addClass('text-white bg-primary');
      });


        $('#addPerson.modal').on('keydown keyup change click',function(){
          if (($('input#traineeFirstName').val().length >= 1) && ($('input#traineeLastName').val().length >= 1) && trainer !== "" ){
              $('#disclaimer').prop('disabled', false);
          }
        });

      $('#addPerson.modal').on('keydown keyup change click',function(){
        if ($('#disclaimer').is(':checked')){

                $('button#submit').prop('disabled', false);


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

    }

function updatePerson(thisVisitorObject){

    var updates = {
        'FindPerson': thisVisitorObject._id,
        'createdDate': thisVisitorObject.createdDate,
        'Person' : thisVisitorObject.Person,
        'Reason' : thisVisitorObject.Reason,
        'ArrivalTime' : thisVisitorObject.ArrivalTime,
        'DepartureTime' : moment().format(),
        'Disclaimer' : thisVisitorObject.Disclaimer,
        'iPadOut' : getKioskId(),
        'iPadIn' : iPadIn,
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
    $.getJSON( '/personalTrainer/getDay', {createdDate: moment().format('MMMM Do YYYY')}, function( data ) {

      // Stick our visitor data array into a visitorlist variable in the visitorlist object

$('#ListCount').text(data.length);

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(i, trainer){
       var newName = toTitleCase(firstNameLastInital(this.fullName));
       var tncs = '<i class="far fa-square"></i>';
       if(trainer.disclaimer === true){
        tncs = '<i class="far fa-check-square"></i>';
       }
        console.log(trainer);
            tableContent += '<tr>';
            tableContent += '<td>' + newName + '</td>';
            tableContent += '<td>' + trainer.trainer + '</td>';
            tableContent += '<td>' + moment(trainer.ArrivalTime).format('hh:mm:ss') + '</td>';
            tableContent += '<td>' +  tncs + '</td>';

            iPadIn = this.iPadIn;


            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#visitorList table tbody').html(tableContent);
    });
  }



//Post request to add the person
function addPerson(event) {
  event.preventDefault();
if(trainer === 'Mariam'){
  trainer = 'Mariam Al-Roubi';
} else if (trainer === 'Rich'){
  trainer = 'Rich Hudson';
} else if ( trainer === 'Janos'){
  trainer = 'Janos Atkins';
}

  var newPerson = {
    createdDate : moment().format('MMMM Do YYYY'),
    fullName : $('input#traineeFirstName').val() + ' ' + $('input#traineeLastName').val(),
    name : { first : $('input#traineeFirstName').val(), last : $('input#traineeLastName').val()},
    trainer : trainer,
    arrivalTime : moment().format(),
    disclaimer : $('input#disclaimer').is(':checked'),
    iPadIn : getKioskId(),
  };

var myJSON = JSON.stringify(newPerson);



  // Use AJAX to post the object to our adduser service
  $.ajax({
      type: 'POST',
      data: myJSON,
      url: 'personalTrainer/addPerson',
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
