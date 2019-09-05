var allowed = false;
var searchStart = moment().startOf('month').format('l'),
    searchEnd = moment().endOf('month').format('l');

var theSearch =  {created: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
    searchChoice = 'default';
var options = ['', 'Locker', 'Key', 'Name'];
var keyCode = '';
var theKeys = [];
var theAssetValue = '';
var theTHIS = '';

//Visitor Date Picker
$(function() {
  $('input[id="ownerExpiry"]').daterangepicker({

    locale: {
      format: moment().format('L')
    },
    singleDatePicker: true,
    timePicker: true,
    timePickerSeconds: false,
    showDropdowns: true,
    minYear: 2017,
    maxYear: 2020,
    }, function(start, end, label) {
      visitor[0] = start;

    var years = moment().diff(start, 'years');

  });
});

$(document).on("click", ".popover .close" , function(){
    $(this).parents(".popover").popover('hide');
});

$(document).ready(function() {

  $(document).on('change', '#lockerUse', function (e) {
                  console.log(this.value);
                  if(this.value === 'Hire'){
                    $('input#ownerInput').show();
                    $('input#ownerExpiry').show();
                    $('label#ownerInput').show();
                    $('label#ownerExpiry').show();
                  } else  if(this.value === 'Staff'){
                      $('input#ownerInput').show();
                      $('input#ownerExpiry').hide();
                      $('label#ownerInput').show();
                      $('label#ownerExpiry').hide();
                    }else {
                    $('input#ownerInput').hide();
                    $('input#ownerExpiry').hide();
                    $('label#ownerInput').hide();
                    $('label#ownerExpiry').hide();
                  }
    });



  $(document).on('click', '#LockersTableBody td', function (e) {
                  theTHIS = this;
                  var html = $(this).text();
                  var theID = this.id.split("_")[0];
                  var theField = this.id.split("_")[1];
                  theAssetValue = html;
                  if(theField !== 'keyCopies'){
                          var input = $('<input type="text" class="form-control" id="'+theTHIS.id+'"><div class="valid-feedback">Key Found</div><div class="invalid-feedback">Key Not Found - New Key will be generated</div>');
                          input.val(html);
                          $(this).replaceWith(input);
                          $('#LockersTableBody input').focus();
                  }
          });


        $(document).on('click', 'button#minOne', function (e) {
                  x = $('#keyQuantity').val();
                  x --;
                  $('#keyQuantity').val(x);
                });

        $(document).on('click', 'button#plusOne', function (e) {
                  x = $('#keyQuantity').val();
                  x ++;
                  $('#keyQuantity').val(x);
                });

          $(document).on('keyup #ownerInput',function (e){
            var found = false;
            $('input#ownerInput').val(toTitleCase($('input#ownerInput').val()));

            theKeys.forEach(function(key){
              var k = key[0];
              var i = key[1];
              if(k === $('input#keyInput').val()){
                found = i;
              }
            })
            if(found === false){
              $('#keyInput').removeClass( "is-valid" ).addClass( "is-invalid" );

            } else {
              $('#keyInput').removeClass( "is-invalid" ).addClass( "is-valid" );
            }

          });



          $(document).on('keyup','#keyNumber',function (e){
            var keyBatch = '',
                keyCode = 0;

            if($('input#keyBatch').val() === '29220'){
              keyBatch = $('input#keyBatch').val() + '-';
            } else {
              keyBatch =  $('input#keyBatch').val();
            }

            if($('#keyNumber').val().length >= 3){
              var keyCode = $('#keyNumber').val();
            } else if($('#keyNumber').val().length >= 2){
              var keyCode = '0' + $('#keyNumber').val();
            } else  if($('#keyNumber').val().length >= 1){
              var keyCode = '00' + $('#keyNumber').val();
            }
            $('#keyInput').val(keyBatch.toUpperCase() + keyCode);

            var found = false;
            var quan = 0;
            var string  = $("input#keyInput").val();
            string = string.toUpperCase();
             $("input#keyInput").val(string);

            theKeys.forEach(function(key){
              var k = key[0];
              var i = key[1];
              if(k === $('input#keyInput').val()){
                found = i;
                quan = key[2];
              }
            })
            if(found === false){
              $('#keyInput').removeClass( "is-valid" ).addClass( "is-invalid" );
              $('button#minOne').hide();
              $('button#plusOne').hide();
              $('#keyQuantity').val(0);
            } else {
              $('#keyInput').removeClass( "is-invalid" ).addClass( "is-valid" );
              $('#keyQuantity').val(quan);
              $('button#minOne').show();
              $('button#plusOne').show();

            }
          });


          $(document).on('keyup', '#LockersTableBody input', function(e){

                  var theID = this.id.split("_")[0];
                  var theField = this.id.split("_")[1];
                  var theKey = theID+'_lockerKey';
                  theKEY = $('#'+theKey).val();
                  if(theField === 'lockerKey'){
                    console.log(theTHIS);
                    var found = '';
                    theKeys.forEach(function(key){
                      var k = key[0];
                      var i = key[1];
                      if(k === theKEY){
                        found = i;
                      }
                      if(theField === 'lockerKey'){
                        if(found === ''){
                          console.log('nope');
                          console.log(theKey);
                          $('#'+theKey).removeClass( "is-valid" ).addClass( "is-invalid" );
                      } else {
                        console.log('yep');
                        console.log(theKey);
                        $('#'+theKey).addClass( "is-valid" ).removeClass( "is-invalid" );
                      }

                  }


          });
        }
      });

          $(document).on('blur', '#LockersTableBody input', function(e){
            var theTHIS = this;
            var theID = this.id.split("_")[0];
            var theField = this.id.split("_")[1];
            var theKey = theID+'_lockerKey';

              $(this).replaceWith('<td class="lockerRow" id="'+this.id+'"><span>'+this.value+'</span></td>');

              var theKEY = '';
              console.log(theID)
                  var asset = {
                              FindMe : theID,
                              Locker :  $('#'+theID+'_lockerNumber').text(),
                              Key : $('#'+theID+'_lockerKey').text(),
                              Owner : $('#'+theID+'_lockerOwner').text(),
                              }
                              console.log(asset);

                              $.ajax({
                                  type: 'put',
                                  data: JSON.stringify(asset),
                                  url: 'lockers/updateALocker',
                                  dataType: 'JSON',
                                  contentType: 'application/json',
                              }).done(function( response, results ) {
                                console.log(results);

                                  // Check for successful (blank) response
                                  if (results === 'success') {
                                    staffID = '';

                                    $('tbody#LockersTableBody').html('');
                                    getLockers();


                                  }
                                  else {
                                      // If something goes wrong, alert the error message that our service returned
                                      alert('Error: ' + response.msg);

                                  }

                              });



        });




  $('#PinModal').modal("show");
  $('#lockersLink').addClass('active');
  $('.form.active').removeClass('active');
   getKeys();
   getLockers();

  var select = document.getElementById('searchOptions');

  $.each(options,function(i, option){
      var opt = document.createElement('option');
      opt.value = option;
      opt.innerHTML = option;
      select.appendChild(opt);
  });


  if (pinAccepted === true){
    populateLockerTable();
    allowed = true;
  }
});

//Get request for session
function getAKey(key){

  $.getJSON( '/lockers/getAKey', {_id: key }, function(results, res) {
    })
    .done(function(results, res) {

          var theResults = JSON.stringify(results);
            if (theResults === '[]') {

          } else {

          }

      aKey = results;
      });


  }

function insertKey(key) {
  keyID = key._id;
  theKeys.push([key.Key.Code,key._id,key.Copies]);
  code = key.Key.Code;
  number = key.Key.Number;
  copies = key.Copies;
          var table = document.getElementById("KeysTableBody");



          var keyRow = table.insertRow(-1);
                keyRow.id = keyID + '_keyRow';
          var keyCode = keyRow.insertCell(-1);
                keyCode.innerHTML = code;
                keyCode.id = keyID + '_keyCode';
          var keyCopies = keyRow.insertCell(-1);
                keyCopies.innerHTML = copies;
                keyCopies = keyID + '_keyCopies';

keyID = '';

}

function insertLocker(locker) {
  console.log(locker);

  var copies = 0;
      theKeys.forEach(function(key){
        var k = key[0];
        var i = key[2];
            if(k === locker.Key){
              copies = i;
            }
      });

              var table = document.getElementById("LockersTableBody");
              var lockerRow = table.insertRow(-1);
                    lockerRow.id =  locker._id + '_lockerRow';
                    lockerRow.className = 'lockerRow'
              var lockerNumber = lockerRow.insertCell(-1);
                    lockerNumber.innerHTML =  locker.Locker;
                    lockerNumber.id =  locker._id + '_lockerNumber';
              var lockerKey = lockerRow.insertCell(-1);
                    lockerKey.innerHTML = locker.Key;
                    lockerKey.id =  locker._id + '_lockerKey';
              var keyCopies = lockerRow.insertCell(-1);
                    keyCopies.innerHTML = copies;
                    keyCopies.id =  locker._id + '_keyCopies';
              var lockerOwner = lockerRow.insertCell(-1);
                      lockerOwner.innerHTML = locker.Owner;
                      lockerOwner.id =  locker._id + '_lockerOwner';
              var ownerExpiry = lockerRow.insertCell(-1);
                      console.log(locker.Expiry);
                      if(locker.Expiry == null){
                        ownerExpiry.innerHTML = '';
                      } else {
                        ownerExpiry.innerHTML = locker.Expiry;
                      }
                      ownerExpiry.id =  locker._id + '_ownerExpiry';

      keyID = '';



}


function getKeys() {

    // jQuery AJAX call for JSON
    $.getJSON( '/lockers/getKeys', function( data ) {

    $.each(data, function(i, key){

        insertKey(key);

    });
  });
}

function getLockers() {

    // jQuery AJAX call for JSON
    $.getJSON( '/lockers/getLockers', function( data ) {

    $.each(data, function(i, locker){

        insertLocker(locker);

    });
  });
}

function addKey() {
  var info = {
    Created: {
       Created: moment(),
       Created_Date : moment().format('L'),
       Created_Time : moment().format('LT'),
              },
    Key: {
      Code: keyCode,
      Batch : $('input#keyBatchInput').val(),
      Number : $('input#keyNumberInput').val()
              },
    Copies: $('input#copiesInput').val()
  }

  $.ajax({
    type: "Post",
    url: "lockers/addKey",
    contentType: 'application/json',
    data: JSON.stringify(info),
  }).done(function( response, results ) {
    console.log(results);

      // Check for successful (blank) response
      if (results === 'success') {
          console.log('success');
        window.location.reload();
          resetPage();
        console.log('reset');
      }
      else {
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
          window.location.reload();
            resetPage();
      }

  });

};

function addLocker() {
        var lockerInfo = {
          Created: {
             Created: moment(),
             Created_Date : moment().format('L'),
             Created_Time : moment().format('LT'),
                    },

          Locker: $('input#lockerNumberInput').val(),
          Use: $('input#lockerUse').val(),
          Owner: $('input#ownerInput').val(),
          Expiry: $('input#ownerExpiry').val(),
          Key: $('input#keyInput').val(),
        }

        var keyInfo = {
          Created: {
             Created: moment(),
             Created_Date : moment().format('L'),
             Created_Time : moment().format('LT'),
                    },
                    Key: {
                      Code: $('input#keyInput').val(),
                      Batch : $('input#keyBatch').val(),
                      Number : $('input#keyNumber').val()
                              },
          Copies: $('input#keyQuantity').val(),
          FindMe: $('input#keyID')
        }

        $.ajax({
          type: "Post",
          url: "lockers/addLocker",
          contentType: 'application/json',
          data: JSON.stringify(lockerInfo),
        }).done(function( response, results ) {
          console.log(results);

            // Check for successful (blank) response
            if (results === 'success') {
                console.log('success');
              window.location.reload();
                resetPage();
              console.log('reset');
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
                window.location.reload();
                  resetPage();
            }

        });

if($('input#KeyID' === '')) {
          $.ajax({
            type: "Post",
            url: "lockers/addKey",
            contentType: 'application/json',
            data: JSON.stringify(keyInfo),
          }).done(function( response, results ) {
            console.log(results);

              // Check for successful (blank) response
              if (results === 'success') {
                  console.log('success');
                window.location.reload();
                  resetPage();
                console.log('reset');
              }
              else {
                  // If something goes wrong, alert the error message that our service returned
                  alert('Error: ' + response.msg);
                  window.location.reload();
                    resetPage();
              }

          });
} else {
          $.ajax({
              type: 'put',
              data: JSON.stringify(keyInfo),
              url: 'lockers/updateAKey',
              dataType: 'JSON',
              contentType: 'application/json',
          }).done(function( response, results ) {
            console.log(results);

              // Check for successful (blank) response
              if (results === 'success') {
                staffID = '';

                $('tbody#LockersTableBody').html('');
                getLockers();


              }
              else {
                  // If something goes wrong, alert the error message that our service returned
                  alert('Error: ' + response.msg);

              }

        });
      }

};

$(document).on('hidden.bs.modal', function(e) {

if(e.target.id==='PinModal'){
  if (pinAccepted === true){
    allowed = true;
    populateLockerTable();
    $('table#lockers').show();
    $('table#keys').show();
    $('#loading').hide();
  }
}
});

function populateLockerTable(){};




// Set up search dates
$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
  //do something, like clearing an input

  searchStart = picker.startDate.format('L');
  searchEnd = picker.endDate.format('L');
  populateLockerTable();


});




