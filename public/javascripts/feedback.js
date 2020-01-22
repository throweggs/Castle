var theForm = {area_of_feedback : 'none given', feels : 'meh'};


$( document ).ready(function() {
    // $("#welcomeModal").modal('show');
    $('button#submit').on('click', addFeedback);


});


    //Show or hide route setting specific fields
      $(document).on('click', '.dept', function (e) {
        if(e.target.parentNode.id === 'Staff'){
          $('#StaffFields').show();
        } else {
          $('#StaffFields').hide()
        }
      });

  //Show or hide route setting specific fields
    $(document).on('click', '.dept', function (e) {
      if(e.target.parentNode.id === 'Climbing'){
        $('#ClimbingFields').show();
      } else {
        $('#ClimbingFields').hide();
      }
    });

//Change back ground colour of selected options
    $(document).on('click', '.dept.card', function (e) {
      dept = e.target.parentNode.id;
      theForm.area_of_feedback = dept
      $(".dept.card").removeClass('text-white bg-primary');
      $("#" + dept + ".dept.card").addClass('text-white bg-primary');
    });

//Change back ground colour of selected options
    $(document).on('click', '.feels', function (e) {
      feels = e.target.parentNode.id;
      theForm.feels = feels
      $(".feels.card").removeClass('text-white bg-primary');
      $("#" + feels + ".feels.card").addClass('text-white bg-primary');
    });



function addFeedback(){

  var theFeedback = [];
    theFeedback = { created : moment(),
                    person : {
                      Name : $('input#nameField').val(),
                      PhoneNumber : $('input#contactPhone').val(),
                      EmailAddress : $('input#contactEmail').val()
                    },
                    climbing_complaint : {
                      Line : $('input#routeLine').val(),
                      Grade : $('input#routeGrade').val(),
                      Colour : $('input#routeColour').val(),
                      Setter : $('input#routeSetter').val()
                    },
                    staff_complaint_department : $('input#StaffDepartment').val(),
                    feedback : $('textarea#feedback').val(),
                    area_of_feedback :  theForm.area_of_feedback,
                    feels : theForm.feels,
                    contact_me : $('input#contactMe').val(),
                    processed : [false, moment()]
                  }

    var theData = JSON.stringify(theFeedback);



$.ajax({
    type: 'POST',
    data: theData,
    url: 'feedback/postFeedback',
    dataType: 'JSON',
    contentType: 'application/json',
}).done(function( response, results ) {
  console.log(response.msg)
    // Check for successful (blank) response
    if (response.msg === null) {


       $("#thankyouModal").modal('show');
       setTimeout(function () {
         location.reload();
              resetPage();
       }, 10000);


    }
    else {

        // If something goes wrong, alert the error message that our service returned
        console.log('Error: ');
        console.log(response);

    }
});
    }
