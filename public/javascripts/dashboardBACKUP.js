// Visitorlist data array for filling in info box
var visitorListData = [],
    participants = [],
    participantRows = [],
    supervisingTick = '',
    navChoice = '',
    disclaimerTick = '',
    ReasonFV = '',
    child = '',
    headers = '',
    childPointer = '',
    reasonFVPointer = '',
    csv = 'BOO!',
    selected='',
    lookup='fullName',
    SearchItem='',
    DateMe = '',
    BeginWith = '',
    EndWith = '',
    findMe = '',
    findDate = '',
    findPerson = '',
    findIt = '',
    n = 0,
    participantRows = '',
    theExport = '',
    myobj = '';

// DOM Ready =============================================================
$(document).ready(function() {

  GetFormData();

    // Populate the user table on initial page load

    // Visitor name link click
    // $('#visitorList table tbody').on('mouseover', 'td a.linkShowVisitor', showVisitorInfo);
    // $('#visitorList table tbody').on('click', 'td a.linkShowVisitor', showVisitorInfo);


    $("#export").click(function(){
      console.log('clicked');
      successAlert(visitorListData.length + ' visitors selected. Please check your downloads', 'success');
      toCSV(theExport);
    });

    $('#visitorLink').click(function(){
      navChoice = 'populateVisitorTable';
      populateVisitorTable('Visitor List');
      console.log('clicked');
    });

    $('#WWALink').click(function(){
      navChoice = 'populateWWATable';
      populateWWATable('Woman With Attitude');
      console.log('clicked');
    });

    $('#theSession').click(function(){
      navChoice = 'populateTheSessionTable';
      populateTheSessionTable('The Session');
      console.log('clicked');
    });

    $('#nonClimbingChild').click(function(){
      navChoice = 'populateNCCTable';
      populateNCCTable('Non-climbing Child');
      console.log('clicked');
    });

    $('#searchFieldInput').keyup(function() {
        GetFormData($('#searchFieldInput').val());
      });

    $('#startDate').datetimepicker({
        format: 'L',
      });
     $('#endDate').datetimepicker({
        format: 'L',
        useCurrent: false
     });

     $("#startDate").on("change.datetimepicker", function (e) {
         $('#endDate').datetimepicker('minDate', e.date);
     });
     $("#endDate").on("change.datetimepicker", function (e) {
         $('#startDate').datetimepicker('maxDate', e.date);
     });

     $('#searchNow').release(function(){
       console.log('BOOM');
       GetFormData(SearchItem);
     });

     $('#searchLabel').text('Field');

});



// Functions =============================================================



function GetFormData(SearchItem){
       if (navChoice === 'populateVisitorTable'){
            populateVisitorTable('Visitor List', SearchItem);
        } else if (navChoice === 'populateWWATable'){
            populateWWATable('Woman With Attitude', SearchItem);
        } else if (navChoice ==='populateTheSessionTable'){
            populateTheSessionTable('The Session', SearchItem);
        } else if (navChoice === 'populateNCCTable'){
            populateNCCTable('Non-climbing Child', SearchItem);
        }
     }

//Set Search Feild Name to selected field and set lookup to the data
function SearchCrtieria(){
   $('a#dropdownitem').click(function() {
     $('a#dropdownitem').val($(this).html());
        selected = ($('a#dropdownitem').val());
        lookup = $(this).data('lookup');
      $('#searchLabel').text(selected);
    });
}

function MakeFindDateString(SearchItem){
  var StartDate = $("#startDateInput").val();
  if (StartDate !== ''){
    BeginWith = '"$gte": "' + moment(StartDate).format() + '"';
  }
  var EndDate = $("#endDateInput").val();
  if(EndDate !== ''){
    EndWith = ',' + '"$lte": "' + moment(EndDate).format() ;
  }
  if(StartDate !== '' && EndDate !== ''){
  findDate = '"createdDate": {' + BeginWith + EndWith + '"}, ';
  }
    console.log(findDate);
  }


function MakeFindPersonString(SearchItem){
  if ($('#searchFieldInput').val() !== ''){
    if (lookup !== "ChildNames"){
      findPerson = '"' + lookup + '": {"$regex": ".*'+ $('#searchFieldInput').val() +'.*", "$options": "i"}';
    } else if (lookup === "ChildNames"){
      findPerson = '"ChildNames": {"$elemMatch": { "name": {"$regex": ".*'+ $('#searchFieldInput').val() +'.*", "$options": "i"}}}';
    }
  }
}


