aallowed = false;
var theSearch = {designatedAdult: { $regex: '', $options: 'i' }},
    searchChoice = 'Supervior';
var options = [ 'Supervior', 'Child','iPad'];

var theData = [],
    labels = [];

    var colourChoice = [
    '#DF691A',' #6610f2',' #6f42c1 ',' #e83e8c',' #d9534f',' #f0ad4e',' #f0ad4e',' #5cb85c',' #20c997',' #5bc0de',' #fff',' #868e96',' #343a40',' #DF691A',' #4E5D6C',' #5cb85c',' #5bc0de',' #f0ad4e',' #d9534f',' #abb6c2',' #4E5D6C'
    ];



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
      scales: {
        yAxes: [{
            display: false,
            type: 'logarithmic',
            ticks: {
                min: 0,
                stepSize: 4,
            }
        }],
        xAxes: [{
          barPercentage: 1,
          stacked: true,
          type: 'time',
          autoSkip: 'true',
            time: {
                unit: 'day',
            },
        }]
    },
      responsive: true,
      legend: {
       display: false
     },
      aspectRatio : 6,

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
            pointHoverBorderColor: colourChoice,
            pointHoverBackgroundColor: colourChoice,
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
    } else if(searchChoice === 'Supervior'){
      theSearch = {designatedAdult: { $regex: searchText, $options: 'i' }};
    } else if(searchChoice === 'Child'){
      theSearch = { childName :  { $regex: searchText, $options: 'i' }};
    } else if(searchChoice === 'iPad'){
      theSearch = {iPad: { $regex: searchText, $options: 'i' }};
    }



      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/NCClist', theSearch, function( data ) {

        })
          .done(function( data ) {

                        var exportTable = "<table>";
                        exportTable +='<tr>';
                        exportTable +='<th>Date</th>';
                        exportTable +='<th>Time</th>';
                        exportTable +="<th>Supervior's Name</th>";
                        exportTable +="<th>Child's Name</th>";
                        exportTable +='<th>iPad</th>';
                        exportTable +='</tr>';

            // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;
        dataLength = data.length;
          $('#listCount').text('Records Found: '+dataLength);

//get Date Range

          var previousDate = '';


        $('#ListCount').text(visitorListData.length);
        var dateChart = {id : 'dateChart', labels : labels, label: '# of Visitors', theData: theData, type: 'bar'},
            dayofWeekChart = {id : 'dayofWeekChart', labels : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], label: 'Participants per day of week', totVisitorsOnDay:[0,0,0,0,0,0,0], type: 'doughnut'};

            var dateRange = [];
            var firstDate = moment(data[0].created).startOf('day').subtract(1,'day').format('L');
            var lastDate = moment(data[dataLength-1].created).startOf('day').add(1,'day').format('L');


            var theDate = firstDate;


            while ( theDate < lastDate ){
              dateRange.push(theDate);
              theDate = moment(theDate).add(1,'days').format('L');


              }
            dateChart.labels = dateRange;

            $.each(data, function(i,item){
            var dov = moment(item.created).format('L');
            var found = false;

                    $.each(dateRange,function(di,date){
                      if (dov === date){
                        if((dateChart.theData[di]/dateChart.theData[di]) === 1){
                            dateChart.theData[di]++;
                          } else {
                            dateChart.theData[di] = 1;
                        }
                      } else {
                        if((dateChart.theData[di]/dateChart.theData[di]) === 1){
                          } else {
                            dateChart.theData[di] = 0;
                        }
                      }

                    });

                });


          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(i, item){

              //Number of Participants for any day of the week
              var dow = moment(item.created).isoWeekday();
              dayofWeekChart.totVisitorsOnDay[dow]++;


              perviousDate = item.created;

              tableContent += '<tr>';
              tableContent += '<td>' + moment(item.created).format('LL') + '</td>';
              tableContent += '<td>' + moment(item.created).format('LT') + '</td>';

              tableContent += '<td>' +  toTitleCase(item.designatedAdult) + '</td>';
              tableContent += '<td>' +  toTitleCase(item.childName) + '</td>';
              tableContent += '<td>'+ item.iPad + ' <p hidden> '+ this.iPad +'</p></td>';
              // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
              tableContent += '</tr>';



              tableContent += '</td>';
              tableContent += '</tr>';

              exportTable += '<tr>';
              exportTable += '<td>' + moment(item.created).format('LL') + '</td>';
              exportTable += '<td>' + moment(item.created).format('LT') + '</td>';
              exportTable += '<td>' +  toTitleCase(item.designatedAdult) + '</td>';
              exportTable += '<td>' +  toTitleCase(item.childName) + '</td>';;
              exportTable += '<td>'+ item.iPad +'</td>';
              exportTable +=  ' </tr>';
          });

          exportTable += '</tr>';

          // Inject the whole content string into our existing HTML table
          $('table#visitorTable tbody').html(tableContent);


          $('table#exportTable').html(exportTable);
          $('table#visitorTable').show();
          $('#loading').hide();

          renderDoughnutChart('dayofWeekChart', dayofWeekChart.labels,dayofWeekChart.label,dayofWeekChart.totVisitorsOnDay,dayofWeekChart.type);
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
