$( document ).ready(function() {
    $("#welcomeModal").modal('show');
  
});

  //Show or hide route setting specific fields
    $(document).on('click', '.dept.card', function (e) {
      if(event.target.id === 'Climbing'){
        $('#Route').show();
      } else {
        $('#Route').hide();
      }
    });

    $(document).on('click', '.dept.card', function (e) {
      dept = event.target.id;
      $(".dept.card").removeClass('text-white bg-primary');
      $("#" + dept + ".dept.card").addClass('text-white bg-primary');
    });

    $(document).on('click', '.feels', function (e) {
      feels = event.target.id;
      $(".feels.card").removeClass('text-white bg-primary');
      $("#" + feels + ".feels.card").addClass('text-white bg-primary');
    });
