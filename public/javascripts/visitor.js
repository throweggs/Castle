var Count = 0,
    FirstName = 0,
    LastName = 0,
    ContactNumber = 0,
    ReasonForVisit = 0,
    Disclaimer = '';

$(function(){ // this will be called when the DOM is ready
  $('#firstName').keydown(function() {
      if ($('#firstName').val().length > 2){
        $(this).css({'color' : 'inherit' });
        FirstName = 1;
      } else {
        $(this).css({'color' : '#ff0000' });
        FirstName = 0;
      }
    });

$('#lastName').keydown(function() {
    if ($('#lastName').val().length > 2){
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
    var kid1;
    var kid2;
        kid1 = '<input type"text" id="Kid1" name="Kid1" class="form-control" placeholder="Child 1"></input>';
          $('#Kid1').html(kid1);
        kid2 = '<input type"text" id="Kid2" name="Kid2" class="form-control" placeholder="Child 2"></input>';
          $('#Kid2').html(kid2);
      });

    $('#supervisingChildNo').change(function() {
      var kid1;
      var kid2;
          kid1 = '';
          $('#Kid1').html(kid1);
          kid2 = '';
          $('#Kid2').html(kid2);
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
    } if ($('#reasonForVisit').val() === "Contractor"){
        otherReason = '<input class="form-control" id="companyName" type="text" name="companyName" placeholder="Company Name" autocomplete="off">';
      $('#otherReason').html(otherReason);
    } else if ($('#reasonForVisit').val() === "Staff"){
          otherReason = '<input class="form-control" id="otherReason" type="text" name="otherReason" placeholder="Which Staff Member" autocomplete="off">';
        $('#otherReason').html(otherReason);
        }{
        otherReason = '';
        $('#otherReason').html(otherReason);
      }
    });

      $('#formAddVisitor').on('keydown keyup change',function() {
      var Count = ReasonForVisit  + LastName + FirstName;
      console.log(Count);
      if (Count === 3){
         $('#disclaimer').prop('disabled', false);
      } else if (Count != 3){
        $('#disclaimer').prop('disabled', true);
        $('#disclaimer').prop('checked', false);
        alertGiven = false;
      }
    });


 var alertGiven = false;

 function DisclaimerPrompt(Name)
{
    var CName = Name.charAt(0).toUpperCase() + Name.slice(1);
      alert("Thanks " + CName + ". Please return the tablet to the receptionist");
    alertGiven = true;
}

    $('#formAddVisitor').on('keydown keyup change',function(){
      if ($('#disclaimer').is(':checked')){
         $('#submit').prop('disabled', false);
            if (alertGiven === false) {
            DisclaimerPrompt($('#firstName').val());
            }
      } else if ($('#disclaimer').not(':checked')){
        $('#submit').prop('disabled', true);
      }
    });

});