function MakeFindIt(SearchItem){
  MakeFindDateString(SearchItem);
  MakeFindPersonString(SearchItem);

    findIt = '{' + findDate + findPerson + '}';
    console.log(findIt);
    findIt = jQuery.parseJSON(findIt);
    console.log(findIt);
  }

// Allow User to download data
function toCSV(theExport){
  $('#dataList').tableToCSV(theExport);
 }

function populateNCCTable(tableTitle) {
  $('#pageTitle').text(tableTitle);


  var headers = '<tr>';
  headers += '<th>Date</th>';
  headers += "<th>Child's Name</th>";
  headers += '<th>Designated Adult</th>';
  headers += '<th>Disclaimer</th>';
  headers += '</tr>';

  $('#dataList table thead').html(headers);



    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/NCClist', function( data ) {
      console.log('data');

          // Stick our visitor data array into a visitorlist variable in the visitorlist object
      visitorListData = data;


        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
          if (this.disclaimer !== 'Agreed'){
            disclaimerTick = '<i class="far fa-square"></i>';
            } else if (this.disclaimer === 'Agreed'){
            disclaimerTick = '<i class="far fa-check-square"></i>';
            }

            tableContent += '<tr>';
            tableContent += '<td>' + this.createdDate + '</td>';
            tableContent += '<td>' + this.childName + '</td>';
            tableContent += '<td>' + this.designatedAdult + '</td>';
            tableContent += '<td>' + disclaimerTick + ' <p hidden> '+ this.disclaimer +'</td>';
          });

        // Inject the whole content string into our existing HTML table
        $('#dataList table tbody').html(tableContent);

        $(".toggler").click(function(e){
          console.log(this);
             e.preventDefault();
             $('.cat'+$(this).attr('data-prod-cat')).toggle();
         });
    });
  }

function populateWWATable(tableTitle) {
  $('#pageTitle').text(tableTitle);


  var headers = '<tr>';
  headers += '<th></th>';
  headers += '<th>Date</th>';
  headers += '<th>Facilitator</th>';
  headers += '<th>Session Type</th>';
  headers += '<th>Start Location</th>';
  headers += '</tr>';

  $('#dataList table thead').html(headers);



    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/WWAlist', function( data ) {


          // Stick our visitor data array into a visitorlist variable in the visitorlist object
      visitorListData = data;



      $('#ListCount').text(visitorListData.length);

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
          n = 0;
          participants = this.Participants;
              participantRows = '';
              participantRows += '     <tr>';
              participantRows += '      <th scope="col">#</th>';
              participantRows += '      <th scope="col">Participant</th>';
              participantRows += '      <th scope="col">Reason</th>';
              participantRows +='       <th scope="col">First Time</th>';
              participantRows += '     </tr>';
              participantRows += '    </thead>';
              participantRows += '   <tbody>';

          $.each(participants, function(){

              n = n+1;
              participantRows += '     <tr>';
              participantRows += '     <td>' + n + '</td>';
              participantRows += '     <td>' + this.Participant + '</td>';
              participantRows += '     <td>' + this.Reason + '</td>';
              participantRows += '     <td>' + this.First_TIme + '</td>';
              participantRows += '     </tr>';
              participantRows += '   </tbody>';

          });


            tableContent += '<tr>';
            tableContent += '<td><a class="toggler" href="#" data-prod-cat="'+ this._id +'" title="Show Participants" rel="' + this._id + '"><i class="fas fa-list-ul"></i></a><p hidden>'+ this._id +'</p></td>';
            tableContent += '<td>' + this.createdDate + '</td>';
            tableContent += '<td>' + this.Facilitator + '</td>';
            tableContent += '<td>' + this.Session_Type + '</td>';
            tableContent += '<td>' + this.Start_Location + '</td>';
            tableContent += '</tr>';
            tableContent += '<tr><td class="innerTable cat'+ this._id +'" style="display:none;" colspan="5">' + '<table class="table table-sm"><thread>' + participantRows + '</th></tr></table>' + '</td></tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#dataList table tbody').html(tableContent);

        $(".toggler").click(function(e){
          console.log(this);
             e.preventDefault();
             $('.cat'+$(this).attr('data-prod-cat')).toggle();
         });
    });
  }

