var navChoice = '',
    pageURL = 'Dashboard',
    pinAccepted = false,
    searchChoice = 'Date',
    searchStart = '',
    searchEnd = '',
    searchText = '',
    count = 0;


$(function(){
           $("#export").click(function(){
               $("#exportTable").tableToCSV();
           });
       });

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
        $('#reportrange span').html(start.format('L') + ' - ' + end.format('L'));
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

$(document).keyup(function(event){
  if (event.originalEvent.key === "Enter") {

    // Trigger the button element with a click
    document.getElementById("clockIn").click();
  }

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
