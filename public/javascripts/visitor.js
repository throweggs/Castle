var Count = 0,
    FirstName = 0,
    LastName = 0,
    ContactNumber = 0,
    ReasonForVisit = 0,
    Disclaimer = '',
    iPad = '',
    output = false,
    otherReason = null,
    photographyWaverAgreement  = null,
    theText = '';


$(function(){ // this will be called when the DOM is ready

//Load GDPR statment
  $( document ).ready(function() {
      $("#dataProtection").modal('show');
  });

    $('#submit').on('click', addVisitor);

    $('#firstName').keydown(function() {
        if ($('#firstName').val().length >= 1){
          $(this).css({'color' : 'inherit' });
          FirstName = 1;
        } else {
          $(this).css({'color' : '#ff0000' });
          FirstName = 0;
        }
      });

    $('#lastName').keydown(function() {
        if ($('#lastName').val().length >= 1){
          $(this).css({'color' : 'inherit' });
          LastName = 1;
        } else {
          $(this).css({'color' : '#ff0000' });
          LastName = 0;
        }
      });

    $('#contactNumber').keyup(function() {
        if ($('#contactNumber').val().length === 11){
          $(this).css({'color' : 'inherit' });
          ContactNumber = 1;
        } else {
          $(this).css({'color' : '#ff0000' });
          ContactNumber = 0;
        }
      });

    $('#supervisingChildYes').change(function() {
      var kid1,
          kid2,
          kid3;
          kid1 = '<input id="Kid1" type"text" name="Kid1" class="form-control" placeholder="Child 1"></input>';
            $('#Kid1').html(kid1);
          kid2 = '<input id="Kid2" type"text" name="Kid2" class="form-control" placeholder="Child 2"></input>';
            $('#Kid2').html(kid2);
          kid3 = '<input id="Kid3" type"text" name="Kid3" class="form-control" placeholder="Child 3"></input>';
            $('#Kid3').html(kid3);
        });

    $('#supervisingChildNo').change(function() {
      var kid1,
          kid2,
          kid3;
          kid1 = '';
          $('#Kid1').html(kid1);
          kid2 = '';
          $('#Kid2').html(kid2);
          kid3 = '';
          $('#Kid3').html(kid3);
      });


    $('#reasonForVisit').change(function() {
        if ($('#reasonForVisit').val().length > 1){
          $(this).css({'color' : 'inherit' });
          ReasonForVisit = 1;
        } else {
            $(this).css({'color' : '#ff0000' });
          ReasonForVisit = 0;
        }
        if ($('#reasonForVisit').val() === "Other"){
          otherReason = '<textarea id="otherReason" name="otherReason" placeholder="Please enter the reason you are visitings, if none of the reason above apply." class="form-control"></textarea>';
        $('#otherReason').html(otherReason);
      } else if ($('#reasonForVisit').val() === "Contractor"){
          otherReason = '<input class="form-control" id="companyName" type="text" name="companyName" placeholder="Company Name" autocomplete="off">';
        $('#otherReason').html(otherReason);
      } else if ($('#reasonForVisit').val() === "Staff Member"){
            otherReason = '<input class="form-control" id="otherReason" type="text" name="otherReason" placeholder="Which Staff Member" autocomplete="off">';
          $('#otherReason').html(otherReason);
      } else if ($('#reasonForVisit').val() === "Photography"){
            otherReason = '';
          $('#otherReason').html(otherReason);
      } else {
          otherReason = '';
        $('#otherReason').html(otherReason);
      }
      });



      $('#addVisitor').on('keydown keyup change',function() {
      var Count = ReasonForVisit + LastName + FirstName;
          if (Count === 3){
            $('#disclaimer').prop('disabled', false);
            $('#photographyWaver').prop('disabled', false);
          } else if (Count != 3){
            $('#disclaimer').prop('disabled', true);
            $('#photographyWaver').prop('disabled', true);
            $('#disclaimer').prop('checked', false);
          }
      });

    $('#addVisitor').on('keydown keyup change',function(){
      if ($('#disclaimer').is(':checked')){
            $('#submit').prop('disabled', false);
      } else if ($('#disclaimer').not(':checked')){
          $('#submit').prop('disabled', true);
      }
    });

    $('#photographyWaver').change(function(){
      if($('#photographyWaver').is(':checked')){
        $('#photographyWaverModal').modal('show');
      }
    });

    $('#photographyWaverAgreement').click(function(){
      photographyWaverAgreement = 'Agreed';
      console.log('Agreed');
    });


    $('#disclaimer').change(function(){
      if ($('#disclaimer').is(':checked')){

        var CName = ($('#firstName').val());
            CName = CName.charAt(0).toUpperCase() + CName.slice(1);
        var theText = '<strong>Thanks ' + CName + '. </strong> Please hand this tablet back to the receptionist.';
        successAlert(theText, 'alert-success', false);
      } else if ($('#disclaimer').not(':checked')){

        successAlert("", 'alert-success', true);
      }

    });

    $('#addVisitor').on('blur change',function() {
      var Count = LastName + FirstName;
        if (Count === 2){
            failAlert("bugger 1", "", true);
            if ($('#reasonForVisit').val() === "") {
                theText = 'Please make sure you have selected a <strong> REASON FOR VISIT</strong>, thanks.';
                failAlert(theText, 'alert-danger', false);
            } else if ($('#reasonForVisit').val() !== ""){


                  }
        } else if (FirstName != 1) {
            theText = 'Please make sure you have entered your <strong>FIRST NAME</strong> correctly, thanks.';
            failAlert(theText, 'alert-danger', false);
        } else if ((LastName != 1) && (FirstName === 1)) {
            theText = 'Please make sure you have entered your <strong>LAST NAME</strong> correctly, thanks.';
            failAlert(theText, 'alert-danger', false);
        } else if ((LastName != 1) && (FirstName != 1)) {
            theText = 'Please make sure you have entered your <strong>FULL NAME</strong> correctly, thanks.';
            failAlert(theText, 'alert-danger', false);
          }

    });

    $('#addVisitor').on('keydown keyup change',function() {
      if ($('#addVisitor textarea#otherReason').val() !== ''){
        otherReason = $('#addVisitor textarea#otherReason').val();

      }
      if ($('#addVisitor input#otherReason').val() !== ''){
        otherReason = $('#addVisitor input#otherReason').val();

      }
    });

      });






