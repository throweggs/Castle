var allowed = false;
var searchStart = moment().startOf('month').format('l'),
    searchEnd = moment().endOf('month').format('l');

var theSearch =  {created: { $gt: moment(searchStart).format(), $lt: moment(searchEnd).add('24','hours').format() }};
    searchChoice = 'default';
var options = ['', 'Locker', 'Key', 'Name'];
var keyCode = '';
var theKeys = {};
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
  $('#PinModal').modal("show");


  $('#lockersLink').addClass('active');
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

//New Key Modal identity finder
  $(document).on('click', '#KeysTableBody td', function (e) {
                  theTHIS = this;
                  var html = $(this).text();
                  var theID = this.id.split("_")[0];
                  var theField = this.id.split("_")[1];
                  theAssetValue = html;
                  if(theField === 'keyCopies'){
                          var input = $('<td><input type="text" class="form-control '+theTHIS.className+'" id="'+theTHIS.id+'"></td>');
                          // input.val(html);
                          $(this).replaceWith(input);
                          $('#KeysTableBody input').focus();
                          $('#KeysTableBody input').val(html);
                  }
          });


//Delete locker from Database
  $(document).on('click', '.lockerDel', function (e) {

    var theID = this.id.split("_")[0];
    console.log(theID)
    var contDel = confirm('are you sure you wish to delete locker: '+$('#'+theID+'_lockerNumber').text()+'?');
    if(contDel){
              var asset = {
                          FindMe : theID
                        }

                          $.ajax({
                              type: 'post',
                              data: JSON.stringify(asset),
                              url: 'lockers/delAlocker',
                              dataType: 'JSON',
                              contentType: 'application/json',
                          }).done(function( response, results ) {


                              // Check for successful (blank) response
                              if (results === 'success') {

                                $('tbody#LockerTableBody').html('');
                                getLockers();
                              }
                              else {
                                  // If something goes wrong, alert the error message that our service returned
                                  alert('Error: ' + response.msg);

                              }

                          });
                } else {}
      });

