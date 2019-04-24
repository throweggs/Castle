var allowed = false;
var theSearch = {fullName: { $regex: '', $options: 'i' }},
    searchChoice = 'Full Name';
var options = [ 'Date', 'Full Name', 'Child Name', 'Reason', 'iPad'];
var graphData = {labels : [], datasets : []};

var colours = [
{area: 'Cafe', colour : 'rgb(255, 99, 132)'},//red
{area: 'Staff_Member', colour: 'rgb(255, 205, 86)'},//yellow
{area: 'Contractor', colour: 'rgb(75, 192, 192)'},//green
{area: 'Garden', colour: 'rgb(54, 162, 235)'},//blue
{area: 'Climbers_Clinic', colour: 'rgb(153, 102, 255)'},//purple
{area: 'Other', colour: 'rgb(201, 203, 207)'}//grey
];

var colourChoice = [
'#DF691A',' #6610f2',' #6f42c1 ',' #e83e8c',' #d9534f',' #f0ad4e',' #f0ad4e',' #5cb85c',' #20c997',' #5bc0de',' #fff',' #868e96',' #343a40',' #DF691A',' #4E5D6C',' #5cb85c',' #5bc0de',' #f0ad4e',' #d9534f',' #abb6c2',' #4E5D6C'
];


function renderChart() {

    var ctx = document.getElementById("myChart").getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: graphData,
        options: {

          aspectRatio : 6,
          scales: {
            yAxes: [{
              stacked: false,
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
        }
    }
    });
}

function resetChart() {
  var theChart = document.getElementById("myChart");
  var theContainer = document.getElementsByClassName("chart-container");
  theContainer.parentNode.removeChild(theChart);
$( "#chartContainer" ).append( $( 'canvas#myChart' ) );

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
  graphData = {labels : [], datasets : []};
    $('#pageTitle').text(tableTitle);

if(searchChoice === 'Date'){
  theSearch = {created: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
} else if(searchChoice === 'Full Name'){
  theSearch = {fullName: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'Child Name'){
  theSearch = { ChildNames : { $elemMatch: { name: { $regex: searchText, $options: 'i' }}}};
} else if(searchChoice === 'Reason'){
  theSearch = {reasonForVisit: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'iPad'){
  theSearch = {iPad: { $regex: searchText, $options: 'i' }};
}



      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/visitorlist', theSearch, function( data ) {
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
              count = 0;

            while (theDate !== lastDate) {

               graphData.labels.push(theDate);
              theDate =  moment(theDate).add(1, 'day').format('L');
            }
//get Catergories
            $.each(data,function(i,theData){
              var reasonMatch = false;
              var count = 0;
              $.each(graphData.datasets,function(ii,aReason){
                count = ii+1;
                  if(theData.reasonForVisit === aReason.label){
                    reasonMatch = true;

                    graphData.datasets[ii].date.push(moment(theData.created).startOf('day').format('L'));
                  }
              });
            if (reasonMatch === false){
                var lineColour = '';
                var rfv = theData.reasonForVisit.replace(" ","_");
              // $.each(colours,function(i, colour){
              //   if(colour.area === rfv){
              //     lineColour = colour.colour;
              //   }
              // });
              graphData.datasets.push({
                          pointRadius : 0,
                           fill: false,
                           borderColor: colourChoice[count],
                           backgroundColor: colourChoice[count],
                           label: theData.reasonForVisit,
                           data: [],
                           date: [moment(theData.created).startOf('day').format('L')]
                         });
            }
            });
// Count Catergories
          $.each(graphData.datasets,function(i,aDataSet){
            $.each(aDataSet.date,function(ii,aDate){
              $.each(graphData.labels,function(iii,aLabel){
                if(aLabel === aDate){
                  if(graphData.datasets[i].data[iii] > 0){
                    graphData.datasets[i].data[iii] = graphData.datasets[i].data[iii] +1;
                    } else {
                    graphData.datasets[i].data[iii] = 1;
                  }
                } else {
                  graphData.datasets[i].data[iii] = 0;
                }
              });
            });
          });

          renderChart();

        $('#ListCount').text(visitorListData.length);
        var disclaimerTick,
            photoTick,
            supervisingChild,
            childPointer,
            child,
            reasonFVPointer,
            reasonFV;
          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(i, item){


                if (this.PhotographyWaverAgreement === 'Agreed'){
                photoTick = '<i class="far fa-check-square"></i>';
                } else {
                photoTick = '<i class="far fa-square"></i>';
                }

              if (this.ChildNames[0].name === ''){
                child = '';
                supervisingChild = '<i class="far fa-square"></i>';
                childPointer = '';
              } else {
                child = this.ChildNames[0].name + ", " + this.ChildNames[1].name;
                  supervisingChild = '<i class="far fa-check-square"></i>';
                  childPointer = 'style="cursor: context-menu"';

              }
              // if (this.ChildNames.Kid2 === undefined){
              //   Child = Child;
              //   childPointer = '';
              // } else {
              //   Child = Child + ' & ' + this.ChildNames.Kid2;
              //   childPointer = 'style="cursor: context-menu"';
              // }
              if (this.reasonForVisit !== 'Other'){
              reasonFVPointer = '';
              } else {
              reasonFVPointer = 'style="cursor: context-menu"';
              }

              if (this.otherReason === null){
              reasonFV = 'Not Given';
            } else if (this.otherReason !== ''){
              reasonFV = this.otherReason;
              }


              tableContent += '<tr>';
              tableContent += '<td>' + moment(this.created).format('L') + '</td>';
              tableContent += '<td>' + moment(this.created).format('LT') + '</td>';
              tableContent += '<td>' + this.fullName + '</td>';
                // tableContent += '<td><a href="#" data-toggle="tooltip" title="' + ReasonFV + '" class="linkShowVisitor" rel="' + this._id + '">' + this.reasonForVisit + '</a><p hidden>'+ ': ' + ReasonFV +'</p></td>';
              tableContent += '<td '+ reasonFVPointer +' data-toggle="tooltip" title="' + reasonFV + '" rel="' + this._id + '">' + this.reasonForVisit + '<p hidden>'+ ': ' + reasonFV +'</p></td>';
              tableContent += '<td '+ childPointer +' data-toggle="tooltip" title="' + child + '" rel="' + this._id + '">' + supervisingChild + '<p hidden>'+ child +'</p></td>';
              tableContent += '<td>'+ photoTick + ' <p hidden> '+ this.PhotographyWaverAgreement +'</p></td>';
              tableContent += '<td>'+ this.iPad + ' <p hidden> '+ this.iPad +'</p></td>';
              // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
              tableContent += '</tr>';
          });

          // Inject the whole content string into our existing HTML table
          $('table#visitorTable tbody').html(tableContent);
          theExport = tableContent;

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
