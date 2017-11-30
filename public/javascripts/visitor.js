var Count = 0,
    FirstName = 0,
    LastName = 0,
    ContactNumber = 0,
    ReasonForVisit = 0,
    Disclaimer = '',
    output = false,
    theText = '';


function successAlert(theText, alertType, removeMe){
  if (removeMe === false){
        output = '<div class="alert '+ alertType +' alert-dismissable fade in">';
        output += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        output += theText;
        output += '</div>';
    $('#successAlert').html(output);
  } else if (removeMe === true){
        output = "";
    $('#successAlert').html(output);
  }
}

function failAlert(theText, alertType, removeMe){
  if (removeMe === false){
        output = '<div class="alert '+ alertType +' alert-dismissable fade in">';
        output += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        output += theText;
        output += '</div>';
    $('#failAlert').html(output);
  } else if (removeMe === true){
        output = "";
    $('#failAlert').html(output);
  }
}


$(function(){ // this will be called when the DOM is ready
    $('#firstName').keydown(function() {
        if ($('#firstName').val().length >= 2){
          $(this).css({'color' : 'inherit' });
          FirstName = 1;
        } else {
          $(this).css({'color' : '#ff0000' });
          FirstName = 0;
        }
      });

    $('#lastName').keydown(function() {
        if ($('#lastName').val().length >= 2){
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
          kid1 = '<input type"text" id="Kid1" name="Kid1" class="form-control" placeholder="Child 1"></input>';
            $('#Kid1').html(kid1);
          kid2 = '<input type"text" id="Kid2" name="Kid2" class="form-control" placeholder="Child 2"></input>';
            $('#Kid2').html(kid2);
          kid3 = '<input type"text" id="Kid3" name="Kid3" class="form-control" placeholder="Child 3"></input>';
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
        } else {
          otherReason = '';
          $('#otherReason').html(otherReason);
        }
      });

      $('#formAddVisitor').on('keydown keyup change',function() {
      var Count = ReasonForVisit + LastName + FirstName;
          if (Count === 3){
            $('#disclaimer').prop('disabled', false);
          } else if (Count != 3){
            $('#disclaimer').prop('disabled', true);
            $('#disclaimer').prop('checked', false);
          }
      });

    $('#formAddVisitor').on('keydown keyup change',function(){
      if ($('#disclaimer').is(':checked')){
            $('#submit').prop('disabled', false);
      } else if ($('#disclaimer').not(':checked')){
          $('#submit').prop('disabled', true);
      }
    });

    $('#disclaimer').is(':checked', function(){
      if ($('#disclaimer').val()==='I Agree'){
        var CName = ($('#firstName').val());
            CName = CName.charAt(0).toUpperCase() + CName.slice(1);
        var theText = '<strong>Thanks ' + CName + '. </strong> Please had the tablet back to the receptionist.';
        successAlert(theText, 'alert-success', false);
      } else if ($('#disclaimer').val() !='I Agree'){

        successAlert("", 'alert-success', true);
      }

    });

    $('#formAddVisitor').on('blur change',function() {
    var Count = LastName + FirstName;
        if (Count === 2){
            failAlert("bugger 1", "", true);
            if ($('#reasonForVisit').val() === "") {
                theText = 'Please make sure you have selected a <strong> REASON FOR VISIT</strong>, thanks.';
                failAlert(theText, 'alert-danger', false);
            } else if ($('#reasonForVisit').val() !== ""){
                      failAlert("buger2", 'alert-danger', true);
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


});
