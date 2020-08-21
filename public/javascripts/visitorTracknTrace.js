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
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          document.getElementById("disclaimer").addEventListener('click', function(event) {
            if (form.checkValidity() === false) {
              $("#disclaimer").removeClass('active');
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();



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

      } else {
        $('#Kids').hide();
        $('#Kid1').hide();
        $('#Kid2').hide();
        // $('#Kids').find('input').attr('required', false);
        $('#Kid1').prop('required', false);

      }
   });

    $('#supervisingChildNo').change(function() {
      if($(this).is(':checked')) {

        $('#Kids').hide();
        $('#Kid1').hide();
        $('#Kid2').hide();
        $('input#Kid1').prop('required', false);

      } else {
        $('#Kids').show();
        $('#Kid1').show();
        $('#Kid2').show();
        $('input#Kid1').prop('required', true);

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
        contactNumber: $('#addVisitor input#contactNumber').val(),
        reasonForVisit: $('#addVisitor select#reasonForVisit').val(),
        otherReason: $('#addVisitor input#otherReason').val(),
        ChildNames : [
            {name : toTitleCase($('#addVisitor input#Kid1').val())},
            {name : toTitleCase($('#addVisitor input#Kid2').val())},
          ],
        PhotographyWaverAgreement : $("#photographyWaiver").is(':checked'),
        covidAnswers: [$("#Covid_1").is(':checked'), $("#Covid_2").is(':checked'), $("#Covid_3").is(':checked'), $("#Covid_4").is(':checked') ],
        covidQuestions: [
          'In the last fortnight, I have not been infected with or shown symptoms of COVID-19',
          'In the last fortnight, no-one in my household has been infected with or shown symptoms of COVID-19',
          'In the last fortnight, no-one I have spent time with has been infected with or shown symptoms of COVID-19',
          'I agree to wear a face mask in the centre. I understand that if I refuse I may be asked to leave. '
       ],


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