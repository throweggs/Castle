


var $go = $('#Go');
var $loading = $('#Loading');
var $pinModal = $('#PinModal');
var pageURL = 'Dashboard',
    pinAccepted = true,
    areaEdit = true;

$go.click(function(){
  $loading.show();
  $go.hide();
});

function effectNavBar(){
  if(this.screen.width<813){
    // $('#page-top').addClass('sidebar-toggled');
    $('#accordionSidebar').addClass('toggled');

  } else if(this.screen.width>=813){
      // $('#page-top').removeClass('sidebar-toggled');
      $('#accordionSidebar').removeClass('toggled');

    }
}

$pinModal.on('shown.bs.modal', function (e) {
//jump between text fields after each digit
        $('input#firstdigit').focus();
        var container = document.getElementsByClassName("form-group")[0];
        container.onkeyup = function(e) {
            var target = e.srcElement || e.target;
            var maxLength = parseInt(target.attributes["maxlength"].value, 10);
            var myLength = target.value.length;
            if (myLength >= maxLength) {
                var next = target;
                while (next = next.nextElementSibling) {
                    if (next == null)
                        $('button#Go').focus();
                    if (next.tagName.toLowerCase() === "input") {
                        next.focus();
                        break;
                    }
                }
            }
            // Move to previous field if empty (user pressed backspace)
            else if (myLength === 0) {
                var previous = target;
                while (previous = previous.previousElementSibling) {
                    if (previous == null)
                        break;
                    if (previous.tagName.toLowerCase() === "input") {
                        previous.focus();
                        break;
                    }
                }
            }
        }
});


$go.on('click', function(){
var thePin = '';
var typedPin = $("#firstdigit").val();
    typedPin += $("#seconddigit").val();
    typedPin += $("#thirddigit").val();
    typedPin += $("#fourthdigit").val();
  pageURL = $(location).attr("href");

  pageURL = pageURL.split('/');

  pageURL = pageURL[3].split('#!');

  pageURL = pageURL[0]




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

                    if(area.Permission){
                    pinAccepted = true;
                    }
                    if(area.Edit){
                    areaEdit = true;

                    }
                }
            });
              if (pinAccepted !== true){
                alert('Hi '+results[0].Name.First+', You are not allowed access to this page! Soz.');

                window.location.href = "/DMLayout";
              }

            $('#UserName').html('<span class="navbar-text">'+results[0].Full_Name+'</span>');
            $('#login').hide();
            $('#logout').show();
          }
        // thePin = results[0].Pin;
        if(typedPin === thePin){
          $('#PinModal').modal("hide");
        }
      });
    });

//PIN AUTH
$pinModal.on('hide.bs.modal', function (e) {
      if(pinAccepted!==true){
        window.location.href = "/DMLayout";
      }
    });

$(document).ready(function() {
  // $('#PinModal').modal("show");



});
