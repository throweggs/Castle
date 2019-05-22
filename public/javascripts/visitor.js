var Count = 0,
    FirstName = 0,
    LastName = 0,
    // ContactNumber = 0,
    ReasonForVisit = 0,
    Disclaimer = '',
    iPad = '',
    output = false,
    photographyWaverAgreement  = null,
    theText = '';

    //==========================================
    // Contact Number removed for GDPR REASONS
    //==========================================


$(function(){ // this will be called when the DOM is ready


  $( document ).ready(function() {
      $("#dataProtection").modal('show');
  });

  $('.btn-group').on('click', '.btn', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

    $('#submit').on('click', addVisitor);

    $('#supervisingChildYes').change(function() {

      if($(this).is(':checked')) {

        $('#Kids').show();
        $('#Kid1').show();
        $('#Kid2').show();
        // $('#Kids').find('input').attr('required', true);
        $('#Kid1').prop('required', true);
        $('#Kid2').prop('required', false);
      } else {
        $('#Kids').hide();
        $('#Kid1').hide();
        $('#Kid2').hide();
        // $('#Kids').find('input').attr('required', false);
        $('#Kid1').prop('required', false);
        $('#Kid2').prop('required', false);
      }
   });

    $('#supervisingChildNo').change(function() {
      if($(this).is(':checked')) {

        $('#Kids').hide();
        $('#Kid1').hide();
        $('#Kid2').hide();
        $('input#Kid1').prop('required', false);
        $('input#Kid2').prop('required', false);
      } else {
        $('#Kids').show();
        $('#Kid1').show();
        $('#Kid2').show();
        $('input#Kid1').prop('required', true);
        $('input#Kid2').prop('required', false);
      }
      });

    $('#reasonForVisit').change(function() {

        if ($('#reasonForVisit').val() === "Other"){
          $('label#otherReason').show();
          $('input#otherReason').show();
          $('input#otherReason').prop('required', true);
          $('label#otherReason').text('Please specify');
      } else if ($('#reasonForVisit').val() === "Contractor"){
        $('label#otherReason').show();
        $('input#otherReason').show();
        $('input#otherReason').prop('required', true);
        $('label#otherReason').text('The company name');
      } else if ($('#reasonForVisit').val() === "External Course Provider"){
        $('label#otherReason').show();
        $('input#otherReason').show();
        $('input#otherReason').prop('required', true);
        $('label#otherReason').text('Course Name');
      } else if ($('#reasonForVisit').val() === "Staff Member"){
        $('label#otherReason').show();
        $('input#otherReason').show();
        $('input#otherReason').prop('required', true);
        $('label#otherReason').text('Which staff member are you visiting?');
      } else if ($('#reasonForVisit').val() === "Photography"){
        $('label#otherReason').hide();
        $('input#otherReason').hide();
          $('input#otherReason').prop('required', false);
      } else {
        $('label#otherReason').hide();
        $('input#otherReason').hide();
          $('input#otherReason').prop('required', false);
      }
      });

    $('button#photographyWaiverYes').click(function(){
        $('#photographyWaiverModal').modal('show');
    });

    $('#photographyWaiverAgreement').click(function(){
        $('#photographyWaiverYes').addClass('active').siblings().removeClass('active');
      photographyWaverAgreement = 'Agreed';
    });

    $("#photographyWaiverCross").click(function(){
        $('#photographyWaiverNo').addClass('active').siblings().removeClass('active');
      photographyWaverAgreement = 'Not Agreed';
    });

    $('button#disclaimer').click(function(){
      $('#theMessage').text('Thanks '+ $('#addVisitor input#firstName').val()+'. ');
      $("button#submit").show();
        $("button#disclaimer").addClass('active');
    });

});


// Add User button click
function addVisitor(event) {





  console.log("New Visitors added at :" + dt);


    // If it is, compile all user info into one object
    var newVisitor = {
        fullName: toTitleCase($('#addVisitor input#firstName').val() + ' ' + $('#addVisitor input#lastName').val()),
        firstName: toTitleCase($('#addVisitor input#firstName').val()),
        lastName: toTitleCase($('#addVisitor input#lastName').val()),
        Name: [
          {First: toTitleCase($('#addVisitor input#firstName').val())},
          {Last:  toTitleCase($('#addVisitor input#lastName').val())},
        ],

        reasonForVisit: $('#addVisitor select#reasonForVisit').val(),
        otherReason: $('#addVisitor input#otherReason').val(),
        ChildNames : [
            {name : toTitleCase($('#addVisitor input#Kid1').val())},
            {name : toTitleCase($('#addVisitor input#Kid2').val())},
          ],
        PhotographyWaverAgreement : photographyWaverAgreement,
        disclaimer: $('#addVisitor input#disclaimer').val(),
        created: moment().format(),
        iPad : getKioskId(),

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
            if(checksOut === true){
             window.location.href = "/";
            // $('#addVisitor input').val('');
            }
        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });

}
