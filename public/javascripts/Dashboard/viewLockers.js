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

//Formatting on new Locker Modal
  $(document).on('change', '#lockerUse', function (e) {

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

//New Key Modal identity finder
  $(document).on('click', '#LockersTableBody td', function (e) {
                  theTHIS = this;
                  var html = $(this).text();
                  var theID = this.id.split("_")[0];
                  var theField = this.id.split("_")[1];
                  theAssetValue = html;
                  if(theField !== 'keyCopies'){
                          var input = $('<input type="text" class="form-control '+theTHIS.className+'" id="'+theTHIS.id+'"><div class="valid-feedback">Key Found</div><div class="invalid-feedback">Key Not Found - New Key will be generated</div>');
                          input.val(html);
                          $(this).replaceWith(input);
                          $('#LockersTableBody input').focus();
                  }
          });

//add 1 to number of keys on modal
  $(document).on('click', 'button#minOne', function (e) {
                  x = $('#keyQuantity').val();
                  x --;
                  $('#keyQuantity').val(x);
                });

//minus one from number of keys on modal
  $(document).on('click', 'button#plusOne', function (e) {
                  x = $('#keyQuantity').val();
                  x ++;
                  $('#keyQuantity').val(x);
                });

//formatting of owner input on modal
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

//Formatting on new locker and key Modal
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

//Checks on Locker Key Numbers to insure correct format on code
  $('#LockersTableBody').on({
            keydown: function(e) {

              if(e.which == 13){
                return false;
              }
              $('#'+e.target.id).val($('#'+e.target.id).val().toUpperCase());
              if($('#'+e.target.id).hasClass('lockerKey')){
                if( e.which === 96 && $('#'+e.target.id).val()==2922){
                    $('#'+e.target.id).val('29220-')
                    return false;
                }
                if(e.which === 109 && $('#'+e.target.id).val()=='29220-'){
                  $('#'+e.target.id).val('29220-')
                    return false;
                }

                if (e.which === 32)
                  return false;
                if($('#'+e.target.id).val().includes('29220')){
                } else {

                  if($('#'+e.target.id).val().length>=5){
                    if ( e.which == 8 || e.which == 46){

                    } else {
                      return false;
                    }
                  }
                }

              }


            },

            change: function(e) {
              this.value = this.value.replace(/\s/g, "");
            }

          });

//find key in array of keys
  $(document).on('keyup', '#LockersTableBody input', function(e){

                  var theID = this.id.split("_")[0];
                  var theField = this.id.split("_")[1];
                  var theKey = theID+'_lockerKey';
                  theKEY = $('#'+theKey).val();
                  if(theField === 'lockerKey'){

                    var found = '';
                    theKeys.forEach(function(key){
                      var k = key[0];
                      var i = key[1];
                      if(k === theKEY){
                        found = i;
                      }
                      if(theField === 'lockerKey'){
                        if(found === ''){
                          $('#'+theKey).removeClass( "is-valid" ).addClass( "is-invalid" );
                      } else {
                        $('#'+theKey).addClass( "is-valid" ).removeClass( "is-invalid" );
                      }

                  }


          });
        }
      });

// Update Locker record
  $(document).on('blur', '#LockersTableBody input', function(e){
    $('#'+e.target.id).val($('#'+e.target.id).val().toUpperCase());
    if($('#'+e.target.id).val().includes('29220')){
      var string = $('#'+e.target.id).val().split('-');

        if(string[1].length==1){
          $('#'+e.target.id).val('29220-00'+string[1])
        } else if(string[1].length==2){
            $('#'+e.target.id).val('29220-0'+string[1])
          }
    }
    if($('#'+e.target.id).val().includes('AJ') || $('#'+e.target.id).val().includes('CJ') || $('#'+e.target.id).val().includes('CC')){
      var string = $('#'+e.target.id).val().split('');
      var splitter = string[1];
            console.log(splitter);
      var header = string[0]+[1];
      var footer = $('#'+e.target.id).val().split(splitter);
      var footer = footer[footer.length-1];
      console.log(footer);

        if(footer.length===1){
          console.log('hit');
          $('#'+e.target.id).val(string[0]+string[1]+'00'+footer)
        } else if(footer.length===2){
            $('#'+e.target.id).val(string[0]+string[1]+'0'+footer)
          }
    }
            var theTHIS = this;
            var theID = this.id.split("_")[0];
            var theField = this.id.split("_")[1];
            var theKey = theID+'_lockerKey';

              $(this).replaceWith('<td class="lockerRow '+this.ClassName+'" id="'+this.id+'"><span>'+this.value+'</span></td>');

              var theKEY = '';

                  var asset = {
                              FindMe : theID,
                              Locker :  $('#'+theID+'_lockerNumber').text(),
                              Key : $('#'+theID+'_lockerKey').text(),
                              Owner : $('#'+theID+'_lockerOwner').text(),
                              }


                              $.ajax({
                                  type: 'put',
                                  data: JSON.stringify(asset),
                                  url: 'lockers/updateALocker',
                                  dataType: 'JSON',
                                  contentType: 'application/json',
                              }).done(function( response, results ) {


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
                keyRow.className = 'keyRow';
          var keyCode = keyRow.insertCell(-1);
                keyCode.innerHTML = code;
                keyCode.id = keyID + '_keyCode';
                keyCode.className = 'keyCode'
          var keyCopies = keyRow.insertCell(-1);
                keyCopies.innerHTML = copies;
                keyCopies = keyID + '_keyCopies';
                keyCopies.className = 'keyCopies'

keyID = '';

}

function insertLocker(locker) {


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
                    lockerNumber.className = 'lockerNumber'
              var lockerKey = lockerRow.insertCell(-1);
                    lockerKey.innerHTML = locker.Key;
                    lockerKey.id =  locker._id + '_lockerKey';
                    lockerKey.className = 'lockerKey'
              var keyCopies = lockerRow.insertCell(-1);
                    keyCopies.innerHTML = copies;
                    keyCopies.id =  locker._id + '_keyCopies';
                    keyCopies.className = 'keyCopies';
              var lockerOwner = lockerRow.insertCell(-1);
                      lockerOwner.innerHTML = locker.Owner;
                      lockerOwner.id =  locker._id + '_lockerOwner';
                      lockerOwner.className = 'lockerOwner';
              var ownerExpiry = lockerRow.insertCell(-1);

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


      // Check for successful (blank) response
      if (results === 'success') {

        window.location.reload();
          resetPage();

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


            // Check for successful (blank) response
            if (results === 'success') {

              window.location.reload();
                resetPage();

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


              // Check for successful (blank) response
              if (results === 'success') {

                window.location.reload();
                  resetPage();

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
;

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
