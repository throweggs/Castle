var allowed = false;

var theSearch = {created: { $gt: moment().startOf('day').format(), $lt: moment().add('24','hours').format() }};
    searchChoice = 'Date';
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






$(document).ready(function() {
    populateVisitorTable('Visitors');

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

    allowed = true;
  }
});





function populateVisitorTable(tableTitle) {
  graphData = {labels : [], datasets : []};
    $('#pageTitle').text(tableTitle);

if(searchChoice === 'Date'){
  theSearch = {created: { $gt: moment().startOf('day').format(), $lt: moment().add('24','hours').format() }};
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
      $.getJSON( '/users/visitorlist5', theSearch, function( data ) {
        })
          .done(function( data ) {

            var exportTable = "<table>";
            exportTable +='<tr>';
            exportTable +='<th>Date</th>';
            exportTable +='<th>Time</th>';
            exportTable +='<th>First Name</th>';
            exportTable +='<th>Last Name</th>';
            exportTable +='<th>Reason</th>';
            exportTable +='<th>Description</th>';
            exportTable +='<th>Child 1</th>';
            exportTable +='<th>Child 2</th>';
            exportTable +='<th>Photo Waver</th>';
            exportTable +='</tr>';


            // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;
        dataLength = data.length;
          $('#listCount').text('Records Found: '+dataLength);

//get Date Range
          var dateRange = [];
          var firstDate = moment().startOf('day').subtract(1,'day').format('L');

          var lastDate = moment().startOf('day').add(1,'day').format('L');


          var theDate = firstDate;


          while ( theDate < lastDate ){
            dateRange.push(theDate);
            theDate = moment(theDate).add(1,'days').format('L');


            }
          graphData.labels = dateRange;

          $.each(data, function(i,item){
          var dov = moment(item.created).format('L');
          var rfv = item.reasonForVisit;
          var found = false;
              $.each(graphData.datasets,function(ri, theData){
                if(theData.label === rfv){
                  found = true;

                  $.each(dateRange,function(di,date){
                    if (dov === date){
                      if((graphData.datasets[ri].data[di]/graphData.datasets[ri].data[di]) === 1){
                          graphData.datasets[ri].data[di]++;
                        } else {
                          graphData.datasets[ri].data[di] = 1;
                      }
                    } else {
                      if((graphData.datasets[ri].data[di]/graphData.datasets[ri].data[di]) === 1){
                        } else {
                          graphData.datasets[ri].data[di] = 0;
                      }
                    }

                  });
                }
              });
              if(found === false){
                graphData.datasets.push({
                  label: rfv,
                  data: [],
                  borderColor: colourChoice[graphData.datasets.length],
                  pointHoverBorderColor: colourChoice[graphData.datasets.length],
                  pointHoverBackgroundColor: colourChoice[graphData.datasets.length],
                  borderWidth: 2,
                  pointRadius: 0,
                  fill: false,
                });
              }
          });




        $('#ListCount').text(visitorListData.length);
        var disclaimerTick,
            photoTick,
            waverAgreed,
            supervisingChild,
            childPointer,
            child,
            reasonFVPointer,
            reasonFV;
          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(i, item){
                disclaimerTick = '';
                photoTick = '';
                waverAgreed = '';
                supervisingChild = '';
                childPointer = '';
                child = '';
                reasonFVPointer = '';
                reasonFV = '';

                if (this.PhotographyWaverAgreement === 'Agreed'){
                photoTick = '<i class="far fa-check-square"></i>';
                waverAgreed = 'Agreed';
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
              tableContent += '<td '+ reasonFVPointer +' data-toggle="tooltip" title="' + reasonFV + '" rel="' + this._id + '">' + this.reasonForVisit + '<p hidden>'+ ': ' + reasonFV +'</p></td>';
              tableContent += '<td '+ childPointer +' data-toggle="tooltip" title="' + child + '" rel="' + this._id + '">' + supervisingChild + '<p hidden>'+ child +'</p></td>';
              tableContent += '<td>'+ photoTick + ' <p hidden> '+ this.PhotographyWaverAgreement +'</p></td>';
              tableContent += '<td>'+ this.iPad + ' <p hidden> '+ this.iPad +'</p></td>';
              tableContent += '</tr>';

              exportTable += '<tr>';
              exportTable += '<td>'+ moment(this.created).format('L')+'</td>';
              exportTable += '<td>' + moment(this.created).format('LT') + '</td>';
              exportTable += '<td>' + this.firstName + '</td>';
              exportTable += '<td>' + this.lastName + '</td>';
              exportTable += '<td>' + this.reasonForVisit + '</td>';
              exportTable += '<td>' + reasonFV + '</td>';
              exportTable += '<td>' +  this.ChildNames[0].name + '</td>';
              exportTable += '<td>' +  this.ChildNames[1].name + '</td>';
              exportTable += '<td>' + waverAgreed + '</td>';

          });

          exportTable += '</tr>';
          // Inject the whole content string into our existing HTML table
          $('table#visitorTable tbody').html(tableContent);
          $('table#exportTable').html(exportTable);
          $('table#visitorTable').show();
          $('#loading').hide();



      });
    }

// Set up search dates
$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
  //do something, like clearing an input

  searchStart = picker.startDate.format('L');
  searchEnd = picker.endDate.format('L');
  populateVisitorTable();


});




$(document).on('keyup',function (e){

  if(e.target.id === 'searchText'){
    searchText = e.target.value;
    populateVisitorTable();
  }
});
