var Count = 0,
    FirstName = 0,
    LastName = 0,
    ContactNumber = 0,
    ReasonForVisit = 0,
    Disclaimer = '',
    output = false,
    theText = '';


$(function(){ // this will be called when the DOM is ready
  //Load GDPR statment
    $( document ).ready(function() {
        $("#dataProtection").modal('show');
    });

    $('#submit').on('click', addSupervisor);

    $('#childName').blur(function() {
        if ($('#childName').val().length >= 3){
        $('#childName').addClass('is-valid');
        $('#childName').removeClass('is-invalid');
        $('#childName').removeClass('is-invalid-feedback');
        childName = 1;
        } else {
          $('#childName').removeClass('is-valid');
          $('#childName').addClass('is-invalid');
          childName = 0;
        }
      });

    $('#designatedAdult').keyup(function() {
        if ($('#designatedAdult').val().length >= 3){
          $('#designatedAdult').addClass('is-valid');
          $('#designatedAdult').removeClass('is-invalid');
          $('#designatedAdult').removeClass('is-invalid-feedback');
          designatedAdult = 1;
          } else {
            $('#designatedAdult').removeClass('is-valid');
            $('#designatedAdult').addClass('is-invalid');
          designatedAdult = 0;
        }
      });


      $('#addSupervisor').on('keydown keyup change',function() {
      var Count = designatedAdult + childName;
          if (Count === 2){
            $('#disclaimer').prop('disabled', false);
            $('#theMessage').text('Thanks ' + $('#designatedAdult').val());

          } else if (Count != 2){
            $('#disclaimer').prop('disabled', true);
          }
      });

    
    $('#disclaimer').click(function(){
        $("button#submit").show();
        $("button#disclaimer").addClass('active');
        console.log("checked");
        var CName = ($('#designatedAdult').val());
            CName = CName.charAt(0).toUpperCase() + CName.slice(1);
        var theText = '<strong>Thanks ' + CName + '. </strong> Please hand this tablet back to the receptionist.';

    });


      });


// Add User button click
function addSupervisor(event) {
    event.preventDefault();


  var dt = new Date();
  var curDate = dt.toString();



    // If it is, compile all user info into one object
    var newSupervisor = {
        'childName': $('#addSupervisor input#childName').val(),
        'designatedAdult': $('#addSupervisor input#designatedAdult').val(),
        'disclaimer': $('#addSupervisor input#disclaimer').val(),
        'iPad' : getKioskId(),
        'createdDate': curDate

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
             window.location.href = "/";
            $('#addSupervisor input').val('');

            // // Update the table
            // populateTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });

}
