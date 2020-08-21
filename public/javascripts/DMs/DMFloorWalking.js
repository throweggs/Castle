
var $table = $('table#FloorWalking'),
    modalOptions = [];


$(".modal").on("hidden.bs.modal", function(){
        console.log('areaEdit')
        console.log(areaEdit)
    $("input#catergory").val("");
    $("input#subcatergory").val("");
    $("input#issue").val("");
    if(areaEdit){
      $('button#addNewIssue').show();
      console.log(areaEdit)
    }
});


//Table Functions
  $(function() {
    $table.bootstrapTable('hideColumn', 'id')
    })


  $("modal#newIssue").on("show.bs.modal", function(){
    var catOptions = ''
          $.each(modalOptions.catergory, function( i, v ) {
            var theNameLink = '"'+v+'"';

            catOptions += "<a class='dropdown-item' onClick='passVal(catergory,"+theNameLink+")'>"+v+"</a>";
            $('#catOptions').html(catOptions)
          });
    var subcatOptions = ''
          $.each(modalOptions.subcatergory, function( i, v ) {
            var theNameLink = '"'+v+'"';

            subcatOptions += "<a class='dropdown-item' onClick='passVal(subcatergory,"+theNameLink+")'>"+v+"</a>";
            $('#subcatOptions').html(subcatOptions)
          });
    });

  function passVal(field,theName){
    $(field).val(theName);
  }


  $(function() {
    $('form#newIssue').submit(function(){

        var output =  {
                      Catergory : $('input#catergory').val(),
                      Subcatergory :  $('input#subcatergory').val(),
                      Issue :  $('input#issue').val(),
                      Occurances : []
                      }
        output = JSON.stringify(output);

      // Use AJAX to post the object to our adduser service
      $.ajax({
          type: 'POST',
          data: output,
          url: 'DMFloorWalking/addIssue',
          dataType: 'JSON',
          contentType: 'application/json',
      }).done(function( response, results ) {
          // Check for successful (blank) response
          if (response.msg === '') {
          $("modal#newIssue").modal('hide');
          $table.bootstrapTable('destroy');
           getData();
           $table.bootstrapTable('hideColumn', 'id')
          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert('Error: ' + response.msg);

          }
      });



});
})

//Form submit
  $(function() {
      $('form').submit(function () {

                var checked = ($(this).serialize())
                checked = checked.split('id=');

                var index = checked.indexOf("btSelectAll=on&");
                  if (index > -1) {
                      checked.splice(index, 1);
                }

                var index = checked.indexOf("");
                  if (index > -1) {
                      checked.splice(index, 1);
                }

                checked.forEach((item, i) => {
                  updateCount(item, i);
                });

                return false

            })
    })

  function customSearch(data, text) {
    return data.filter(function (row) {
      return row.issue.indexOf(text) > -1
    })
  }


//Update form

function updateCount(update){
update = update.split('_');


  update = [
            {
              _id : update[0]
            },
            {
              $push:
                    { Occurances :
                                  { Date : moment().format('L'), Logger : 'Gordon' }
                    }
            }
          ]


        $.ajax({
        type: "put",
        url: "DMFloorWalking/updateCount",
        contentType: 'application/json',
        data: JSON.stringify(update)
      }).done(function( response, results ) {
          // Check for successful (blank) response
          if (results === 'success') {


              $table.bootstrapTable('destroy');
               getData();

          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert( response);


          }
      });

    }

function showData(data){
  var rowCount = $("table#FloorWalking td").closest("tr").length,
      issueText = data.Issue,
      dateCount = 0;
  if(rowCount ==1){rowCount=0}
  $table.bootstrapTable({data: data})
 $table.bootstrapTable('hideColumn', 'id')
  $.each(data.Occurances, function( i, v ) {
    var badgeColour = 'badge-info';
    if(v.Date == moment().format('L')){
      dateCount++;
      if(dateCount > 4){
        badgeColour = 'badge-warning'
      } else if(dateCount > 9){
        badgeColour = 'badge-danger'
      }
      issueText = data.Issue + '&nbsp<div class="mb-2 mr-2 badge badge-pill '+badgeColour+'">'+dateCount+' today</div>';
   }

    });
            $table.bootstrapTable('insertRow', {
              index: rowCount +1,
                  row: {
                    id: data._id,
                    catergory: data.Catergory,
                    subcatergory: data.Subcatergory,
                    issue: issueText,

                  }
                });

  findMerges(rowCount);


}

function getData(){
  $.getJSON( '/DMFloorWalking/getData', function( data ) {
    })
      .done(function( data ){
        data.forEach(showData);
      });
      findMerges();
}

function findMerges(){
      modalOptions = {catergory : [], subcatergory : []};
  var colCount = $table.find('tr')[0].cells.length,
      rowCount = $("table#FloorWalking td").closest("tr").length,
      colNum = colCount - 4;
  var lastRow = '';
  var i = 0;

  $('#FloorWalking > tbody  > tr').each(function(trIndex, tr) {
    var $tds = $(this).find('td');
      var thisRow = $tds.eq(colNum).text();
      if(thisRow === lastRow){
        i++;
        mergeCells(trIndex - i,'catergory',1, i+1)
        } else {
        modalOptions.catergory.push(thisRow)
        i=0;
        lastRow = thisRow;
      }
    });
    colNum = colCount - 3;
    $('#FloorWalking > tbody  > tr').each(function(trIndex, tr) {

      lastTrIndex = trIndex;

     var $tds = $(this).find('td')
      var thisRow = $tds.eq(colNum).text();
      if(thisRow === lastRow){
        i++ ;
        mergeCells(trIndex -i, 'subcatergory',1, i+1)
      } else {
        i=0;
          modalOptions.subcatergory.push(thisRow);
        lastRow = thisRow;
      }
    });
}

function mergeCells(index, field, colspan, rowspan){
  $table.bootstrapTable('mergeCells', {
        index: index,
        field: field,
        colspan: colspan,
        rowspan: rowspan
  });
}

$(document).on('click keyup', function() {
    if(event.target.innerHTML === 'Catergory'){
        findMerges();
    }
});


$(document).ready(function() {

if(pinAccepted){
  getData();
} else {
  $('PinModal').modal('show');
  $pinModal.on('hide.bs.modal', function (e) {

        if(pinAccepted){
            getData();
            if(areaEdit){
              $('button#addNewIssue').show();
            }
        }
      });
}
});