function populateTheSessionTable(tableTitle) {
    $('#pageTitle').text(tableTitle);

    MakeFindIt(SearchItem);

    var MenuOptions = '<a class="dropdown-item" id="dropdownitem" data-lookup="Facilitator" href="#">Facilitator</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="Session_Type" href="#">Session Type</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="Start_Location" href="#">Start Location</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="Participants.Participant" href="#">Participant</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="Participants.Reason" href="#">Reason for Joining</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="Participants.First_Time" href="#">First Time</a>';

    $('#dropDownMenuOptions').html(MenuOptions);

    SearchCrtieria();

    var headers = '<tr>';
    headers += '<th></th>';
    headers += '<th>Date</th>';
    headers += '<th>Facilitator</th>';
    headers += '<th>Session Type</th>';
    headers += '<th>Start Location</th>';
    headers += '</tr>';

    $('#dataList table thead').html(headers);



      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/theSessionlist', findIt, function( data ) {


            // Stick our visitor data array into a visitorlist variable in the visitorlist object
      visitorListData = data;

          // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
              participants = this.Participants;
                n = 0;
                  participantRows = '';
                  participantRows += '     <tr>';
                  participantRows += '      <th scope="col">#</th>';
                  participantRows += '      <th scope="col">Participant</th>';
                  participantRows += '      <th scope="col">Reason</th>';
                  participantRows +='       <th scope="col">First Time</th>';
                  participantRows += '     </tr>';
                  participantRows += '    </thead>';
                  participantRows += '   <tbody>';

              $.each(participants, function(){

                  n = n+1;
                  participantRows += '     <tr>';
                  participantRows += '     <td>' + n + '</td>';
                  participantRows += '     <td>' + this.Participant + '</td>';
                  participantRows += '     <td>' + this.Reason + '</td>';
                  participantRows += '     <td>' + this.First_Time + '</td>';
                  participantRows += '     </tr>';
                  participantRows += '   </tbody>';

              });


                tableContent += '<tr>';
                tableContent += '<td><a class="toggler" href="#" data-prod-cat="'+ this._id +'" title="Show Participants" rel="' + this._id + '"><i class="fas fa-list-ul"></i></a><p hidden>'+ this._id +'</p></td>';
                tableContent += '<td>' + this.createdDate + '</td>';
                tableContent += '<td>' + this.Facilitator + '</td>';
                tableContent += '<td>' + this.Session_Type + '</td>';
                tableContent += '<td>' + this.Start_Location + '</td>';
                tableContent += '</tr>';
                tableContent += '<tr><td class="innerTable cat'+ this._id +'" style="display:none;" colspan="5">' + '<table class="table table-sm"><thread>' + participantRows + '</th></tr></table>' + '</td></tr>';
            });


  //// -- CSV CREATION ---
      ExportContent =  '<table>';
      ExportContent +=  '<thead>';
      ExportContent +=  '<tr>';
      ExportContent += '  <th>Date</th>';
      ExportContent += '  <th>Facilitator</th>';
      ExportContent += '  <th>Session Type</th>';
      ExportContent += '  <th>Start Location</th>';
      ExportContent += '  <th>Participant</th>';
      ExportContent += '  <th>Reason</th>';
      ExportContent += '  <th>First Time</th>';
      ExportContent += ' </tr>';
      ExportContent += '</thead>';
      ExportContent += '<tbody>   ';

  $.each(data, function(){
    n = n+1;
      console.log(n);
        createdDate =  this.createdDate;
        facilitator = this.Facilitator;
        sessionType = this.Session_Type;
        startLocation = this.Start_Location;
        participants = this.Participants;

    $.each(participants, function(){
          n = n+1;
          ExportContent += '<tr>';
          ExportContent += '<td>' + createdDate + '</td>';
          ExportContent += '<td>' + facilitator + '</td>';
          ExportContent += '<td>' + sessionType + '</td>';
          ExportContent += '<td>' + startLocation + '</td>';
          ExportContent += '<td>' + this.Participant + '</td>';
          ExportContent += '<td>' + this.Reason + '</td>';
          ExportContent += '<td>' + this.First_Time + '</td>';
          ExportContent += '</tr>   ';
    });


      console.log(ExportContent);
      });
      ExportContent += '   </tbody>';
      ExportContent += ' </table>';
      theExport = ExportContent;
      console.log(theExport);

            // Inject the whole content string into our existing HTML table
            $('#dataList table tbody').html(tableContent);

            $(".toggler").click(function(e){
              console.log(this);
                 e.preventDefault();
                 $('.cat'+$(this).attr('data-prod-cat')).toggle();
             });
        });
      }


  // Fill table Visitor  data

