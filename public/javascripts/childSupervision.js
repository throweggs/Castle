var Count = 0,
    FirstName = 0,
    LastName = 0,
    ContactNumber = 0,
    ReasonForVisit = 0,
    Disclaimer = '',
    output = false,
    theText = '';


$(function(){ // this will be called when the DOM is ready
    $('#submit').on('click', addSupervisor);

    $('#childName').keydown(function() {
        if ($('#childName').val().length >= 1){
          $(this).css({'color' : 'inherit' });
          childName = 1;
        } else {
          $(this).css({'color' : '#ff0000' });
          childName = 0;
        }
      });

    $('#designatedAdult').keydown(function() {
        if ($('#designatedAdult').val().length >= 1){
          $(this).css({'color' : 'inherit' });
          designatedAdult = 1;
        } else {
          $(this).css({'color' : '#ff0000' });
          designatedAdult = 0;
        }
      });


      $('#addSupervisor').on('keydown keyup change',function() {
      var Count = designatedAdult + childName;
          if (Count === 2){
            $('#disclaimer').prop('disabled', false);
          } else if (Count != 2){
            $('#disclaimer').prop('disabled', true);
            $('#disclaimer').prop('checked', false);
          }
      });

    $('#addSupervisor').on('keydown keyup change',function(){
      if ($('#disclaimer').is(':checked')){
            $('#submit').prop('disabled', false);
      } else if ($('#disclaimer').not(':checked')){
          $('#submit').prop('disabled', true);
      }
    });

    $('#disclaimer').change(function(){
      if ($('#disclaimer').is(':checked')){
        console.log("checked");
        var CName = ($('#childName').val());
            CName = CName.charAt(0).toUpperCase() + CName.slice(1);
        var theText = '<strong>Thanks ' + CName + '. </strong> Please hand this tablet back to the receptionist.';
        successAlert(theText, 'alert-success', false);
      } else if ($('#disclaimer').not(':checked')){

        successAlert("", 'alert-success', true);
      }

    });

    // $('#addSupervisor').on('blur change',function() {
    //   var Count = childName + designatedAdult;
    //     if (Count === 2){
    //         failAlert("bugger 1", "", true);
    //         if ($('#reasonForVisit').val() === "") {
    //             theText = 'Please make sure you have selected a <strong> REASON FOR VISIT</strong>, thanks.';
    //             failAlert(theText, 'alert-danger', false);
    //         } else if ($('#reasonForVisit').val() !== ""){
    //                   failAlert("buger2", 'alert-danger', true);
    //               }
    //     } else if (FirstName != 1) {
    //         theText = 'Please make sure you have entered your <strong>FIRST NAME</strong> correctly, thanks.';
    //         failAlert(theText, 'alert-danger', false);
    //     } else if ((LastName != 1) && (FirstName === 1)) {
    //         theText = 'Please make sure you have entered your <strong>LAST NAME</strong> correctly, thanks.';
    //         failAlert(theText, 'alert-danger', false);
    //     } else if ((LastName != 1) && (FirstName != 1)) {
    //         theText = 'Please make sure you have entered your <strong>FULL NAME</strong> correctly, thanks.';
    //         failAlert(theText, 'alert-danger', false);
    //       }
    //
    // });

      });


// Add User button click
function addSupervisor(event) {
    event.preventDefault();
  console.log('arrived on submit');

  var dt = new Date();
  var curDate = dt.toString();
  console.log("New Supervisor of Non-Climbing Child added at :" + curDate);


    // If it is, compile all user info into one object
    var newSupervisor = {
        'childName': $('#addSupervisor input#childName').val(),
        'designatedAdult': $('#addSupervisor input#designatedAdult').val(),
        'disclaimer': $('#addSupervisor input#disclaimer').val(),
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
