aallowed = false;
var theSearch = {Person: { $regex: '', $options: 'i' }},
    searchChoice = 'Supervior';
var options = ['Date', 'area','feels'];
var emoji = {
  ReallySad : '<i class="fas fa-sad-tear fa-2x"></i>',
  Sad : '<i class="fas fa-frown fa-2x"></i>',
  OK : '<i class="fas fa-meh fa-2x"></i>',
  Happy : '<i class="fas fa-smile fa-2x"></i>',
  ReallyHappy : '<i class="fas fa-smile-beam fa-2x"></i>'
}
var rows = 0;
var theData = [],
    labels = [];

    var colourChoice = [
    '#DF691A',' #6610f2',' #6f42c1 ',' #e83e8c',' #d9534f',' #f0ad4e',' #f0ad4e',' #5cb85c',' #20c997',' #5bc0de',' #fff',' #868e96',' #343a40',' #DF691A',' #4E5D6C',' #5cb85c',' #5bc0de',' #f0ad4e',' #d9534f',' #abb6c2',' #4E5D6C'
    ];


$(document).ready(function() {

  $('#PinModal').modal("show");
  $('.form.active').removeClass('active');
  $('#feedbackLink').addClass('active');

  var select = document.getElementById('searchOptions');

  $.each(options,function(i, option){
      var opt = document.createElement('option');
      opt.value = option;
      opt.innerHTML = option;
      select.appendChild(opt);
  });


  if (pinAccepted === true){
    populateFeedbackTable();
    allowed = true;
  }
});


$(document).on('hidden.bs.modal', function(e) {

if(e.target.id==='PinModal'){
  if (pinAccepted === true){
    allowed = true;
    populateFeedbackTable();
  }
}
});

function updateField(theID){
  var asset = {
              FindMe : theID,
              Details : {
                        $set:  {
                                processed: [true, moment()]
                                }
                        }
              };




              $.ajax({
                  type: 'put',
                  data: JSON.stringify(asset),
                  url: 'feedback/updateFeedback',
                  dataType: 'JSON',
                  contentType: 'application/json',
              }).done(function( response, results ) {


                  // Check for successful (blank) response
                  if (results === 'success') {


                  }
                  else {
                      // If something goes wrong, alert the error message that our service returned
                      alert('Error: ' + response.msg);

                  }

              });
}


