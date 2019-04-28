aallowed = false;
var theSearch = {Facilitator: { $regex: '', $options: 'i' }},
    searchChoice = 'Facilitator';
var options = [ 'Date', 'Facilitator','Participant', 'Session Type', 'Start Location', 'iPad'];

var theData = [],
    labels = [];

    var colourChoice = [
    '#DF691A',' #6610f2',' #6f42c1 ',' #e83e8c',' #d9534f',' #f0ad4e',' #f0ad4e',' #5cb85c',' #20c997',' #5bc0de',' #fff',' #868e96',' #343a40',' #DF691A',' #4E5D6C',' #5cb85c',' #5bc0de',' #f0ad4e',' #d9534f',' #abb6c2',' #4E5D6C'
    ];


function showParticipants(theParticipant){
  console.log('show Participants');
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
    console.log('rotate me');
theID = '#'+icon.id;

  $(theID).hover(function() {
      $(theID).children().removeClass('fa-angle-right');
      $(theID).children().addClass('fa-angle-down');
  }, function() {
      $(theID).children().removeClass('fa-angle-down');
      $(theID).children().addClass('fa-angle-right');

  });
}

function renderBarChart(id, labels, label, theData, type) {
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
    type: type,
    data: {
        labels: labels,
        datasets: [{
            label: label,
            data: theData,
            backgroundColor:
                'rgba(255, 99, 132, 0.2)',

            borderColor:
                'rgba(255, 99, 132, 1)',

            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      legend: {
       display: false
     },
      aspectRatio : 3,

}
});
}

function renderDoughnutChart(id, labels, label, theData, type) {
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
    type: type,
    data: {
        labels: labels,
        datasets: [{
            label: label,
            backgroundColor: colourChoice,
            data: theData,
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      legend: {
       display: false
     },
      aspectRatio : 2,

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
    populateVisitorTable();
  }
}
});


function populateVisitorTable() {

    theData = [];
    labels = [];


if(searchChoice === 'Date'){
  theSearch = {created: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
} else if(searchChoice === 'Participant'){
  theSearch = {Participants: {$elemMatch: { First_Name: { $regex: searchText, $options: 'i' } } } };
} else if(searchChoice === 'Facilitator'){
  theSearch = {Facilitator: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'Session Type'){
  theSearch = { Session_Type :  { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'Start Location'){
  theSearch = {Start_Location: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'iPad'){
  theSearch = {iPad: { $regex: searchText, $options: 'i' }};
}



      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/theSessionlist', theSearch, function( data ) {

        })
          .done(function( data ) {


            // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;
        dataLength = data.length;
          $('#listCount').text('Records Found: '+dataLength);

//get Date Range

          //
          var previousDate = '';

            // while (theDate !== lastDate) {
            //
            //    labels.push(theDate);
            //   theDate =  moment(theDate).add(1, 'day').format('L');
            // }



        $('#ListCount').text(visitorListData.length);
        var dateChart = {id : 'dateChart', labels : labels, label: '# of Participants', theData: theData, type: 'bar'},
        rfvChart = {id : 'rfvChart', labels : [], label: 'reson for visit', theData: [], type: 'doughnut'},
        ftChart = {id : 'ftChart', labels : [], label: 'first time', theData: [], type: 'doughnut'},
        fanChart = {id : 'fanChart', labels : [], label: 'Facilitator against #', numSessions: [], totalPart: [], averagePart: [], type: 'doughnut'};
        var participantsCount;

          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(i, item){
              participantsCount = item.Participants.length;

              var fanlabelFound = false;

            $.each(fanChart.labels,function(i,label){
              if(label===item.Facilitator){
                fanChart.numSessions[i] ++;
                  fanChart.totalPart[i] = fanChart.totalPart[i] + participantsCount;
                fanlabelFound = true;
              }
          });
              if(fanlabelFound === false){

                fanChart.labels.push(item.Facilitator);
                fanChart.numSessions[fanChart.labels.length-1] = 1;
                fanChart.totalPart[fanChart.labels.length-1] = participantsCount;
              }



              if(previousDate ===item.Create_Date){
                dateChart.numSessions = dateChart.theData + { t:moment(item.created).format('L'), y: participantsCount};

              } else {
                dateChart.theData.push({ t:moment(item.created).format('L'), y: participantsCount});
                dateChart.labels.push(moment(item.created).format('L'));
              }

              perviousDate = item.Create_Date;

              tableContent += '<tr>';
              tableContent += '<td><div class="showMore" onmouseover="rotateMe(this)" id="'+item._id+'" onclick="showParticipants(this);"><i class="fas fa-angle-right"></i></div> </td>';
              tableContent += '<td>' + moment(item.created).format('L') + '</td>';
              tableContent += '<td>' + item.Facilitator + '</td>';
              tableContent += '<td>' + item.Session_Type + '</td>';
              tableContent += '<td>' + item.Start_Location + '</td>';
              tableContent += '<td>' + participantsCount + '</td>';
              tableContent += '<td>'+ item.iPadin + ' <p hidden> '+ this.iPad +'</p></td>';
              // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
              tableContent += '</tr>';
              tableContent += '<tr id=Participants_'+item._id+' style="display:none; padding: 0px; margin: 0px;">';
              tableContent += '<td colspan="7" style=" padding: 0px; margin: 0px;">';
              tableContent += '<table class="table table-sm thead-light innerTable table-stripped text-nowrap table-dark"  cellspacing="0" width="100%">';
              tableContent +=   '<th>Participant</th><th>Reason For Visit</th><th>First Time</th>';
                  $.each(item.Participants,function(i,person){
                    var rfvlabelFound = false;

                    $.each(rfvChart.labels,function(i,label){
                      if(label===person.Reason){
                        rfvChart.theData[i] ++;
                        rfvlabelFound = true;
                      }
                  });
                      if(rfvlabelFound === false){
                        rfvChart.labels.push(person.Reason);
                        rfvChart.theData[rfvChart.labels.length-1] = 1;
                      }

                      var ftlabelFound = false;

                      $.each(ftChart.labels,function(i,label){
                        if(label===person.First_Time){
                          ftChart.theData[i] ++;
                          ftlabelFound = true;
                        }
                    });
                        if(ftlabelFound === false){
                          ftChart.labels.push(person.First_Time);
                          ftChart.theData[ftChart.labels.length-1] = 1;
                        }

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


          $.each(fanChart.labels,function(i,label){
          fanChart.averagePart[i] = fanChart.totalPart[i]/fanChart.numSessions[i];
          });
          console.log(fanChart)

          // Inject the whole content string into our existing HTML table
          $('table#visitorTable tbody').html(tableContent);


          $('table#exportTable').html(exportTable);
          $('table#visitorTable').show();
          $('#loading').hide();
          renderDoughnutChart(rfvChart.id, rfvChart.labels,rfvChart.label,rfvChart.theData,rfvChart.type);
          renderDoughnutChart(ftChart.id, ftChart.labels,ftChart.label,ftChart.theData,ftChart.type);
          renderDoughnutChart('fChart', fanChart.labels,fanChart.label,fanChart.numSessions,fanChart.type);
          renderDoughnutChart('fanChart', fanChart.labels,fanChart.label,fanChart.averagePart,fanChart.type);
          renderBarChart(dateChart.id, dateChart.labels,dateChart.label,dateChart.theData,dateChart.type);
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