function populateVisitorTable(tableTitle) {
    $('#pageTitle').text(tableTitle);

    MakeFindIt(SearchItem);

    var headers = '<tr>';
    headers += '<th>Date</th>';
    headers += '<th>Time</th>';
    headers += '<th>Full Name</th>';
    headers += '<th>Reason</th>';
    headers += '<th><i class="fas fa-child"></i><p hidden>Children</p</th>';
    headers += '<th><i class="fas fa-camera"></i><p hidden>Photograpy</p</th>';

    headers += '<th>Disclaimer</th>';
    headers += '</tr>';

    $('#dataList table thead').html(headers);

    var MenuOptions = '<a class="dropdown-item" id="dropdownitem" data-lookup="fullName" href="#">Full Name</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="reasonForVisit" href="#">Reason for Visit</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="ChildNames" href="#">Childs Name</a>';
      MenuOptions += '<a class="dropdown-item" id="dropdownitem" data-lookup="PhotographyWaverAgreement" href="#">Agreement</a>';

    $('#dropDownMenuOptions').html(MenuOptions);

    SearchCrtieria();






      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/users/visitorlist', findIt, function( data ) {
          console.log(findIt + ": In getJSON");


            // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;



        $('#ListCount').text(visitorListData.length);

          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(){

              if (this.disclaimer !== 'Agreed'){
                disclaimerTick = '<i class="far fa-square"></i>';
                } else if (this.disclaimer === 'Agreed'){
                disclaimerTick = '<i class="far fa-check-square"></i>';
                }
              if (this.PhotographyWaverAgreement !== 'Agreed'){
                photoTick = '<i class="far fa-square"></i>';
                } else if (this.disclaimer === 'Agreed'){
                photoTick = '<i class="far fa-check-square"></i>';
                }

              if (this.ChildNames === undefined){
                Child = '';
                supervisingChild = '<i class="far fa-square"></i>';
                childPointer = '';
              } else {
                Child = '';

                  $.each(this.ChildNames, function(){
                  Child += ' ' + this.name;
                  console.log(Child);
                  supervisingChild = '<i class="far fa-check-square"></i>';
                  childPointer = 'style="cursor: context-menu"';
                });
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

              if (this.otherReason !== undefined){
              ReasonFV = this.otherReason;
              } else {
              ReasonFV = 'Not Given';
              }


              tableContent += '<tr>';
              tableContent += '<td>' + moment(this.createdDate).format('DD/MM/YYYY') + '</td>';
              tableContent += '<td>' + moment(this.createdDate).format('hh:MM:SS a') + '</td>';
              tableContent += '<td>' + this.fullName + '</td>';
                // tableContent += '<td><a href="#" data-toggle="tooltip" title="' + ReasonFV + '" class="linkShowVisitor" rel="' + this._id + '">' + this.reasonForVisit + '</a><p hidden>'+ ': ' + ReasonFV +'</p></td>';
              tableContent += '<td '+ reasonFVPointer +' data-toggle="tooltip" title="' + ReasonFV + '" rel="' + this._id + '">' + this.reasonForVisit + '<p hidden>'+ ': ' + ReasonFV +'</p></td>';
              tableContent += '<td '+ childPointer +' data-toggle="tooltip" title="' + Child + '" rel="' + this._id + '">' + supervisingChild + '<p hidden>'+ Child +'</p></td>';
              tableContent += '<td>'+ photoTick + ' <p hidden> '+ this.PhotographyWaverAgreement +'</p></td>';
              tableContent += '<td>'+ disclaimerTick + ' <p hidden> '+ this.disclaimer +'</p></td>';
              // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
              tableContent += '</tr>';
          });

          // Inject the whole content string into our existing HTML table
          $('#dataList table tbody').html(tableContent);
          theExport = tableContent;
      });
    }
