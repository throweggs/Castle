allowed = false;
var theSearch = {Facilitator: { $regex: '', $options: 'i' }},
    searchChoice = 'Facilitator';
var options = [ 'Date', 'Facilitator', 'Session Type', 'Start Location', 'iPad'];
var theData = [],
    labels = [];





function showParticipants(theParticipant){
  console.log(theParticipant.id);
  theID = 'Participants_'+ theParticipant.id;
  var x = document.getElementById(theID);
  if (x.style.display === "none") {
    $(theParticipant).children().removeClass('fa-angle-right');
    $(theParticipant).children().addClass('fa-angle-down');
    x.style.display = "";
  } else {
    x.style.display = "none";
    $(theParticipant).children().removeClass('fa-angle-down');
    $(theParticipant).children().addClass('fa-angle-right');
  }
}

function rotateMe(icon){
theID = '#'+icon.id;

  $(theID).hover(function() {
      $(theID).children().removeClass('fa-angle-right');
      $(theID).children().addClass('fa-angle-down');
  }, function() {
      $(theID).children().removeClass('fa-angle-down');
      $(theID).children().addClass('fa-angle-right');

  });
}

function renderChart() {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Participants',
            data: theData,
            backgroundColor:
                'rgba(255, 99, 132, 0.2)',

            borderColor:
                'rgba(255, 99, 132, 1)',

            borderWidth: 1
        }]
    },
    options: {

      aspectRatio : 6,

}
});
}


$(document).ready(function() {

  $('#PinModal').modal("show");
  $('#visitorLink').addClass('active');
  $('.form.active').removeClass('active');

  var select = document.getElementById('searchOptions');

  $.each(options,function(i, option){
      var opt = document.createElement('option');
      opt.value = option;
      opt.innerHTML = option;
      select.appendChild(opt);
  });


  if (pinAccepted === true){
    populateVisitorTable('Visitors');
    allowed = true;
  }
});


$(document).on('hidden.bs.modal', function(e) {

if(e.target.id==='PinModal'){
  if (pinAccepted === true){
    allowed = true;
    populateVisitorTable('Visitors');
  }
}
});


function populateVisitorTable(tableTitle) {
    theData = [];
    labels = [];
    $('#pageTitle').text('The Session');

if(searchChoice === 'Date'){
  theSearch = {created: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
} else if(searchChoice === 'Facilitator'){
  theSearch = {Facilitator: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'Session Type'){
  theSearch = { Session_Type : { $elemMatch: { name: { $regex: searchText, $options: 'i' }}}};
} else if(searchChoice === 'Start Location'){
  theSearch = {Start_Location: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'iPad'){
  theSearch = {iPad: { $regex: searchText, $options: 'i' }};
}



      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/wbslist', theSearch, function( data ) {

        })
          .done(function( data ) {

            // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;
        dataLength = data.length;
          $('#listCount').text('Records Found: '+dataLength);

//get Date Range
          var firstDate = moment(data[0].created).startOf('day').subtract(1,'day').format('L');
          var lastDate = moment(data[dataLength-1].created).startOf('day').add(1,'day').format('L');

          var theDate = firstDate,
              count = 0,
              previousDate = '';

            while (theDate !== lastDate) {

               labels.push(theDate);
              theDate =  moment(theDate).add(1, 'day').format('L');
            }

        $('#ListCount').text(visitorListData.length);
        var participantsCount;
          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(i, item){

              participantsCount = item.Participants.length;
              if(previousDate ===item.Create_Date){
                theData[i] = theData[i] + participantsCount;
              } else {
                theData.push(participantsCount);
              }

              perviousDate = item.Create_Date;

              tableContent += '<tr>';
              tableContent += '<td><div class="showMore" onmouseover="rotateMe(this)" id="'+item._id+'" onclick="showParticipants(this);"><i class="fas fa-angle-right"></i></div> </td>';
              tableContent += '<td>' + moment(item.created).format('L') + '</td>';
              tableContent += '<td>' + item.Facilitator + '</td>';
              tableContent += '<td>' + item.Session_Type + '</td>';
              tableContent += '<td>' + item.Start_Location + '</td>';
              tableContent += '<td>' + participantsCount + '</td>';
              tableContent += '<td>'+ item.iPad + ' <p hidden> '+ this.iPad +'</p></td>';
              // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
              tableContent += '</tr>';
              tableContent += '<tr id=Participants_'+item._id+' style="display:none; padding: 0px; margin: 0px;">';
              tableContent += '<td colspan="7" style=" padding: 0px; margin: 0px;">';
              tableContent += '<table class="table table-sm thead-light innerTable table-stripped text-nowrap table-dark"  cellspacing="0" width="100%">';
              tableContent +=   '<th>Participant</th><th>Reason For Visit</th><th>First Time</th>';
                  $.each(item.Participants,function(i,person){
                    tableContent +=   '<tr>';
                    tableContent +=     '<td>'+person.First_Name+' '+person.Last_Name+'</td>';
                    tableContent +=     '<td>'+person.Reason+'</td>';
                    tableContent +=     '<td>'+person.First_Time+'</td>';
                    tableContent +=  ' </tr>';
                  });

              tableContent += '</table>';
              tableContent += '</td>';
              tableContent += '</tr>';
          });

          // Inject the whole content string into our existing HTML table
          $('table#visitorTable tbody').html(tableContent);
          theExport = tableContent;
          renderChart();
      });
    }

// Set up search dates
$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
  //do something, like clearing an input

  searchStart = picker.startDate.format('YYYY-MM-DD');
  searchEnd = picker.endDate.format('YYYY-MM-DD');
  populateVisitorTable();


});




$(document).on('keyup',function (e){

  if(e.target.id === 'searchText'){
    searchText = e.target.value;
    populateVisitorTable();
  }
});