$(document).on('keyup',function (e){



  if(e.target.id === 'keyBatchInput'){
    if($("#keyBatchInput").val() === '29220'){
      $("#keyBatchInput").val('29220-');
    } else {
       var string  = $("#keyBatchInput").val();
       string = string.toUpperCase();
        $("#keyBatchInput").val(string);
    }
    $('#fullCodeInput').text('Details ' + $("#keyBatchInput").val() + $("#keyNumberInput").val());
  }

  if(e.target.id === 'keyNumberInput'){
    var keyNumber = 0;
    if( $("#keyNumberInput").val().length < 2){
      keyNumber = '00' + $("#keyNumberInput").val();
    } else if ( $("#keyNumberInput").val().length < 3){
      keyNumber = '0' + $("#keyNumberInput").val();
    } else if ( $("#keyNumberInput").val().length > 2){
      keyNumber = $("#keyNumberInput").val();
    }
    keyCode =  $("#keyBatchInput").val() + keyNumber;
    $('#fullCodeInput').text('Details ' + keyCode);
  }

if(e.target.id === 'keyInput'){
  $('submit#newLocker').hide();
  var found = false;
  var string  = $("input#keyInput").val();
  string = string.toUpperCase();
   $("input#keyInput").val(string);

  theKeys.forEach(function(key){
    var k = key[0];
    var i = key[1];
    if(k === $('input#keyInput').val()){
      found = i;
    }
  })
  if(found === false){
    $('input#keyID').val('');
    $('submit#newLocker').hide();
  } else {
    $('input#keyID').val(found);
    $('submit#newLocker').show();
  }

}


});