function populateFeedbackTable() {

    theData = [];
    labels = [];

    if(searchChoice === 'Date'){
      theSearch = {created: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
    } else if(searchChoice === 'Area'){
      theSearch = {area_of_feedback: { $regex: searchText, $options: 'i' }};
    } else if(searchChoice === 'feels'){
      theSearch = {feels: { $regex: searchText, $options: 'i' }};
    } else {
      theSearch = {}
    }



      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/feedback/getFeedback', theSearch, function( data ) {

        })
          .done(function( data ) {
console.log(data);
        visitorListData = data;
        dataLength = data.length;
          $('#listCount').text('Records Found: '+dataLength);

//get Date Range

          var previousDate = '';


        $('#ListCount').text(visitorListData.length);



          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(i, item){

            var checked = false;
            var theID = '#'+item._id+'_showMore';
           if (item.processed[0]){
             checked = moment(item.processed[1]).format("Do MMM YYYY")
           } else {
             checked = '<div class="custom-control custom-checkbox"> <input type="checkbox" class="custom-control-input" id="' + item._id + '_processed"> <label class="custom-control-label" for="' + item._id + '_processed"></label></div>'
           }
                      var table = document.getElementById("feedbackBody");

                      var feedbackRow = table.insertRow(rows);
                            feedbackRow.id = item._id + '_feedbackRow';
                            feedbackRow.scope = 'row';
                            feedbackRow.className = 'feedbackRow';


                            var showMore = feedbackRow.insertCell(-1);
                                  showMore.id = item._id;
                                  showMore.className = 'showMore';
                                  showMore.onclick = function(){$('.commentRow').hide();  $('#'+item._id+'_commentRow').toggle(); $('.xDetailsRow').hide();  $('#'+item._id+'_xDetailsRow').toggle();};
                                  showMore.onmouseover = function(){$(theID).children().removeClass('fa-angle-right').addClass('fa-angle-down');};
                                  showMore.onmouseout = function(){$(theID).children().removeClass('fa-angle-down').addClass('fa-angle-right');};
                                  showMore.innerHTML = '<div class="showMore" id="'+item._id+'_showMore"><i class="fas fa-angle-right"></i></div> '
                            var date = feedbackRow.insertCell(-1);
                                  date.id = item._id + '_date';
                                  date.className = 'date'
                                  date.innerHTML = moment(item.created).format('ll');
                            var time = feedbackRow.insertCell(-1);
                                  time.id = item._id + '_time';
                                  time.className = 'time'
                                  time.innerHTML = moment(item.created).format('HH:mm:ss');
                            var name = feedbackRow.insertCell(-1);
                                  name.id = item._id + '_name';
                                  name.className = 'name'
                                  name.innerHTML = item.person.Name;
                            var phone = feedbackRow.insertCell(-1);
                                  phone.id = item._id + '_phone';
                                  phone.className = 'phone'
                                  phone.innerHTML = item.person.PhoneNumber;
                            var email = feedbackRow.insertCell(-1);
                                  email.id = item._id + '_email';
                                  email.className = 'email'
                                  email.innerHTML = item.person.EmailAddress;
                            var area = feedbackRow.insertCell(-1);
                                  area.id = item._id + '_area';
                                  area.className = 'area'
                                  area.innerHTML = item.area_of_feedback;
                            var feels = feedbackRow.insertCell(-1);
                                  feels.id = item._id + '_feels';
                                  feels.className = 'feels'
                                  feels.innerHTML = emoji[item.feels];
                            var processed = feedbackRow.insertCell(-1);
                                  processed.id = item._id + '_processedCell';
                                  processed.className = 'processed'
                                  processed.onclick = function(){updateField(item._id)};
                                  processed.innerHTML = checked

                    if(item.area_of_feedback === 'Climbing'){
                        rows = rows + 1;
                      var xDetailsRow = table.insertRow(rows);
                            xDetailsRow.style = "display:none;";
                            xDetailsRow.id = item._id + '_xDetailsRow';
                            xDetailsRow.className = 'xDetailsRow';
                            var line = xDetailsRow.insertCell(-1);
                                  line.colSpan = 2;
                                  line.id = item._id + '_line';
                                  line.className = 'line';
                                  line.innerHTML = '<b>Line: </b>'+item.climbing_complaint.Line ;
                            var grade = xDetailsRow.insertCell(-1);
                                  grade.colSpan = 2;
                                  grade.id = item._id + '_grade';
                                  grade.className = 'grade';
                                  grade.innerHTML = '<b>Grade: </b>'+item.climbing_complaint.Grade ;
                            var colour = xDetailsRow.insertCell(-1);
                                  colour.colSpan = 2;
                                  colour.id = item._id + '_colour';
                                  colour.className = 'colour';
                                  colour.innerHTML = '<b>Colour: </b>'+item.climbing_complaint.Colour ;
                            var setter = xDetailsRow.insertCell(-1);
                                  setter.colSpan = 2;
                                  setter.id = item._id + '_setter';
                                  setter.className = 'setter';
                                  setter.innerHTML = '<b>Setter: </b>'+item.climbing_complaint.Setter ;
                    }


                  if(item.area_of_feedback === 'Staff'){
                    console.log('Staff')
                      rows = rows + 1;
                      var xDetailsRow = table.insertRow(rows);
                            xDetailsRow.style = "display:none;";
                            xDetailsRow.id = item._id + '_xDetailsRow';
                            xDetailsRow.className = 'xDetailsRow';
                            var line = xDetailsRow.insertCell(-1);
                                  line.colSpan = 2;
                                  line.id = item._id + '_line';
                                  line.className = 'line';
                                  line.innerHTML = '<b>Department: </b>'+item.staff_complaint_department ;

                  }

                  rows = rows + 1;
                  var feedbackRow = table.insertRow(rows);
                        feedbackRow.style = "display:none;";
                        feedbackRow.id = item._id + '_commentRow';
                        feedbackRow.className = 'commentRow';
                        var comment = feedbackRow.insertCell(-1);
                              comment.colSpan = 9;
                              comment.id = item._id + '_comment';
                              comment.className = 'comment';
                              comment.innerHTML = '<span>'+ item.feedback + '</span>' ;

                      rows = rows + 1;
          });
          exportTable += '</tr>';

          // Inject the whole content string into our existing HTML table



          // $('table#exportTable').html(exportTable);
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