// Add User button click
function addVisitor(event) {
    event.preventDefault();
  console.log('arrived on submit');


  console.log("New Visitors added at :" + dt);

var Kids = {
  'Kid1' : $('#addVisitor input#Kid1').val(),
  'Kid2' : $('#addVisitor input#Kid2').val(),
  'Kid3' : $('#addVisitor input#Kid3').val(),
};



    // If it is, compile all user info into one object
    var newVisitor = {
        'fullName': $('#addVisitor input#firstName').val() + ' ' + $('#addVisitor input#lastName').val(),
        'firstName': $('#addVisitor input#firstName').val(),
        'lastName': $('#addVisitor input#lastName').val(),
        'reasonForVisit': $('#addVisitor select#reasonForVisit').val(),
        'otherReason': otherReason,
        'contactNumber': $('#addVisitor input#contactNumber').val(),
        'ChildNames' : [
            {'name' : $('#addVisitor input#Kid1').val()},
            {'name' : $('#addVisitor input#Kid2').val()},
          ],
        'PhotographyWaverAgreement' : photographyWaverAgreement,
        'disclaimer': $('#addVisitor input#disclaimer').val(),
        'createdDate': moment(),
        'iPad' : getKioskId(),

    };
    console.log(newVisitor);

var myJSON = JSON.stringify(newVisitor);
  console.log(myJSON);


    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: myJSON,
        url: '/visitor/addVisitor',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

            // Clear the form inputs
             window.location.href = "/";
            $('#addVisitor input').val('');

            // // Update the table
            // populateTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });

}
