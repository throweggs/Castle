var allowed = false;

var options = [ 'Date', 'Full Name', 'Child Name', 'Reason', 'iPad'];



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
var theSearch = {};
    $('#pageTitle').text(tableTitle);
console.log('populate');
  console.log(searchChoice);
if(searchChoice === 'Date'){
  theSearch = {created: { $gt: moment(searchStart).subtract('24','hours').format(), $lt: moment(searchEnd).format() }};
} else if(searchChoice === 'Full Name'){
  theSearch = {fullName: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'Child Name'){
  theSearch = { ChildNames : { $elemMatch: { name: { $regex: searchText, $options: 'i' }}}};
} else if(searchChoice === 'Reason'){
  theSearch = {reasonForVisit: { $regex: searchText, $options: 'i' }};
} else if(searchChoice === 'iPad'){
  theSearch = {iPad: { $regex: searchText, $options: 'i' }};
}
console.log(theSearch);
  var findIt =  theSearch;


      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/visitorlist', findIt, function( data ) {
          console.log(findIt + ": In getJSON");
        })
          .done(function( data ) {

            // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;
          $('#listCount').text('Records Found: '+data.length);


        $('#ListCount').text(visitorListData.length);
        var disclaimerTick,
            photoTick,
            supervisingChild,
            childPointer,
            Child,
            reasonFVPointer,
            ReasonFV;
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
              console.log(this.otherReason);
              if (this.otherReason === null){
              reasonFV = 'Not Given';
            } else if (this.otherReason !== ''){
              reasonFV = this.otherReason;
              }


              tableContent += '<tr>';
              tableContent += '<td>' + moment(this.created).format('DD/MM/YYYY') + '</td>';
              tableContent += '<td>' + moment(this.created).format('hh:MM:SS a') + '</td>';
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
          $('#dataList table tbody').html(tableContent);
          theExport = tableContent;
          console.log(tableContent);
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
  console.log(e.target.id);
  if(e.target.id === 'searchText'){
    searchText = e.target.value;
    populateVisitorTable();
  }
});