//Delete Key from Database
  $(document).on('click', '.keyDel', function (e) {

    var theID = this.id.split("_")[0];
    var contDel = confirm('are you sure you wish to delete key: '+$('#'+theID+'_keyCode').text()+'?');
    if(contDel){
              var asset = {
                          FindMe : theID
                        }

                          $.ajax({
                              type: 'post',
                              data: JSON.stringify(asset),
                              url: 'lockers/delAKey',
                              dataType: 'JSON',
                              contentType: 'application/json',
                          }).done(function( response, results ) {


                              // Check for successful (blank) response
                              if (results === 'success') {
                                $('tbody#KeysTableBody').html('');

                                getKeys();
                              }
                              else {
                                  // If something goes wrong, alert the error message that our service returned
                                  alert('Error: ' + response.msg);

                              }

                          });
                } else {}
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




//Update key copies record
  $(document).on('blur', '#KeysTableBody input', function(e){
    var batch = '',
        number = '',
        string = '';
    var theTHIS = this;
    var theID = this.id.split("_")[0];
    var findCode = '#'+theID+'_keyCode';
        if($(findCode).text().includes('29220')){
          string = $(findCode).text().split('-');
          batch = 29220;
          number = string[1];
        } else {
            string = $(findCode).text().split('');
            batch = string[0]+string[1];
            number = $(findCode).text().split(batch);
            number = number[1];
        }

      $(this).replaceWith('<class="keyRow '+this.ClassName+'" id="'+this.id+'"><span>'+this.value+'</span>');

      var asset = {
                  FindMe : theID,
                  Key: {
                    Code: $('#'+theID+'_keyCode').text(),
                    Batch : batch,
                    Number : number
                            },
                  Copies: $('#'+theID+'_keyCopies').text(),

                  }


                  $.ajax({
                      type: 'put',
                      data: JSON.stringify(asset),
                      url: 'lockers/updateAKey',
                      dataType: 'JSON',
                      contentType: 'application/json',
                  }).done(function( response, results ) {


                      // Check for successful (blank) response
                      if (results === 'success') {
                        staffID = '';

                        $('tbody#KeysTableBody').html('');
                        getKeys();


                      }
                      else {
                          // If something goes wrong, alert the error message that our service returned
                          alert('Error: ' + response.msg);

                      }

                  });

  });

// Update Locker record
  $(document).on('blur', '#LockersTableBody input', function(e){
    var header = '',
        footer = '',
        string = '';

    $('#'+e.target.id).val($('#'+e.target.id).val().toUpperCase());
    if($('#'+e.target.id).val().includes('29220')){
        string = $('#'+e.target.id).val().split('-');

        if(string[1].length==1){
          string[1] = '00'+string[1];
          $('#'+e.target.id).val('29220-'+string[1])
        } else if(string[1].length==2){
          string[1] = '0'+string[1];
            $('#'+e.target.id).val('29220-'+string[1])
          }
    }
    if($('#'+e.target.id).val().includes('AJ') || $('#'+e.target.id).val().includes('CJ') || $('#'+e.target.id).val().includes('CC')){
          string = $('#'+e.target.id).val().split('');
      var splitter = string[1];
            console.log(splitter);
          header = string[0]+[1];
          footer = $('#'+e.target.id).val().split(splitter);
          footer = footer[footer.length-1];


        if(footer.length===1){
          footer = '00'+footer
          $('#'+e.target.id).val(string[0]+string[1]+footer)
        } else if(footer.length===2){
          footer = '0'+footer
            $('#'+e.target.id).val(string[0]+string[1]+footer)
          }
    }
            var theTHIS = this;
            var theID = this.id.split("_")[0];
            var theField = this.id.split("_")[1];
            var theKey = theID+'_lockerKey';

            if($('#'+e.target.id).hasClass('is-invalid')){
              var blurValues = [];
              blurValues.keyCode  = this.value;
              blurValues.batch = string[0];
              blurValues.number = string[1];
              console.log(blurValues)
              addKey(blurValues)
            }

              $(this).replaceWith('<td class="lockerRow '+this.ClassName+'" id="'+this.id+'"><span>'+this.value+'</span></td>');

              var theKEY = '';
              console.log(theID)
                  var asset = {
                              FindMe : theID,
                              Locker :  $('#'+theID+'_lockerNumber').text(),
                              Key : $('#'+theID+'_lockerKey').text(),
                              Owner : $('#'+theID+'_lockerOwner').text(),
                              Expiry : $('#'+theID+'_lockerExpiry').text(),
                              Location : $('#'+theID+'_lockerLocation').text(),
                              Colour : $('#'+theID+'_lockerColour').text(),
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








//-------------

function batchAddKeys(){
  var output = {keycode : 0, batch : 0, number : 0, copies : 1};
  output.batch = prompt("Enter Batch Code", "AJ");
  var startNum = prompt("Enter Start Point", 0);
  var endNum = prompt("Enter Batch Code", 200);



  while (startNum <= endNum) {
    if (startNum < 10){
      output.number = startNum
      output.keycode = output.batch+'00'+startNum
    } else if (startNum < 100){
      output.number = startNum
      output.keycode = output.batch+'0'+startNum
    } else {
      output.number = startNum
      output.keycode = output.batch+startNum
    }


    var info = {

      Key: {
        Code: output.keycode,
        Batch : output.batch,
        Number : output.number
                },
      Copies: 1
    }

    $.ajax({
      type: "Post",
      url: "lockers/addKey",
      contentType: 'application/json',
      data: JSON.stringify(info),
    }).done(function( response, results ) {


        // Check for successful (blank) response
        if (results === 'success') {


        }
        else {
            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);
            // window.location.reload();
            //   resetPage();
        }

    });

    startNum++;
  }



}

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

//Inerts key into table
function insertKey(key) {
  keyID = key._id;
  theKeys.push([key.Key.Code,key._id,key.Copies]);
  code = key.Key.Code;
  number = key.Key.Number;
  copies = key.Copies;


          var tableAJ = document.getElementById("AJKeysTableBody");

          var keyRow = tableAJ.insertRow(0);
                keyRow.id = keyID + '_keyRow';
                keyRow.className = 'keyRow';
          var keyCode = keyRow.insertCell(-1);
                keyCode.id = keyID + '_keyCode';
                keyCode.className = 'keyCode'
                keyCode.innerHTML = code;
          var keyCopies = keyRow.insertCell(-1);
                keyCopies.id = keyID + '_keyCopies';
                keyCopies.className = 'keyCopies'
                keyCopies.innerHTML = copies;
          var keyDel = keyRow.insertCell(-1);
                keyDel.id = keyID + '_keyDel';
                keyDel.className = 'keyDel'
                keyDel.innerHTML = '<i className="keyDel" id="'+keyID+'_keyDel" class="fas  fa-trash-alt"></i>';
                console.log(key.Key.Code)


// <i class="fas  fa-trash-alt"></i>
keyID = '';

}

//inserts locker into table
function insertLocker(locker) {

var theColour = ''
    if(locker.Colour === 'YELLOW'){
      theColour = 'table-warning';
    } else if(locker.Colour === 'RED'){
      theColour = 'table-danger';
    } else  if(locker.Colour === 'BLUE'){
      theColour = 'table-info';
    }
console.log(theColour)

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
                    lockerRow.className = 'lockerRow '+theColour;
              var lockerDel = lockerRow.insertCell(-1);
                    lockerDel.id = locker._id + '_lockerDel';
                    lockerDel.className = 'lockerDel'
                    lockerDel.innerHTML = '<i className="lockerDel" id="'+locker._id+'_keyDel" class="fas  fa-trash-alt"></i>';
              var lockerNumber = lockerRow.insertCell(-1);
                    lockerNumber.innerHTML =  locker.Locker;
                    lockerNumber.id =  locker._id + '_lockerNumber';
                    lockerNumber.className = 'lockerNumber'
              var lockerKey = lockerRow.insertCell(-1);
                    lockerKey.innerHTML = locker.Key;
                    lockerKey.id =  locker._id + '_lockerKey';
                    lockerKey.className = 'lockerKey'
              var lockerLocation = lockerRow.insertCell(-1);
                      lockerLocation.innerHTML = locker.Location;
                      lockerLocation.id =  locker._id + '_lockerLocation';
                      lockerLocation.className = 'lockerLocation';
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
              var lockerColour = lockerRow.insertCell(-1);
                      // lockerColour.innerHTML = '<p class="'+theColour+'">'+locker.Colour+'</p>';
                      lockerColour.innerHTML = locker.Colour;
                      lockerColour.id =  locker._id + '_lockerColour';
                      lockerColour.className = 'lockerColour ';

      keyID = '';



}

//Gets keys from the database
function getKeys() {

    // jQuery AJAX call for JSON
  var returnedKeys =  $.getJSON( '/lockers/getKeys', function( data ) {
    console.log('getting Keys')
    })
    .done(function(data){
      var allKeys = [];
      $.each(data, function(i, key){
        keyID = key._id;

        code = key.Key.Code;
        number = key.Key.Number;
        copies = key.Copies;

        allKeys.push([code,keyID,copies]);



                var tableAJ = document.getElementById("KeysTableBody");

                var keyRow = tableAJ.insertRow(0);
                      keyRow.id = keyID + '_keyRow';
                      keyRow.className = 'keyRow';
                var keyCode = keyRow.insertCell(-1);
                      keyCode.id = keyID + '_keyCode';
                      keyCode.className = 'keyCode'
                      keyCode.innerHTML = code;
                var keyCopies = keyRow.insertCell(-1);
                      keyCopies.id = keyID + '_keyCopies';
                      keyCopies.className = 'keyCopies'
                      keyCopies.innerHTML = copies;
                var keyDel = keyRow.insertCell(-1);
                      keyDel.id = keyID + '_keyDel';
                      keyDel.className = 'keyDel'
                      keyDel.innerHTML = '<i className="keyDel" id="'+keyID+'_keyDel" class="fas  fa-trash-alt"></i>';
                      console.log(key.Key.Code)



        keyID = '';
      });
    theKeys = allKeys;
    })
    .fail(function(){
      alert('Failed to retrieve Keys');
    })
    .always(function(){

      console.log('call finished');
    });
}

//Get Lockers from the database
function getLockers() {

    // jQuery AJAX call for JSON
    $.getJSON( '/lockers/getLockers', function( data ) {

    $.each(data, function(i, locker){

        insertLocker(locker);

    });
  });
}

//Adds key to databsae
function addKey(blurValue) {
  var batch = $('input#keyBatchInput').val(),
      number = $('input#keyNumberInput').val(),
      copies = $('input#copiesInput').val();
  if(blurValue === NaN){

  } else {
    keyCode = blurValue.keyCode;
    batch = blurValue.batch;
    number = blurValue.number;
    copies = 1;
  }
  var info = {

    Key: {
      Code: keyCode,
      Batch : batch,
      Number : number
              },
    Copies: copies
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
          // window.location.reload();
          //   resetPage();
      }

  });

};

//Adds locker to database and key
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
          Location: $('input#locationInput').val(),
          Colour: $('input#colourInput').val(),
        }

        var keyInfo = {
                    Key: {
                      Code: $('input#keyInput').val(),
                      Batch : $('input#keyBatch').val(),
                      Number : $('input#keyNumber').val()
                              },
          Copies: $('input#keyQuantity').val(),
          FindMe: $('input#keyID').val()
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

//Populates table as Pin modal is hidden
$(document).on('hidden.bs.modal', function(e) {

if(e.target.id==='PinModal'){
  if (pinAccepted === true){
    allowed = true;
    $('table#lockers').show();
    $('#loading').hide();
    $('table#keys').show();
    getKeys();
    getLockers();

  }
}
});

// function populateLockerTable(){};




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
