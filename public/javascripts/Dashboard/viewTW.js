aallowed = false;
var theSearch = {Person: { $regex: '', $options: 'i' }},
    searchChoice = 'Supervior';
var options = ['Date', 'Worker','iPad'];

var theData = [],
    labels = [];

    var colourChoice = [
    '#DF691A',' #6610f2',' #6f42c1 ',' #e83e8c',' #d9534f',' #f0ad4e',' #f0ad4e',' #5cb85c',' #20c997',' #5bc0de',' #fff',' #868e96',' #343a40',' #DF691A',' #4E5D6C',' #5cb85c',' #5bc0de',' #f0ad4e',' #d9534f',' #abb6c2',' #4E5D6C'
    ];


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
      theSearch = {ArrivalTime: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
    } else if(searchChoice === 'Worker'){
      theSearch = {Person: { $regex: searchText, $options: 'i' }};
    } else if(searchChoice === 'iPad'){
      theSearch = {iPadIn: { $regex: searchText, $options: 'i' }};
    }



      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/TWlist', theSearch, function( data ) {

        })
          .done(function( data ) {
            var exportTable = "<table>";
            exportTable +='<tr>';
            exportTable +='<th>Arrival Time</th>';
            exportTable +='<th>Departure Time</th>';
            exportTable +='<th>Worker</th>';
            exportTable +='<th>Arrival iPad</th>';
            exportTable +='<th>Departure iPad</th>';
            exportTable +='</tr>';

            // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;
        dataLength = data.length;
          $('#listCount').text('Records Found: '+dataLength);

//get Date Range

          var previousDate = '';


        $('#ListCount').text(visitorListData.length);


console.log(data);
          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(i, item){
            console.log(item);
              perviousDate = item.created;

              tableContent += '<tr>';
              tableContent += '<td>' + moment(item.ArrivalTime).format('lll') + '</td>';
              tableContent += '<td>' + moment(item.DepartureTime).format('lll') + '</td>';

              tableContent += '<td>' +  toTitleCase(item.Person) + '</td>';
              tableContent += '<td>'+ item.iPadIn + ' <p hidden> '+ this.iPadIn +'</p></td>';
              tableContent += '<td>'+ item.iPadOut + ' <p hidden> '+ this.iPadOut +'</p></td>';

              // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
              tableContent += '</tr>';



              tableContent += '</td>';
              tableContent += '</tr>';

              exportTable += '<tr>';
              exportTable += '<td>' + moment(item.ArrivalTime).format('lll') + '</td>';
              exportTable += '<td>' + moment(item.DepartureTime).format('lll') + '</td>';
              exportTable += '<td>' +  toTitleCase(item.Person) + '</td>';
              exportTable += '<td>'+ item.iPadIn + ' <p hidden> '+ this.iPadIn +'</p></td>';
              exportTable += '<td>'+ item.iPadOut + ' <p hidden> '+ this.iPadOut +'</p></td>';
              exportTable +=  ' </tr>';
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
