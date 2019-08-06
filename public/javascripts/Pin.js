//Access Control Functions for Dashboard
$( document ).ready(function() {

  $('#loading').hide();


    $(":input[type='password']").keyup(function(event){
      count++;

      if(count === 4){
        $('button#clockIn').focus();
      }
        if ($(this).next('[type="password"]').length > 0){
            $(this).next('[type="password"]')[0].focus();

        }else{
            if ($(this).parent().next().find('[type="password"]').length > 0){
              $(this).parent().next().find('[type="password"]')[0].focus();
              count++;

            }
        }

    });
    $('#PinModal').on('hide.bs.modal', function (e) {
      if(pinAccepted!==true){
        window.location.href = "/Dashboard";
      }
    });

    $('#PinModal').on('shown.bs.modal', function (e) {
       count = 0;

        $('input#firstdigit').focus();
        $('button#clockIn').on('click', function(){
        var thePin = '';
        var typedPin = $("#firstdigit").val();
            typedPin += $("#seconddigit").val();
            typedPin += $("#thirddigit").val();
            typedPin += $("#fourthdigit").val();
          pageURL = $(location).attr("href");

          pageURL = pageURL.split('/');
          pageURL = pageURL[3].split('#!');
          pageURL = pageURL[0].split('view');
          pageURL = pageURL[1];



            $.getJSON( '/staff/getAStaff', {Pin: typedPin }, function(results, res) {
                  $('button#clockIn').hide();
                  $('#loading').show();


              })
              .fail(function(results, res) {
                console.log(res);

                })
              .done(function(results, res) {

                  if(results.length === 0){
                    thePin = '';
                  } else {
                    thePin = results[0].Pin;
                    theAccess = results[0].Access_Rights;
                    $.each(theAccess, function(i, area){
                        if(area.Name == pageURL){

                            if(area.Permission === true){
                            pinAccepted = true;
                            }
                        }
                    });
                      if (pinAccepted !== true){
                        alert('Hi '+results[0].Name.First+', You are not allowed access to this page! Soz.');
                        window.location.href = "/Dashboard";
                      }


                    $('#userName').html(  '<span class="navbar-text">'+results[0].Full_Name+'</span>');

                  }
                // thePin = results[0].Pin;
                if(typedPin === thePin){
                  $('#PinModal').modal("hide");
                } else {

                  $('#firstdigit').addClass('is-invalid');
                  $('#firstdigit').val('');
                  $('#seconddigit').addClass('is-invalid');
                  $('#seconddigit').val('');
                  $('#thirddigit').addClass('is-invalid');
                  $('#thirddigit').val('');
                  $('#fourthdigit').addClass('is-invalid');
                  $('#fourthdigit').val('');
                    $('.log-status').addClass('is-invalid');
                     $('.alert').fadeIn(500);
                     $('button#clockIn').show();
                     $('#loading').hide();
                  $('#firstdigit').on('focus',function(){
                      $('#firstdigit').removeClass('is-invalid');
                      $('#firstdigit').val('');
                      $('#seconddigit').removeClass('is-invalid');
                      $('#seconddigit').val('');
                      $('#thirddigit').removeClass('is-invalid');
                      $('#thirddigit').val('');
                      $('#fourthdigit').removeClass('is-invalid');
                      $('#fourthdigit').val('');

                  });
                }
              });
        });
    });


});
