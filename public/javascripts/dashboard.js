var navChoice = '',
    pageURL = 'Dashboard',
    pinAccepted = false,
    searchChoice = 'Date',
    searchStart = '',
    searchEnd = '',
    searchText = '';




$(document).ready(function() {


//Load StaffView jade file onto page
    $('#StaffLink').click(function(){
    showTheStaffPage();
    });


//Load TeamView jade file onto page
    $('#TeamsLink').click(function(){
      showTheTeamPage();
    });
});


$(function() {
    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);
    searchStart = start;
    searchEnd = end;
    cb(start, end);

});



//Access Control Functions for Dashboard
$( document ).ready(function() {
  $('#loading').hide();


    $(":input[type='password']").keyup(function(event){
        if ($(this).next('[type="password"]').length > 0){
            $(this).next('[type="password"]')[0].focus();
        }else{
            if ($(this).parent().next().find('[type="password"]').length > 0){
                $(this).parent().next().find('[type="password"]')[0].focus();
            }
        }
    });
    $('#PinModal').on('hide.bs.modal', function (e) {
      if(pinAccepted!==true){
        window.location.href = "/Dashboard";
      }
    });

    $('#PinModal').on('shown.bs.modal', function (e) {

        $("#firstdigit").focus();
        $("#firstdigit").focus();
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
                    console.log(results);
                  if(results.length === 0){
                    thePin = '';
                  } else {
                    thePin = results[0].Pin;
                    theAccess = results[0].Access_Rights;
                    $.each(theAccess, function(i, area){
                        if(area.Name == pageURL){
                          console.log('Match');
                            if(area.Permission === true){
                            pinAccepted = true;
                            }
                        }
                    });
                      if (pinAccepted !== true){
                        alert('Hi '+results[0].First_Name+', You are not allowed access to this page! Soz.');
                        window.location.href = "/Dashboard";
                      }


                    $('#userName').html(  '<span class="navbar-text">'+results[0].First_Name + ' ' + results[0].Last_Name+'</span>');

                  }
                // thePin = results[0].Pin;

                console.log(typedPin);
                console.log(thePin);
                if(typedPin === thePin){
                  $('#PinModal').modal("hide");
                } else {
                  console.log('no match');
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

$(document).on('change',function(e){
  if(e.target.id == 'searchOptions'){
    searchChoice = e.target.value;
    console.log(e.target);
    if(e.target.value === 'Date'){
      $('#reportrange').show();
      $('input#searchText').hide();
    } else if(e.target.value !== 'Date'){
      $('#reportrange').hide();
      $('input#searchText').show();
    }
  }
});

//Nav Choices
$('#visitorLink').click(function(){
  navChoice = 'populateVisitorTable';
  populateVisitorTable('Visitor List');
  console.log('clicked');
});
