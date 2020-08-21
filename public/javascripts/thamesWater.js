  var iPadIn = '';

  // DOM Ready =============================================================
  $(document).ready(function() {
    $("#dataProtection").modal('show');
      console.log('GDPR');


      // Populate the user table on initial page load
      populateTable();

      // Visitor name link click
      $('#workerList table tbody').on('click', 'td button.CheckOut', TiggerCheckOut);

      //SUBMIT

      // Button selected oulining
        $().button('toggle');

        $('#submit').on('click', addPerson);

        $('#timeIn').datetimepicker({
          useCurrent: true,
          format: 'LT'
        });
        $('#timeOut').datetimepicker({
          useCurrent: false,
          format: 'LT'
        });
        $("#timeIn").on("change.datetimepicker", function (e) {
            $('#timeOut').datetimepicker('minDate', e.date);
        });
        $("#timeOut").on("change.datetimepicker", function (e) {
            $('#timeIn').datetimepicker('maxDate', e.date);
        });


          $('#addPerson.modal').on('keydown keyup change',function(){
            if (($('input#workerName').val().length >= 1)){
                $('#disclaimer').prop('disabled', false);
            }
          });

        $('#disclaimer').on('change',function(){
          if ($('#disclaimer').is(':checked')){
                if (($('input#workerName').val().length >= 1)){
                  $('button#submit').prop('disabled', false);
                }

          } else if ($('#disclaimer').not(':checked')){
              $('button#submit').prop('disabled', true);
          }
      });

  });

  // Functions =============================================================

  function TiggerCheckOut(event) {

          // Prevent Link from Firing
          event.preventDefault();

          // Retrieve fullname from link rel attribute
          var thisFullName = $(this).attr('rel');

          // Get Index of object based on id value
          var arrayPosition = visitorListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisFullName);

          // Get our User Object
         var thisVisitorObject = visitorListData[arrayPosition];

         updatePerson(thisVisitorObject);

      }

  function updatePerson(thisVisitorObject){
      console.log('DATE: ' + DateOnly);

      var updates = {
          'FindPerson': thisVisitorObject._id,
          'createdDate': thisVisitorObject.createdDate,
          'Person' : thisVisitorObject.Person,
          'ArrivalTime' : thisVisitorObject.ArrivalTime,
          'DepartureTime' : moment().format(),
          'Disclaimer' : thisVisitorObject.Disclaimer,
          'iPadIn' : iPadIn,
          'iPadOut' : getKioskId(),
      };

      $.ajax({
        type: "put",
        url: "thamesWater/updatePerson",
        contentType: 'application/json',
        data: JSON.stringify(updates)
      }).done(function( response, results ) {
          populateTable();
        // location.reload();
          console.log(response);
          // Check for successful (blank) response
          if (response.ok === 1) {

              // Clear the form inputs
              // $('#addPerson input').val('');

              // // Update the table
              // populateTable();

          }
          else {

              // If something goes wrong, alert the error message that our service returned
              alert('Error: ' + response.msg);

          }

      });
    }



  // Fill table with data
  function populateTable() {

    console.log("Populate Tab");

      // Empty content string
      var tableContent = '';

      // jQuery AJAX call for JSON
      $.getJSON( '/thamesWater/getDay', {createdDate: moment().format('DD MM YYYY')}, function( data ) {

        // Stick our visitor data array into a visitorlist variable in the visitorlist object
        visitorListData = data;

  $('#ListCount').text(visitorListData.length);

          // For each item in our JSON, add a table row and cells to the content string
          $.each(data, function(){


           var newName = toTitleCase(firstNameLastInital(this.Person));

           iPadIn = this.iPadIn;

              tableContent += '<tr>';
              tableContent += '<td>' + newName + '</td>';
              tableContent += '<td>' + moment(this.ArrivalTime).format('hh:mm:ss') + '</td>';
                if (this.DepartureTime === '') {

                  tableContent += '<td><button type="button" rel="' + this._id + '" class="CheckOut btn btn-warning btn-sm">Check Out</button></td>';
                } else {
                  tableContent += '<td>' + moment(this.DepartureTime).format('hh:mm:ss') + '</td>';
                }
              // tableContent += '<td><a href="#" class="linkdeletevisitor " rel="' + this._id + '">delete</a></td>';
              tableContent += '</tr>';
          });

          // Inject the whole content string into our existing HTML table
          $('#workerList table tbody').html(tableContent);
      });
    }



//Post request to add the person
function addPerson(event) {
    event.preventDefault();


    var newPerson = {
      'createdDate': moment().format('DD MM YYYY'),
      'Person' : $('input#workerName').val(),
      'ArrivalTime' : moment().format(),
      'DepartureTime' : "",
      'Disclaimer' : $('input#Disclaimer').val(),
      'iPadIn' : getKioskId(),
    };

  var myJSON = JSON.stringify(newPerson);


    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: myJSON,
        url: 'thamesWater/addPerson',
        dataType: 'JSON',
        contentType: 'application/json',
    }).done(function( response, results ) {
      console.log(response);
        populateTable();
        // location.reload();
        // Check for successful (blank) response
        if (response.msg === '') {

        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
        }

    });
}
